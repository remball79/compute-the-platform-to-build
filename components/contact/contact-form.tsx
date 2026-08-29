"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex min-h-[520px] flex-col justify-between border border-foreground/10 bg-card p-8 sm:p-12">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background">
          <Check className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Message received</p>
          <h2 className="max-w-md font-display text-5xl leading-none tracking-tight text-foreground">We&apos;ll be in touch soon.</h2>
          <p className="mt-6 max-w-md leading-7 text-muted-foreground">Thanks for reaching out. Someone from our team will get back to you shortly.</p>
        </div>
        <button type="button" onClick={() => setSubmitted(false)} className="self-start text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline">Send another message</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-foreground/10 bg-card p-8 sm:p-12">
      <div className="mb-10 flex items-start justify-between gap-6">
        <div>
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Start a conversation</p>
          <h2 className="font-display text-4xl tracking-tight text-foreground">Tell us more.</h2>
        </div>
        <ArrowUpRight className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-muted-foreground">
          Name
          <input required name="name" type="text" autoComplete="name" placeholder="Your name" className="h-12 w-full border-b border-foreground/20 bg-transparent px-0 text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-foreground" />
        </label>
        <label className="space-y-2 text-sm text-muted-foreground">
          Work email
          <input required name="email" type="email" autoComplete="email" placeholder="you@company.com" className="h-12 w-full border-b border-foreground/20 bg-transparent px-0 text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-foreground" />
        </label>
      </div>
      <label className="mt-7 block space-y-2 text-sm text-muted-foreground">
        Company
        <input name="company" type="text" autoComplete="organization" placeholder="Your company" className="h-12 w-full border-b border-foreground/20 bg-transparent px-0 text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-foreground" />
      </label>
      <label className="mt-7 block space-y-2 text-sm text-muted-foreground">
        How can we help?
        <textarea required name="message" rows={4} placeholder="Tell us about your project..." className="w-full resize-none border-b border-foreground/20 bg-transparent px-0 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-foreground" />
      </label>
      <Button type="submit" className="mt-10 h-12 w-full rounded-full bg-foreground text-background hover:bg-foreground/90">Send message</Button>
    </form>
  );
}
