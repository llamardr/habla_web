import JsonLd from "./JsonLd";
import { FAQ_ITEMS } from "../lib/faq";
import { faqSchema } from "../lib/schema";

export default function FaqSection() {
  return (
    <section id="faq" className="bg-[#fdf6ea] py-16 sm:py-20 lg:py-24">
      <JsonLd data={faqSchema(FAQ_ITEMS)} />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="type-h2 type-black mb-8 lg:mb-10">Preguntas frecuentes</h2>

        <dl className="divide-y divide-black/10 border-y border-black/10">
          {FAQ_ITEMS.map((item) => {
            const paragraphs = Array.isArray(item.answer)
              ? item.answer
              : [item.answer];

            return (
              <div key={item.question} className="py-2">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4">
                    <dt className="type-strong text-[#111827]">
                      {item.question}
                    </dt>
                    <span
                      aria-hidden="true"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#006aef] text-[#fdf6ea] transition-transform duration-200 group-open:rotate-45"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 3v10M3 8h10"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </summary>
                  <dd className="max-w-3xl pb-5 pr-12">
                    {paragraphs.map((paragraph, index) => (
                      <p
                        key={index}
                        className={`type-body text-[#1f2937] ${index > 0 ? "mt-4" : ""}`}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </dd>
                </details>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
