"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { trackGAEvent } from "../lib/googleAnalytics";
import { estudioAbiertoReports } from "../lib/estudioAbiertoReports";

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

const hasSuspiciousText = (value) => {
  const normalized = value.trim().toLowerCase();
  if (normalized.length < 2) return true;
  if (/^(.)\1{2,}$/.test(normalized.replace(/\s/g, ""))) return true;
  if (/^[x\s]+$/.test(normalized)) return true;
  return blockedTerms.some((term) => normalized.includes(term));
};

const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()) &&
  !hasSuspiciousText(email.split("@")[0]);

const getPhoneDigits = (phone) => phone.replace(/\D/g, "");

const hasSequentialPhoneDigits = (digits) =>
  "01234567890123456789".includes(digits) ||
  "98765432109876543210".includes(digits);

const validatePhone = (phone) => {
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

export default function EstudioAbiertoDownloadCard({ className = "", reportId = "educacion" }) {
  const report = estudioAbiertoReports[reportId] || estudioAbiertoReports.educacion;
  const isIaReport = reportId === "ia";
  const successRef = useRef(null);
  const submittingRef = useRef(false);
  const [formValues, setFormValues] = useState({
    name: "",
    company: "",
    rubro: "",
    role: "",
    phone: "",
    email: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasDownloaded, setHasDownloaded] = useState(false);

  useEffect(() => {
    if (hasDownloaded) successRef.current?.focus();
  }, [hasDownloaded]);

  const updateField = (field) => (event) => {
    setFormValues((current) => ({
      ...current,
      [field]: event.target.value,
    }));
    setErrors((current) => ({
      ...current,
      [field]: "",
      form: "",
    }));
  };

  const updateTermsAccepted = (event) => {
    setFormValues((current) => ({
      ...current,
      termsAccepted: event.target.checked,
    }));
    setErrors((current) => ({
      ...current,
      termsAccepted: "",
      form: "",
    }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (
      hasSuspiciousText(formValues.name) ||
      formValues.name.trim().split(/\s+/).length < 2
    ) {
      nextErrors.name = "Ingresa tu nombre y apellido reales.";
    }

    if (hasSuspiciousText(formValues.company)) {
      nextErrors.company = "Ingresa una compañía válida.";
    }

    if (hasSuspiciousText(formValues.rubro)) {
      nextErrors.rubro = "Ingresa un rubro válido.";
    }

    if (hasSuspiciousText(formValues.role)) {
      nextErrors.role = "Ingresa un rol válido.";
    }

    if (!validatePhone(formValues.phone)) {
      nextErrors.phone = "Ingresa un número de teléfono válido.";
    }

    if (!validateEmail(formValues.email)) {
      nextErrors.email = "Ingresa un correo válido.";
    }

    if (!formValues.termsAccepted) {
      nextErrors.termsAccepted =
        "Debes aceptar los términos y la política de privacidad.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const downloadReport = (source = "estudio_abierto_download_card") => {
    trackGAEvent("file_download", {
      source,
      file_name: report.fileName,
      file_extension: report.extension,
      study: reportId,
      link_url: report.url,
    });

    const downloadLink = document.createElement("a");
    downloadLink.href = report.url;
    downloadLink.download = report.fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submittingRef.current || !validateForm()) return;

    submittingRef.current = true;
    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/estudio-abierto-leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formValues, study: reportId }),
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        setErrors(
          result.errors || {
            form: "No pudimos registrar tus datos. Intenta nuevamente.",
          }
        );
        return;
      }

      trackGAEvent("generate_lead", {
        source: "estudio_abierto_download_form",
        method: "form",
        form_name: report.formName,
        study: reportId,
        lead_type: "report_download",
      });
      if (!isIaReport) downloadReport("estudio_abierto_form_success");
      setHasDownloaded(true);
    } catch (error) {
      setErrors({
        form: "No pudimos registrar tus datos. Intenta nuevamente.",
      });
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  const cardStateClassName = hasDownloaded
    ? "border-transparent bg-[#006aef] text-center text-[#fdf6ea] shadow-[0_8px_24px_rgba(0,106,239,0.08)]"
    : "border-black/10 bg-[#fdf6ea] text-left text-black shadow-[0_8px_24px_rgba(0,0,0,0.06)]";

  return (
    <div
      className={`rounded-[2rem] border p-6 transition-all duration-500 ease-out sm:p-8 ${cardStateClassName} ${className}`}
    >
      <div className="flex justify-center overflow-visible rounded-[1.5rem] bg-transparent py-2 text-black">
        <Image
          src={report.cover}
          alt={report.coverAlt}
          width={isIaReport ? 1080 : 1130}
          height={isIaReport ? 1350 : 663}
          sizes="(max-width: 640px) 70vw, 33vw"
          className={isIaReport ? "h-48 w-full rounded-2xl object-cover object-[50%_45%]" : "h-auto w-1/3 min-w-[12rem] max-w-[24rem]"}
        />
      </div>

      {hasDownloaded ? (
        <div ref={successRef} tabIndex={-1} role="status" className="mx-auto mt-8 flex max-w-2xl flex-col items-center justify-center px-2 py-8 text-center outline-none sm:py-10">
          <h3 className="type-h3 type-beige">
            {isIaReport ? "Tu informe está listo para explorar" : "Tu informe se ha descargado"}
          </h3>
          <p className="type-body mt-4 max-w-xl text-center text-[#fdf6ea]/85">
            {isIaReport ? "Ya registramos tus datos. Explora las 14 láminas en tu navegador o guarda una copia para volver a los hallazgos cuando quieras." : "Ya registramos tus datos. Si el archivo no se abrió automáticamente, puedes descargarlo nuevamente sin enviar otro formulario."}
          </p>
          {isIaReport && (
            <a href={report.url} target="_blank" rel="noopener noreferrer"
              onClick={() => trackGAEvent("view_report", { study: reportId, link_url: report.url, source: "estudio_abierto_form_success" })}
              className="btn type-button mt-6 h-auto min-h-12 w-full max-w-md border-2 border-[#fdf6ea] bg-[#fdf6ea] px-6 py-3 text-[#006aef] hover:border-[#fdf6ea] hover:bg-[#fdf6ea]">
              ABRIR INFORME ↗
            </a>
          )}
          <button
            type="button"
            onClick={() => downloadReport("estudio_abierto_redownload")}
            className="btn type-button mt-6 w-full max-w-md border-2 border-[#fdf6ea] bg-[#fdf6ea] px-6 text-[#006aef] transition-transform duration-200 ease-in-out hover:scale-[1.02] hover:border-[#fdf6ea] hover:bg-[#fdf6ea]"
          >
            {isIaReport ? "DESCARGAR PDF ↓" : "DESCARGAR DE NUEVO"}
          </button>
          {isIaReport && <p className="type-body-small mt-4 text-[#fdf6ea]/85">Se abre en una pestaña nueva. El archivo descargado también se abre con tu navegador.</p>}
        </div>
      ) : (
        <form className="mt-7 space-y-4" onSubmit={handleSubmit} noValidate>
          {isIaReport && <div className="pb-3"><p className="type-overline !text-[#006aef]">Informe PDF · 14 láminas</p><h3 className="type-h3 mt-3">Los limeños y la IA</h3><p className="type-body-small mt-3 text-black/70">Completa tus datos para abrir el informe completo y descargarlo en PDF.</p></div>}
          <div>
            <label
              className="type-ui text-black/75"
              htmlFor="download-name"
            >
              Nombre y apellido
            </label>
            <input
              id="download-name"
              type="text"
              value={formValues.name}
              onChange={updateField("name")}
              className="type-ui mt-2 w-full rounded-[var(--rounded-btn)] border border-black/15 bg-[#fdf6ea] px-4 py-3 text-black outline-none focus:border-[#006aef]"
              autoComplete="name"
            />
            {errors.name && (
              <p className="type-body-small mt-2 text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              className="type-ui text-black/75"
              htmlFor="download-company"
            >
              Compañía
            </label>
            <input
              id="download-company"
              type="text"
              value={formValues.company}
              onChange={updateField("company")}
              className="type-ui mt-2 w-full rounded-[var(--rounded-btn)] border border-black/15 bg-[#fdf6ea] px-4 py-3 text-black outline-none focus:border-[#006aef]"
              autoComplete="organization"
            />
            {errors.company && (
              <p className="type-body-small mt-2 text-red-600">{errors.company}</p>
            )}
          </div>

          <div>
            <label
              className="type-ui text-black/75"
              htmlFor="download-rubro"
            >
              Rubro
            </label>
            <input
              id="download-rubro"
              type="text"
              value={formValues.rubro}
              onChange={updateField("rubro")}
              className="type-ui mt-2 w-full rounded-[var(--rounded-btn)] border border-black/15 bg-[#fdf6ea] px-4 py-3 text-black outline-none focus:border-[#006aef]"
              autoComplete="off"
            />
            {errors.rubro && (
              <p className="type-body-small mt-2 text-red-600">{errors.rubro}</p>
            )}
          </div>

          <div>
            <label
              className="type-ui text-black/75"
              htmlFor="download-role"
            >
              Rol
            </label>
            <input
              id="download-role"
              type="text"
              value={formValues.role}
              onChange={updateField("role")}
              className="type-ui mt-2 w-full rounded-[var(--rounded-btn)] border border-black/15 bg-[#fdf6ea] px-4 py-3 text-black outline-none focus:border-[#006aef]"
              autoComplete="organization-title"
            />
            {errors.role && (
              <p className="type-body-small mt-2 text-red-600">{errors.role}</p>
            )}
          </div>

          <div>
            <label
              className="type-ui text-black/75"
              htmlFor="download-phone"
            >
              Teléfono
            </label>
            <input
              id="download-phone"
              type="tel"
              value={formValues.phone}
              onChange={updateField("phone")}
              className="type-ui mt-2 w-full rounded-[var(--rounded-btn)] border border-black/15 bg-[#fdf6ea] px-4 py-3 text-black outline-none focus:border-[#006aef]"
              autoComplete="tel"
              inputMode="tel"
            />
            {errors.phone && (
              <p className="type-body-small mt-2 text-red-600">{errors.phone}</p>
            )}
          </div>

          <div>
            <label
              className="type-ui text-black/75"
              htmlFor="download-email"
            >
              Correo
            </label>
            <input
              id="download-email"
              type="email"
              value={formValues.email}
              onChange={updateField("email")}
              className="type-ui mt-2 w-full rounded-[var(--rounded-btn)] border border-black/15 bg-[#fdf6ea] px-4 py-3 text-black outline-none focus:border-[#006aef]"
              autoComplete="email"
            />
            {errors.email && (
              <p className="type-body-small mt-2 text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              className="type-body-small flex items-start gap-3 text-black/75"
              htmlFor="download-terms"
            >
              <input
                id="download-terms"
                type="checkbox"
                checked={formValues.termsAccepted}
                onChange={updateTermsAccepted}
                className="mt-1 h-4 w-4 shrink-0 accent-[#006aef]"
                required
              />
              <span>
                Al enviar tus datos aceptas los{" "}
                <a
                  href="https://docs.google.com/document/d/1cABUK1ozAwzBLrNOh1mhlE5taRmkpwnPDoe7bYC3lhY/edit?tab=t.0#heading=h.v572f46y7ns2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="type-link"
                  onClick={() =>
                    trackGAEvent("outbound_click", {
                      source: "estudio_abierto_download_form",
                      channel: "google_docs",
                      item_name: "terminos_y_condiciones",
                      link_url:
                        "https://docs.google.com/document/d/1cABUK1ozAwzBLrNOh1mhlE5taRmkpwnPDoe7bYC3lhY/edit?tab=t.0#heading=h.v572f46y7ns2",
                    })
                  }
                >
                  T&eacute;rminos y Condiciones
                </a>{" "}
                y la{" "}
                <a
                  href="https://docs.google.com/document/d/1rdoQGLYoBwZbu6Amga5cVC34AU6xfwmhQpQo3S3XRT4/edit?tab=t.0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="type-link"
                  onClick={() =>
                    trackGAEvent("outbound_click", {
                      source: "estudio_abierto_download_form",
                      channel: "google_docs",
                      item_name: "politica_de_privacidad",
                      link_url:
                        "https://docs.google.com/document/d/1rdoQGLYoBwZbu6Amga5cVC34AU6xfwmhQpQo3S3XRT4/edit?tab=t.0",
                    })
                  }
                >
                  Pol&iacute;tica de Privacidad.
                </a>
              </span>
            </label>
            {errors.termsAccepted && (
              <p className="type-body-small mt-2 text-red-600">
                {errors.termsAccepted}
              </p>
            )}
          </div>

          {errors.form && <p role="alert" className="type-body-small text-red-600">{errors.form}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn type-button mt-2 w-full border-2 border-[#006aef] bg-[#006aef] px-6 text-[#fdf6ea] transition-transform duration-200 ease-in-out hover:scale-[1.02] hover:border-[#006aef] hover:bg-[#006aef] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "REGISTRANDO..." : isIaReport ? "ACCEDER AL INFORME →" : "DESCARGAR INFORME PDF FINAL"}
          </button>
        </form>
      )}
    </div>
  );
}
