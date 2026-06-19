"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const PLATFORMS = ["Telegram", "Instagram", "YouTube", "TikTok", "ВКонтакте"]
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

const card = { background: "#FFFFFF", border: "1px solid #E0D3C8", borderRadius: "12px", padding: "24px" }
const labelStyle = { color: "#7A4E57", fontSize: "13px", fontWeight: 500 }
const inputStyle = { background: "#FAF7F2", borderColor: "#E0D3C8", color: "#2D1A1E" }

export default function HomePage() {
  const [prompt, setPrompt] = useState("")
  const [duration, setDuration] = useState("30")
  const [topic, setTopic] = useState("")
  const [ratio, setRatio] = useState("16:9")
  const [style, setStyle] = useState("cinematic")
  const [voice, setVoice] = useState("ru-male")
  const [music, setMusic] = useState("none")
  const [subtitles, setSubtitles] = useState("off")
  const [cta, setCta] = useState("")
  const [generating, setGenerating] = useState(false)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [publishing, setPublishing] = useState(false)
  const [published, setPublished] = useState(false)

  function togglePlatform(p: string) {
    setSelectedPlatforms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    )
  }

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    setGenerating(true)
    setVideoUrl(null)
    setError("")
    setPublished(false)
    setSelectedPlatforms([])

    try {
      const res = await fetch(`${API_URL}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, duration, ratio, style, topic, cta }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.detail || "Ошибка генерации")
      }
      const data = await res.json()
      setVideoUrl(data.video_url)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Неизвестная ошибка")
    } finally {
      setGenerating(false)
    }
  }

  async function handlePublish() {
    if (!selectedPlatforms.length) return
    setPublishing(true)
    await new Promise((r) => setTimeout(r, 1500))
    setPublishing(false)
    setPublished(true)
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6" style={{ color: "#2D1A1E" }}>Генерация видео</h1>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Параметры */}
          <div style={card}>
            <h2 className="text-base font-semibold mb-4" style={{ color: "#6B1A2A" }}>Параметры</h2>
            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="space-y-1">
                <Label style={labelStyle}>Промпт</Label>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Опишите видео, которое нужно сгенерировать..."
                  className="text-sm min-h-24 border"
                  style={{ ...inputStyle, borderColor: "#E0D3C8" }}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Длина (сек)", value: duration, set: setDuration, options: [["15","15 сек"],["30","30 сек"],["60","60 сек"],["90","90 сек"]] },
                  { label: "Соотношение", value: ratio, set: setRatio, options: [["16:9","16:9 (YouTube)"],["9:16","9:16 (TikTok/Reels)"],["1:1","1:1 (Instagram)"]] },
                  { label: "Стиль", value: style, set: setStyle, options: [["cinematic","Кинематограф"],["animated","Анимация"],["slideshow","Слайдшоу"],["news","Новостной"]] },
                  { label: "Голос", value: voice, set: setVoice, options: [["ru-male","RU Мужской"],["ru-female","RU Женский"],["en-male","EN Мужской"],["en-female","EN Женский"],["none","Без голоса"]] },
                  { label: "Музыка", value: music, set: setMusic, options: [["none","Без музыки"],["ambient","Ambient"],["upbeat","Energetic"],["dramatic","Dramatic"]] },
                  { label: "Субтитры", value: subtitles, set: setSubtitles, options: [["off","Выкл"],["ru","Русские"],["en","Английские"]] },
                ].map(({ label, value, set, options }) => (
                  <div key={label} className="space-y-1">
                    <Label style={labelStyle}>{label}</Label>
                    <Select value={value} onValueChange={(v) => v && set(v)}>
                      <SelectTrigger className="border text-sm h-10" style={inputStyle}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent style={{ background: "#FAF7F2", borderColor: "#E0D3C8", color: "#2D1A1E" }}>
                        {options.map(([val, lab]) => (
                          <SelectItem key={val} value={val}>{lab}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>

              <div className="space-y-1">
                <Label style={labelStyle}>Тематика</Label>
                <Input value={topic} onChange={(e) => setTopic(e.target.value)}
                  placeholder="Мотивация, юмор, бизнес..."
                  className="border text-sm h-10" style={inputStyle} />
              </div>

              <div className="space-y-1">
                <Label style={labelStyle}>Призыв к действию (CTA)</Label>
                <Input value={cta} onChange={(e) => setCta(e.target.value)}
                  placeholder="Подпишись на канал!"
                  className="border text-sm h-10" style={inputStyle} />
              </div>

              {error && (
                <div className="text-sm px-3 py-2 rounded-lg" style={{ background: "#FDE8E8", color: "#8B1A1A", border: "1px solid #F5C6C6" }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={generating}
                className="w-full h-10 rounded-lg text-sm font-medium text-white transition-all disabled:opacity-60"
                style={{ background: "#6B1A2A" }}
              >
                {generating ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Генерируется... (1-3 мин)
                  </span>
                ) : "🎬 Сгенерировать"}
              </button>
            </form>
          </div>

          {/* Результат */}
          <div style={card}>
            <h2 className="text-base font-semibold mb-4" style={{ color: "#6B1A2A" }}>Результат</h2>
            <div className="space-y-4">
              {!videoUrl && !generating && (
                <div className="aspect-video rounded-lg flex items-center justify-center text-sm"
                  style={{ background: "#F5EEE8", color: "#A07080", border: "1px dashed #D4B8BE" }}>
                  Здесь появится видео
                </div>
              )}
              {generating && (
                <div className="aspect-video rounded-lg flex flex-col items-center justify-center gap-3"
                  style={{ background: "#F5EEE8" }}>
                  <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
                    style={{ borderColor: "#E0D3C8", borderTopColor: "#6B1A2A" }} />
                  <span className="text-sm" style={{ color: "#7A4E57" }}>Генерация видео...</span>
                  <span className="text-xs" style={{ color: "#A07080" }}>Обычно занимает 1-3 минуты</span>
                </div>
              )}
              {videoUrl && (
                <>
                  <video
                    src={videoUrl}
                    controls
                    className="w-full rounded-lg"
                    style={{ border: "1px solid #E0D3C8" }}
                  />

                  <div className="space-y-2">
                    <Label style={labelStyle}>Опубликовать в:</Label>
                    <div className="flex flex-wrap gap-2">
                      {PLATFORMS.map((p) => (
                        <button key={p} onClick={() => togglePlatform(p)}
                          className="px-3 py-1 rounded-full text-sm border transition-all"
                          style={selectedPlatforms.includes(p)
                            ? { background: "#6B1A2A", borderColor: "#6B1A2A", color: "#FAF7F2" }
                            : { background: "transparent", borderColor: "#D4B8BE", color: "#7A4E57" }
                          }
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  {published && (
                    <div className="flex flex-wrap gap-2">
                      {selectedPlatforms.map((p) => (
                        <span key={p} className="px-2 py-1 rounded-full text-xs font-medium"
                          style={{ background: "#D4EED4", color: "#2A6B2A" }}>
                          ✓ {p}
                        </span>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={handlePublish}
                    disabled={!selectedPlatforms.length || publishing || published}
                    className="w-full h-10 rounded-lg text-sm font-medium text-white transition-all disabled:opacity-50"
                    style={{ background: published ? "#2A6B2A" : "#6B1A2A" }}
                  >
                    {publishing ? "⏳ Публикуется..." : published ? "✓ Опубликовано" : "📡 Опубликовать"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
