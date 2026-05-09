"use client";

import React, { useActionState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { loginAction } from "./actions";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, {});

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 bg-[#fffaf5]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-[#0e0e0e] text-white rounded-2xl p-10 border border-[#e6a34d]/30 shadow-[0_30px_80px_-30px_rgba(168,116,32,0.4)]">
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#e6a34d]/15 border border-[#e6a34d]/40 flex items-center justify-center mb-5">
              <FontAwesomeIcon icon={faLock} className="text-[#e6a34d] text-lg" />
            </div>
            <p className="text-[#e6a34d] uppercase tracking-[0.4em] text-[10px] font-bold mb-2">
              Restricted area
            </p>
            <h1 className="font-serif text-3xl">Admin Sign-in</h1>
            <p className="text-white/55 text-sm mt-3">
              Enter the admin password to access the blog uploader.
            </p>
          </div>

          <form action={formAction} className="space-y-4">
            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-white/60">
                Password
              </span>
              <input
                type="password"
                name="password"
                required
                autoFocus
                placeholder="••••••••"
                className="mt-2 w-full bg-white/5 border border-white/15 focus:border-[#e6a34d] focus:ring-2 focus:ring-[#e6a34d]/30 rounded-lg px-4 py-3 text-sm outline-none transition-colors text-white placeholder-white/30"
              />
            </label>

            {state?.error && (
              <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
                {state.error}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-[#e6a34d] text-[#1a1a1a] font-bold uppercase tracking-[0.18em] text-xs py-3 rounded-lg hover:bg-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <FontAwesomeIcon icon={faRightToBracket} className="text-xs" />
              {pending ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-400 text-xs mt-6">
          Forgot the password? Check your <code>.env.local</code>.
        </p>
      </motion.div>
    </div>
  );
}
