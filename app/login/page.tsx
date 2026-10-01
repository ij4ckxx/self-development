"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap, Shield, ArrowRight, Lock, User as UserIcon } from "lucide-react";
import { APP_CONFIG, CURRENT_USER } from "@/lib/const";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("jegan@ascend.system");
  const [password, setPassword] = useState("••••••••");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 600);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#070913] text-slate-100 system-bg-grid p-4">
      {/* Background Energy Flares */}
      <div className="pointer-events-none fixed inset-0 radial-aura z-0 opacity-80" />
      <div className="pointer-events-none fixed inset-0 radial-aura-bottom z-0 opacity-70" />

      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0d1222]/90 backdrop-blur-2xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] z-10">
        {/* Top Emblem */}
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-sky-500 shadow-[0_0_25px_rgba(168,85,247,0.5)] mb-4">
            <Zap className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-wider">
            {APP_CONFIG.name}
          </h1>
          <p className="text-xs text-purple-300 font-mono tracking-widest uppercase mt-1">
            {APP_CONFIG.systemTitle} • Sovereign Access
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Player Identifier
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-900/80 pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
                placeholder="Enter player id"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Security Cipher
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-900/80 pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              glow
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <span>Syncing Neural Link...</span>
              ) : (
                <span className="flex items-center gap-2">
                  Enter System Gateway <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </div>
        </form>

        {/* Quick Demo Sovereign Profile Notice */}
        <div className="mt-6 pt-5 border-t border-white/10 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
            <Shield className="h-3.5 w-3.5 text-purple-400" />
            <span>Authenticated Hunter Profile: </span>
            <span className="text-white font-bold">{CURRENT_USER.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
