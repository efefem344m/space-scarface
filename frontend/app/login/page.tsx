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
    <div className="min-h-screen flex items-center justify-center bg-gray-950 relative overflow-hidden">
      {/* фоновые блики */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-violet-900/20 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-900/20 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md mx-4">
        {/* карточка */}
        <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* шапка */}
          <div className="px-8 pt-10 pb-6 text-center border-b border-gray-800">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-violet-600/20 border border-violet-500/30 mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">Space Scarface</h1>
            <p className="text-gray-500 text-sm mt-1">Войдите в панель управления</p>
          </div>

          {/* форма */}
          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400 uppercase tracking-widest">
                Логин
              </label>
              <Input
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="admin"
                autoComplete="username"
                required
                className="bg-gray-800/60 border-gray-700 text-white placeholder:text-gray-600 h-11 rounded-xl focus:border-violet-500 focus:ring-violet-500/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400 uppercase tracking-widest">
                Пароль
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                className="bg-gray-800/60 border-gray-700 text-white placeholder:text-gray-600 h-11 rounded-xl focus:border-violet-500 focus:ring-violet-500/20"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-900/30 border border-red-800/50 rounded-xl px-4 py-3">
                <span className="text-red-400 text-sm">{error}</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-violet-900/30 disabled:opacity-60 mt-2"
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

        <p className="text-center text-gray-700 text-xs mt-6">Space Scarface Admin Panel</p>
      </div>
    </div>
  )
}
