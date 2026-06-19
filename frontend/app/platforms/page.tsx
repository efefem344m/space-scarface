"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Platform = {
  id: string
  name: string
  icon: string
  fields: { key: string; label: string; placeholder: string; type?: string }[]
}

const PLATFORMS: Platform[] = [
  {
    id: "telegram", name: "Telegram", icon: "✈️",
    fields: [
      { key: "bot_token", label: "Bot Token", placeholder: "123456:ABC-DEF..." },
      { key: "chat_id", label: "Chat ID", placeholder: "-1001234567890" },
    ],
  },
  {
    id: "instagram", name: "Instagram", icon: "📸",
    fields: [
      { key: "access_token", label: "Access Token", placeholder: "IGQVJ..." },
      { key: "user_id", label: "User ID", placeholder: "17841400..." },
    ],
  },
  {
    id: "youtube", name: "YouTube", icon: "▶️",
    fields: [
      { key: "client_id", label: "Client ID", placeholder: "xxx.apps.googleusercontent.com" },
      { key: "client_secret", label: "Client Secret", placeholder: "GOCSPX-..." },
      { key: "refresh_token", label: "Refresh Token", placeholder: "1//..." },
    ],
  },
  {
    id: "tiktok", name: "TikTok", icon: "🎵",
    fields: [
      { key: "access_token", label: "Access Token", placeholder: "act.xxx..." },
      { key: "open_id", label: "Open ID", placeholder: "xxx" },
    ],
  },
  {
    id: "vk", name: "ВКонтакте", icon: "💙",
    fields: [
      { key: "access_token", label: "Access Token", placeholder: "vk1.a.xxx..." },
      { key: "group_id", label: "Group ID", placeholder: "123456789" },
    ],
  },
]

type Creds = Record<string, Record<string, string>>
type Active = Record<string, boolean>

export default function PlatformsPage() {
  const [creds, setCreds] = useState<Creds>({})
  const [active, setActive] = useState<Active>({})
  const [saved, setSaved] = useState<Record<string, boolean>>({})

  function setField(platformId: string, key: string, value: string) {
    setCreds((prev) => ({
      ...prev,
      [platformId]: { ...(prev[platformId] ?? {}), [key]: value },
    }))
  }

  function handleSave(platformId: string) {
    setSaved((prev) => ({ ...prev, [platformId]: true }))
    setTimeout(() => setSaved((prev) => ({ ...prev, [platformId]: false })), 2000)
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-1" style={{ color: "#2D1A1E" }}>Платформы</h1>
        <p className="text-sm mb-6" style={{ color: "#A07080" }}>Настройте credentials для публикации видео</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {PLATFORMS.map((platform) => (
            <div key={platform.id} style={{ background: "#FFFFFF", border: "1px solid #E0D3C8", borderRadius: "12px", padding: "20px" }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 font-semibold" style={{ color: "#2D1A1E" }}>
                  <span>{platform.icon}</span>
                  {platform.name}
                </div>
                <div className="flex items-center gap-2">
                  {active[platform.id] && (
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: "#D4EED4", color: "#2A6B2A" }}>
                      Активна
                    </span>
                  )}
                  <button
                    onClick={() => setActive((prev) => ({ ...prev, [platform.id]: !prev[platform.id] }))}
                    className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors"
                    style={{ background: active[platform.id] ? "#6B1A2A" : "#D4C4BC" }}
                  >
                    <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      active[platform.id] ? "translate-x-5" : "translate-x-1"
                    }`} />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {platform.fields.map((field) => (
                  <div key={field.key} className="space-y-1">
                    <Label className="text-xs" style={{ color: "#7A4E57", fontWeight: 500 }}>{field.label}</Label>
                    <Input
                      type={field.type ?? "text"}
                      value={creds[platform.id]?.[field.key] ?? ""}
                      onChange={(e) => setField(platform.id, field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="text-sm h-9 border"
                      style={{ background: "#FAF7F2", borderColor: "#E0D3C8", color: "#2D1A1E" }}
                    />
                  </div>
                ))}
                <button
                  onClick={() => handleSave(platform.id)}
                  className="w-full h-9 rounded-lg text-sm font-medium transition-all mt-1"
                  style={saved[platform.id]
                    ? { background: "#D4EED4", color: "#2A6B2A" }
                    : { background: "#F0E8DF", color: "#6B1A2A", border: "1px solid #D4B8BE" }
                  }
                >
                  {saved[platform.id] ? "✓ Сохранено" : "Сохранить"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
