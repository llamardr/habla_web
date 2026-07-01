import crypto from "crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const SHEET_NAME = process.env.ESTUDIO_ABIERTO_SHEET_NAME || "Leads";
const LEAD_HEADERS = [
  "timestamp",
  "nombre",
  "compania",
  "telefono",
  "correo",
  "fuente",
  "user_agent",
  "rubro",
  "rol",
];
const HEADER_ALIASES = {
  compania: "compania",
  "compañia": "compania",
  "compañía": "compania",
  company: "compania",
  email: "correo",
  name: "nombre",
  phone: "telefono",
  role: "rol",
};

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

const getColumnName = (index) => {
  let columnName = "";
  let columnNumber = index + 1;

  while (columnNumber > 0) {
    const remainder = (columnNumber - 1) % 26;
    columnName = String.fromCharCode(65 + remainder) + columnName;
    columnNumber = Math.floor((columnNumber - 1) / 26);
  }

  return columnName;
};

const normalizeHeader = (header = "") => {
  const normalized = header
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_");

  return HEADER_ALIASES[normalized] || normalized;
};

const parseServiceAccountJson = () => {
  const rawJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!rawJson) return null;

  const parsed = JSON.parse(rawJson);

  return {
    clientEmail: parsed.client_email,
    privateKey: normalizePrivateKey(parsed.private_key),
  };
};

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

const getPhoneDigits = (phone = "") => phone.replace(/\D/g, "");

const hasSequentialPhoneDigits = (digits) =>
  "01234567890123456789".includes(digits) ||
  "98765432109876543210".includes(digits);

const validatePhone = (phone = "") => {
  const trimmed = phone.trim();
  const digits = getPhoneDigits(trimmed);

  return (
    /^[+()\d\s.-]+$/.test(trimmed) &&
    digits.length >= 8 &&
    digits.length <= 15 &&
    !/^(\d)\1+$/.test(digits) &&
    !hasSequentialPhoneDigits(digits) &&
    !hasSuspiciousText(trimmed)
  );
};

const validateLead = ({
  name = "",
  company = "",
  rubro = "",
  role = "",
  phone = "",
  email = "",
}) => {
  const errors = {};

  if (hasSuspiciousText(name) || name.trim().split(/\s+/).length < 2) {
    errors.name = "Ingresa tu nombre y apellido reales.";
  }

  if (hasSuspiciousText(company)) {
    errors.company = "Ingresa una compañía válida.";
  }

  if (hasSuspiciousText(rubro)) {
    errors.rubro = "Ingresa un rubro válido.";
  }

  if (hasSuspiciousText(role)) {
    errors.role = "Ingresa un rol válido.";
  }

  if (!validatePhone(phone)) {
    errors.phone = "Ingresa un número de teléfono válido.";
  }

  if (!validateEmail(email)) {
    errors.email = "Ingresa un correo válido.";
  }

  return errors;
};

const getServiceAccountConfig = () => {
  const spreadsheetId = process.env.ESTUDIO_ABIERTO_SHEET_ID;
  const serviceAccount = parseServiceAccountJson();
  const clientEmail =
    serviceAccount?.clientEmail || process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey =
    serviceAccount?.privateKey ||
    normalizePrivateKey(process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY);

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

const getSheetHeaders = async ({ spreadsheetId }, accessToken) => {
  const range = encodeURIComponent(`${SHEET_NAME}!1:1`);
  const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`;

  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Google Sheets header read failed.");
  }

  const data = await response.json();
  const existingHeaders = data.values?.[0] || [];
  const normalizedExistingHeaders = existingHeaders.map(normalizeHeader);
  const headers =
    normalizedExistingHeaders.length > 0 ? normalizedExistingHeaders : LEAD_HEADERS;

  return [
    ...headers,
    ...LEAD_HEADERS.filter((header) => !headers.includes(header)),
  ];
};

const updateSheetHeaders = async ({ spreadsheetId }, accessToken, headers) => {
  const lastColumn = getColumnName(headers.length - 1);
  const range = encodeURIComponent(`${SHEET_NAME}!A1:${lastColumn}1`);
  const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?valueInputOption=RAW`;

  const response = await fetch(endpoint, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      values: [headers],
    }),
  });

  if (!response.ok) {
    throw new Error("Google Sheets header update failed.");
  }
};

const appendLeadToSheet = async (lead, request) => {
  const config = getServiceAccountConfig();
  const accessToken = await getAccessToken(config);
  const headers = await getSheetHeaders(config, accessToken);
  await updateSheetHeaders(config, accessToken, headers);

  const valuesByHeader = {
    timestamp: new Date().toISOString(),
    nombre: lead.name.trim(),
    compania: lead.company.trim(),
    telefono: lead.phone.trim(),
    correo: lead.email.trim().toLowerCase(),
    fuente: "estudio-abierto-informe-final",
    user_agent: request.headers.get("user-agent") || "",
    rubro: lead.rubro.trim(),
    rol: lead.role.trim(),
  };
  const lastColumn = getColumnName(headers.length - 1);
  const range = encodeURIComponent(`${SHEET_NAME}!A:${lastColumn}`);
  const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      values: [headers.map((header) => valuesByHeader[header] || "")],
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
      rubro: String(payload.rubro || ""),
      role: String(payload.role || payload.rol || ""),
      phone: String(payload.phone || ""),
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
