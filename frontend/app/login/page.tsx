"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const router = useRouter()
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const res = await signIn("credentials", { login, password, redirect: false })
    if (res?.error) {
      setError("Неверный логин или пароль")
      setLoading(false)
    } else {
      router.push("/")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)" }}>

      {/* светящиеся шары */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)", filter: "blur(60px)" }} />
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full opacity-25"
        style={{ background: "radial-gradient(circle, #4f46e5, transparent 70%)", filter: "blur(60px)" }} />
      <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, #ec4899, transparent 70%)", filter: "blur(80px)" }} />

      {/* карточка */}
      <div className="relative w-full max-w-md mx-4 z-10">
        <div
          className="rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(24px)" }}
        >
          {/* шапка */}
          <div className="px-8 pt-10 pb-6 text-center"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
              style={{ background: "rgba(124,58,237,0.3)", border: "1px solid rgba(124,58,237,0.5)" }}>
              <span className="text-3xl">🚀</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Space Scarface</h1>
            <p className="text-white/40 text-sm mt-1">Панель управления</p>
          </div>

          {/* форма */}
          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/50 uppercase tracking-widest">
                Логин
              </label>
              <Input
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="admin"
                autoComplete="username"
                required
                className="h-12 rounded-xl text-white placeholder:text-white/20 border-white/10 focus:border-violet-400"
                style={{ background: "rgba(255,255,255,0.07)" }}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/50 uppercase tracking-widest">
                Пароль
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                className="h-12 rounded-xl text-white placeholder:text-white/20 border-white/10 focus:border-violet-400"
                style={{ background: "rgba(255,255,255,0.07)" }}
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm text-red-300"
                style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)" }}>
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl font-semibold text-white border-0 mt-2 transition-all duration-200"
              style={{ background: loading ? "rgba(124,58,237,0.5)" : "linear-gradient(135deg, #7c3aed, #4f46e5)" }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Входим...
                </span>
              ) : "Войти"}
            </Button>
          </form>
        </div>

        <p className="text-center text-white/20 text-xs mt-6">Space Scarface · Admin Panel</p>
      </div>
    </div>
  )
}
