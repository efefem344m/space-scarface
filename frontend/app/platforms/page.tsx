"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

type Platform = {
  id: string
  name: string
  icon: string
  fields: { key: string; label: string; placeholder: string; type?: string }[]
}

const PLATFORMS: Platform[] = [
  {
    id: "telegram",
    name: "Telegram",
    icon: "✈️",
    fields: [
      { key: "bot_token", label: "Bot Token", placeholder: "123456:ABC-DEF..." },
      { key: "chat_id", label: "Chat ID", placeholder: "-1001234567890" },
    ],
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: "📸",
    fields: [
      { key: "access_token", label: "Access Token", placeholder: "IGQVJ..." },
      { key: "user_id", label: "User ID", placeholder: "17841400..." },
    ],
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: "▶️",
    fields: [
      { key: "client_id", label: "Client ID", placeholder: "xxx.apps.googleusercontent.com" },
      { key: "client_secret", label: "Client Secret", placeholder: "GOCSPX-..." },
      { key: "refresh_token", label: "Refresh Token", placeholder: "1//..." },
    ],
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: "🎵",
    fields: [
      { key: "access_token", label: "Access Token", placeholder: "act.xxx..." },
      { key: "open_id", label: "Open ID", placeholder: "xxx" },
    ],
  },
  {
    id: "vk",
    name: "ВКонтакте",
    icon: "💙",
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
        <h1 className="text-2xl font-bold mb-2">Платформы</h1>
        <p className="text-gray-400 text-sm mb-6">Настройте credentials для публикации видео</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {PLATFORMS.map((platform) => (
            <Card key={platform.id} className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base text-gray-200 flex items-center gap-2">
                    <span>{platform.icon}</span>
                    {platform.name}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {active[platform.id] && (
                      <Badge className="bg-green-800 text-green-200 text-xs">Активна</Badge>
                    )}
                    <button
                      onClick={() => setActive((prev) => ({ ...prev, [platform.id]: !prev[platform.id] }))}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                        active[platform.id] ? "bg-violet-600" : "bg-gray-700"
                      }`}
                    >
                      <span
                        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                          active[platform.id] ? "translate-x-5" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {platform.fields.map((field) => (
                  <div key={field.key} className="space-y-1">
                    <Label className="text-gray-400 text-xs">{field.label}</Label>
                    <Input
                      type={field.type ?? "text"}
                      value={creds[platform.id]?.[field.key] ?? ""}
                      onChange={(e) => setField(platform.id, field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-600 text-sm"
                    />
                  </div>
                ))}
                <Button
                  onClick={() => handleSave(platform.id)}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white text-sm mt-2"
                  size="sm"
                >
                  {saved[platform.id] ? "✓ Сохранено" : "Сохранить"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
