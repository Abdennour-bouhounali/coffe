import { useState } from "react";
import { Send } from "lucide-react";
import { siteConfig } from "../../../data/site";
import { Button } from "../../../components/ui/Button";

const initialForm = {
  name: "",
  email: "",
  subject: "Question générale",
  message: "",
};

const fieldClassName =
  "mt-2 min-h-12 w-full rounded-2xl border border-ink/15 bg-white/45 px-4 py-3 text-base outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20";

export function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");

    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;

    if (!endpoint) {
      const subject = encodeURIComponent(`${form.subject} — ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\nRépondre à : ${form.email}`);
      window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
      setStatus("idle");
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("La demande n’a pas pu être envoyée.");

      setForm(initialForm);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className="grid gap-6" onSubmit={handleSubmit}>
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="text-sm font-semibold">
          Votre prénom
          <input
            autoComplete="given-name"
            className={fieldClassName}
            name="name"
            onChange={updateField}
            required
            value={form.name}
          />
        </label>
        <label className="text-sm font-semibold">
          Votre e-mail
          <input
            autoComplete="email"
            className={fieldClassName}
            name="email"
            onChange={updateField}
            required
            type="email"
            value={form.email}
          />
        </label>
      </div>

      <label className="text-sm font-semibold">
        Votre demande
        <select
          className={fieldClassName}
          name="subject"
          onChange={updateField}
          value={form.subject}
        >
          <option>Question générale</option>
          <option>Allergènes et alimentation</option>
          <option>Groupe ou événement</option>
          <option>Presse et collaboration</option>
          <option>Candidature</option>
        </select>
      </label>

      <label className="text-sm font-semibold">
        Votre message
        <textarea
          className={`${fieldClassName} min-h-40 resize-y`}
          name="message"
          onChange={updateField}
          required
          value={form.message}
        />
      </label>

      <div aria-live="polite">
        {status === "success" && (
          <p className="mb-4 text-sm font-semibold text-[#49613d]">
            Merci, votre message est bien arrivé.
          </p>
        )}
        {status === "error" && (
          <p className="mb-4 text-sm font-semibold text-terracotta">
            L’envoi n’a pas abouti. Écrivez-nous directement à{" "}
            <a className="underline" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
            .
          </p>
        )}
        <Button disabled={status === "sending"} icon type="submit">
          <Send aria-hidden="true" className="size-4" />
          {status === "sending" ? "Envoi en cours…" : "Envoyer le message"}
        </Button>
      </div>
    </form>
  );
}
