"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Phone } from "lucide-react";
import { PHONE_NUMBER, PHONE_E164 } from "@/../site.config";

/**
 * ContactForm — Hero-attached lead capture.
 *
 * Posts to /api/lead (writes to Supabase `leads` table). Honeypot field
 * catches the easy bots. Designed to sit in Hero.rightColumn on dark bg.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      service: String(data.get("service") ?? ""),
      hp: String(data.get("hp") ?? ""),
      source_url: typeof window !== "undefined" ? window.location.href : "",
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        throw new Error(json.error ?? "Submission failed");
      }
      form.reset();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Submission failed");
    }
  }

  if (status === "success") {
    return (
      <div
        id="free-estimate"
        className="relative rounded-[1.25rem] bg-white p-8 border border-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]"
      >
        <div className="flex flex-col items-center text-center py-6">
          <CheckCircle2 size={48} className="text-brand-accent mb-4" aria-hidden="true" />
          <h2 className="font-display text-[20px] font-bold text-brand-dark mb-2">
            Estimate request received
          </h2>
          <p className="text-gray-600 text-[14px] leading-[1.7] mb-5 max-w-sm">
            We&apos;ll reach out within one business day. If you&apos;d like to talk sooner, call Aldo directly.
          </p>
          <a
            href={`tel:${PHONE_E164}`}
            className="inline-flex items-center gap-2 bg-gray-900 text-white font-semibold text-[13px] h-11 px-5 rounded-[0.75rem] hover:bg-gray-800 transition-colors"
          >
            <Phone size={14} aria-hidden="true" />
            {PHONE_NUMBER}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      id="free-estimate"
      onSubmit={handleSubmit}
      className="relative rounded-[1.25rem] bg-white p-6 sm:p-7 border border-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]"
      noValidate
    >
      <div className="mb-5">
        <p className="text-[11px] uppercase tracking-[0.14em] font-bold text-brand-accent mb-1">
          Free Estimate
        </p>
        <h2 className="font-display text-[22px] font-bold text-brand-dark leading-tight">
          Talk to a licensed contractor
        </h2>
        <p className="text-gray-500 text-[13px] mt-1.5 leading-[1.6]">
          Not a call center. Aldo responds personally.
        </p>
      </div>

      <div className="space-y-3.5">
        <Field label="Name" name="name" required autoComplete="name" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <Field label="Phone" name="phone" type="tel" required autoComplete="tel" />
          <Field label="Email" name="email" type="email" required autoComplete="email" />
        </div>

        <div>
          <label
            htmlFor="contact-service"
            className="block text-[12px] font-semibold text-gray-700 mb-1.5 tracking-wide uppercase"
          >
            Project
          </label>
          <select
            id="contact-service"
            name="service"
            defaultValue=""
            aria-label="Project type"
            className="w-full h-11 px-3 rounded-[0.625rem] bg-gray-50 border border-gray-200 text-[14px] text-brand-dark focus:outline-none focus:border-brand-accent focus:bg-white transition-colors"
          >
            <option value="" disabled>
              Select one
            </option>
            <option value="Kitchen Remodel">Kitchen Remodel</option>
            <option value="Home Remodel / Addition">Home Remodel / Addition</option>
            <option value="Custom Home">Custom Home Build</option>
            <option value="Outdoor Kitchen / Pergola">Outdoor Kitchen / Pergola</option>
            <option value="Pool / Hardscape">Pool / Hardscape</option>
            <option value="Generator">Whole-House Generator</option>
            <option value="Electrical / Plumbing">Electrical / Plumbing</option>
            <option value="Other">Other — explain below</option>
          </select>
        </div>

        {/* Honeypot — real users leave this empty */}
        <div className="hidden" aria-hidden="true">
          <label>
            Leave blank
            <input type="text" name="hp" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
      </div>

      {status === "error" && errorMessage && (
        <p className="mt-4 text-[12px] text-brand-primary">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-brand-primary text-white font-bold text-[13px] tracking-[0.04em] uppercase h-12 rounded-[0.75rem] hover:opacity-90 disabled:opacity-60 transition-opacity shadow-[0_4px_16px_rgba(139,30,34,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={15} className="animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          "Request Free Estimate"
        )}
      </button>

      <p className="mt-3 text-center text-[11px] text-gray-400">
        Or call{" "}
        <a
          href={`tel:${PHONE_E164}`}
          className="text-brand-link hover:text-brand-link-700 hover:underline font-semibold"
        >
          {PHONE_NUMBER}
        </a>
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  const id = `contact-${name}`;
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[12px] font-semibold text-gray-700 mb-1.5 tracking-wide uppercase"
      >
        {label}
        {required && <span className="text-brand-primary ml-0.5">*</span>}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        aria-label={label}
        className="w-full h-11 px-3 rounded-[0.625rem] bg-gray-50 border border-gray-200 text-[14px] text-brand-dark focus:outline-none focus:border-brand-accent focus:bg-white transition-colors"
      />
    </div>
  );
}
