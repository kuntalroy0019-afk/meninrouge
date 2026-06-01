"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const EXPO = [0.16, 1, 0.3, 1] as const;

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "register">("signin");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Front-end demo only — no real auth. Route to the account area.
    router.push("/account");
  };

  return (
    <div className="grid min-h-[calc(100vh-57px)] grid-cols-1 lg:grid-cols-2">
      {/* Editorial image */}
      <div className="relative hidden lg:block">
        <Image
          src="https://images.unsplash.com/photo-1592593044691-f45c8db82a48?auto=format&fit=crop&w=1400&q=80"
          alt="Man in a suit fastening tiger-eye cufflinks"
          fill
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
        <div className="absolute bottom-10 left-10 text-cream">
          <p className="font-sans text-[11px] uppercase tracking-luxe">The House</p>
          <p className="mt-2 max-w-xs font-serif text-3xl font-light italic">
            Sign in. Write your own rules.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center px-6 py-16 md:px-12">
        <div className="w-full max-w-sm">
          <Link href="/" className="font-serif text-3xl font-light text-ink">
            Men in <span className="italic">Rogue</span>
          </Link>

          {/* tabs */}
          <div className="mt-10 flex border-b border-rose-gold/20">
            {(["signin", "register"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`relative flex-1 pb-3 font-sans text-xs uppercase tracking-wide2 transition-colors ${
                  mode === m ? "text-ink" : "text-ink-faint hover:text-ink-soft"
                }`}
              >
                {m === "signin" ? "Sign in" : "Create account"}
                {mode === m && (
                  <motion.span
                    layoutId="auth-underline"
                    className="absolute -bottom-px left-0 right-0 h-px bg-rose-gold"
                  />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={mode}
              onSubmit={submit}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.35, ease: EXPO }}
              className="mt-8 space-y-5"
            >
              {mode === "register" && (
                <Field label="Full name" type="text" placeholder="Aria Mehta" />
              )}
              <Field label="Email" type="email" placeholder="you@example.com" />
              <Field label="Password" type="password" placeholder="••••••••" />

              {mode === "signin" && (
                <div className="flex justify-end">
                  <button type="button" className="font-sans text-[11px] uppercase tracking-wide2 text-ink-faint hover:text-rose-gold">
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-full bg-ink py-4 font-sans text-xs uppercase tracking-wide2 text-cream transition-colors hover:bg-rose-gold"
              >
                {mode === "signin" ? "Sign in" : "Create account"}
              </button>
            </motion.form>
          </AnimatePresence>

          <div className="my-7 flex items-center gap-4 text-ink-faint">
            <span className="h-px flex-1 bg-rose-gold/15" />
            <span className="font-sans text-[10px] uppercase tracking-wide2">or</span>
            <span className="h-px flex-1 bg-rose-gold/15" />
          </div>

          <div className="space-y-3">
            <button className="w-full rounded-full border border-ink/15 py-3.5 font-sans text-xs uppercase tracking-wide2 text-ink transition-colors hover:border-rose-gold hover:text-rose-gold">
              Continue with Google
            </button>
            <button className="w-full rounded-full border border-ink/15 py-3.5 font-sans text-xs uppercase tracking-wide2 text-ink transition-colors hover:border-rose-gold hover:text-rose-gold">
              Continue with Apple
            </button>
          </div>

          <p className="mt-8 text-center font-sans text-[11px] leading-relaxed text-ink-faint">
            By continuing you agree to Men in Rogue&apos;s Terms & Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  type,
  placeholder,
}: {
  label: string;
  type: string;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-sans text-[11px] uppercase tracking-wide2 text-ink-soft">
        {label}
      </span>
      <input
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded-[2px] border border-ink/15 bg-blush-50 px-4 py-3 font-sans text-sm text-ink placeholder:text-ink-faint focus:border-rose-gold focus:outline-none"
      />
    </label>
  );
}
