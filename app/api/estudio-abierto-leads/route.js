import crypto from "crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const SHEET_NAME = process.env.ESTUDIO_ABIERTO_SHEET_NAME || "Leads";

let cachedAccessToken = null;
let cachedAccessTokenExpiresAt = 0;

const blockedTerms = [
  "asdf",
  "empresa",
  "nombre",
  "none",
  "n/a",
  "prueba",
  "qwerty",
  "test",
  "xxxx",
];

const base64Url = (input) =>
  Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

const normalizePrivateKey = (privateKey) => privateKey?.replace(/\\n/g, "\n");

const hasSuspiciousText = (value = "") => {
  const normalized = value.trim().toLowerCase();
  if (normalized.length < 2) return true;
  if (/^(.)\1{2,}$/.test(normalized.replace(/\s/g, ""))) return true;
  if (/^[x\s]+$/.test(normalized)) return true;
  return blockedTerms.some((term) => normalized.includes(term));
};

const validateEmail = (email = "") =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()) &&
  !hasSuspiciousText(email.split("@")[0]);

const validateLead = ({ name = "", company = "", email = "" }) => {
  const errors = {};

  if (hasSuspiciousText(name) || name.trim().split(/\s+/).length < 2) {
    errors.name = "Ingresa tu nombre y apellido reales.";
  }

  if (hasSuspiciousText(company)) {
    errors.company = "Ingresa una compañía válida.";
  }

  if (!validateEmail(email)) {
    errors.email = "Ingresa un correo válido.";
  }

  return errors;
};

const getServiceAccountConfig = () => {
  const spreadsheetId = process.env.ESTUDIO_ABIERTO_SHEET_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = normalizePrivateKey(process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY);

  if (!spreadsheetId || !clientEmail || !privateKey) {
    throw new Error("Missing Google Sheets environment variables.");
  }

  return {
    spreadsheetId,
    clientEmail,
    privateKey,
  };
};

const createJwtAssertion = ({ clientEmail, privateKey }) => {
  const now = Math.floor(Date.now() / 1000);
  const header = {
    alg: "RS256",
    typ: "JWT",
  };
  const payload = {
    iss: clientEmail,
    scope: SHEETS_SCOPE,
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  const unsignedToken = `${base64Url(JSON.stringify(header))}.${base64Url(
    JSON.stringify(payload)
  )}`;
  const signature = crypto
    .createSign("RSA-SHA256")
    .update(unsignedToken)
    .sign(privateKey);

  return `${unsignedToken}.${base64Url(signature)}`;
};

const getAccessToken = async (config) => {
  if (cachedAccessToken && Date.now() < cachedAccessTokenExpiresAt - 60_000) {
    return cachedAccessToken;
  }

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: createJwtAssertion(config),
    }),
  });

  if (!response.ok) {
    throw new Error("Google OAuth token request failed.");
  }

  const token = await response.json();
  cachedAccessToken = token.access_token;
  cachedAccessTokenExpiresAt = Date.now() + token.expires_in * 1000;

  return cachedAccessToken;
};

const appendLeadToSheet = async (lead, request) => {
  const config = getServiceAccountConfig();
  const accessToken = await getAccessToken(config);
  const range = encodeURIComponent(`${SHEET_NAME}!A:F`);
  const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      values: [
        [
          new Date().toISOString(),
          lead.name.trim(),
          lead.company.trim(),
          lead.email.trim().toLowerCase(),
          "estudio-abierto-informe-final",
          request.headers.get("user-agent") || "",
        ],
      ],
    }),
  });

  if (!response.ok) {
    throw new Error("Google Sheets append failed.");
  }
};

export async function POST(request) {
  try {
    const payload = await request.json();
    const lead = {
      name: String(payload.name || ""),
      company: String(payload.company || ""),
      email: String(payload.email || ""),
    };
    const errors = validateLead(lead);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    await appendLeadToSheet(lead, request);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("estudio-abierto-leads error", error);
    return NextResponse.json(
      {
        ok: false,
        errors: {
          form: "No pudimos registrar tus datos. Intenta nuevamente en unos minutos.",
        },
      },
      { status: 500 }
    );
  }
}
