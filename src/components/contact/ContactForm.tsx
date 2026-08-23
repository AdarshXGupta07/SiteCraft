"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { contactSchema, type ContactFormValues } from "@/lib/validation";
import { PROJECT_TYPES } from "@/lib/constants";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClasses =
  "peer w-full rounded-lg border border-border bg-surface px-4 pt-6 pb-2 text-sm text-text placeholder-transparent transition-colors focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/15";

const labelClasses =
  "pointer-events-none absolute left-4 top-4 text-sm text-text-muted transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent-blue peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", company: "" },
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Honeypot — visually hidden but present in the DOM/tab order-free, catches naive bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("company")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="relative">
          <input id="name" placeholder=" " className={fieldClasses} {...register("name")} />
          <label htmlFor="name" className={labelClasses}>
            Name
          </label>
          {errors.name && (
            <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
          )}
        </div>
        <div className="relative">
          <input
            id="email"
            type="email"
            placeholder=" "
            className={fieldClasses}
            {...register("email")}
          />
          <label htmlFor="email" className={labelClasses}>
            Email
          </label>
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="projectType" className="mb-2 block text-sm text-text-muted">
          Project type
        </label>
        <select
          id="projectType"
          className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text transition-colors focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/15"
          {...register("projectType")}
        >
          <option value="">Choose one</option>
          {PROJECT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.projectType && (
          <p className="mt-1 text-xs text-red-600">{errors.projectType.message}</p>
        )}
      </div>

      <div className="relative">
        <textarea
          id="message"
          rows={5}
          placeholder=" "
          className={fieldClasses}
          {...register("message")}
        />
        <label htmlFor="message" className={labelClasses}>
          Message
        </label>
        {errors.message && (
          <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-gradient-accent inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium text-white shadow-[0_8px_24px_-8px_rgba(51,85,255,0.6)] transition-all hover:scale-105 hover:shadow-[0_12px_32px_-8px_rgba(51,85,255,0.75)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
      >
        {status === "submitting" && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
        )}
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>

      <AnimatePresence mode="wait">
        {status === "success" && (
          <motion.p
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 text-sm text-emerald-600"
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] text-white">
              ✓
            </span>
            Thanks — we&rsquo;ll get back to you soon.
          </motion.p>
        )}
        {status === "error" && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 text-sm text-red-600"
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] text-white">
              !
            </span>
            Something went wrong. Please try again in a moment.
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
