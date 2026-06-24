"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const REPORT_URL = "/estudio-abierto/informe-final-estudio-abierto.pdf";

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

export default function EstudioAbiertoResultsSection({ article }) {
  const [formValues, setFormValues] = useState({
    name: "",
    company: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const validateForm = () => {
    const nextErrors = {};

    if (hasSuspiciousText(formValues.name) || formValues.name.trim().split(/\s+/).length < 2) {
      nextErrors.name = "Ingresa tu nombre y apellido reales.";
    }

    if (hasSuspiciousText(formValues.company)) {
      nextErrors.company = "Ingresa una compañía válida.";
    }

    if (!validateEmail(formValues.email)) {
      nextErrors.email = "Ingresa un correo válido.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/estudio-abierto-leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
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

      const downloadLink = document.createElement("a");
      downloadLink.href = REPORT_URL;
      downloadLink.download = "informe-final-estudio-abierto.pdf";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();
    } catch (error) {
      setErrors({
        form: "No pudimos registrar tus datos. Intenta nuevamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="resultados-estudio-abierto"
      className="scroll-mt-28 bg-[#F4EEDF] py-14 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-4xl">
          <h2 className="mt-3 text-[clamp(2.4rem,7vw,5rem)] leading-[0.95]">
            Resultados de Estudio Abierto
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-7 text-black/75 sm:text-lg">
            Explora los principales hallazgos en formato artículo o descarga el
            informe final completo dejando tus datos.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
            <div className="relative min-h-[280px] bg-[#006aef] sm:min-h-[340px]">
              <Image
                src={article.imageUrl}
                alt={`Artículo: ${article.title}`}
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
              />
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#006aef]">
                Artículo
              </p>
              <h3 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl">
                {article.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-black/75">
                {article.description}
              </p>
              <Link
                href={`/casos-de-exito/${article.slug}`}
                className="mt-6 inline-flex items-center rounded-[var(--rounded-btn)] border-2 border-[#006aef] bg-[#006aef] px-5 py-3 text-sm font-semibold text-white no-underline transition-transform duration-200 ease-in-out hover:scale-105"
              >
                LEER ARTÍCULO
              </Link>
            </div>
          </article>

          <div className="rounded-[2rem] border border-black/10 bg-white p-6 text-black shadow-[0_8px_24px_rgba(0,0,0,0.06)] sm:p-8">
            <div className="overflow-hidden rounded-[1.5rem] bg-[#006aef] text-black">
              <Image
                src="/estudio-abierto/ea-results-cover-new.png"
                alt="Portada del informe final de Estudio Abierto"
                width={1130}
                height={663}
                sizes="(max-width: 1024px) 100vw, 520px"
                className="h-auto w-full"
              />
            </div>
            <h4 className="mt-7 text-lg font-semibold text-black">
              Llena tus datos para descargar el estudio
            </h4>

            <form className="mt-7 space-y-4" onSubmit={handleSubmit} noValidate>
              <div>
                <label className="text-sm font-medium text-black/75" htmlFor="download-name">
                  Nombre y apellido
                </label>
                <input
                  id="download-name"
                  type="text"
                  value={formValues.name}
                  onChange={updateField("name")}
                  className="mt-2 w-full rounded-[var(--rounded-btn)] border border-black/15 bg-white px-4 py-3 text-sm text-black outline-none focus:border-[#006aef]"
                  autoComplete="name"
                />
                {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label className="text-sm font-medium text-black/75" htmlFor="download-company">
                  Compañía
                </label>
                <input
                  id="download-company"
                  type="text"
                  value={formValues.company}
                  onChange={updateField("company")}
                  className="mt-2 w-full rounded-[var(--rounded-btn)] border border-black/15 bg-white px-4 py-3 text-sm text-black outline-none focus:border-[#006aef]"
                  autoComplete="organization"
                />
                {errors.company && (
                  <p className="mt-2 text-sm text-red-600">{errors.company}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-black/75" htmlFor="download-email">
                  Correo
                </label>
                <input
                  id="download-email"
                  type="email"
                  value={formValues.email}
                  onChange={updateField("email")}
                  className="mt-2 w-full rounded-[var(--rounded-btn)] border border-black/15 bg-white px-4 py-3 text-sm text-black outline-none focus:border-[#006aef]"
                  autoComplete="email"
                />
                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
              </div>

              {errors.form && <p className="text-sm text-red-600">{errors.form}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn mt-2 w-full border-2 border-[#006aef] bg-[#006aef] px-6 text-sm font-semibold text-white transition-transform duration-200 ease-in-out hover:scale-[1.02] hover:border-[#006aef] hover:bg-[#006aef] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "REGISTRANDO..." : "DESCARGAR INFORME PDF FINAL"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
