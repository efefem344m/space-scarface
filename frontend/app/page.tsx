"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

const PLATFORMS = ["Telegram", "Instagram", "YouTube", "TikTok", "ВКонтакте"]

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
  const [videoReady, setVideoReady] = useState(false)
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
    setVideoReady(false)
    setPublished(false)
    await new Promise((r) => setTimeout(r, 2500))
    setGenerating(false)
    setVideoReady(true)
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
        <h1 className="text-2xl font-bold mb-6">Генерация видео</h1>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-base text-gray-200">Параметры</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleGenerate} className="space-y-4">
                <div className="space-y-1">
                  <Label className="text-gray-300">Промпт</Label>
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Опишите видео, которое нужно сгенерировать..."
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 min-h-24"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-gray-300">Длина (сек)</Label>
                    <Select value={duration} onValueChange={(v) => v && setDuration(v)}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectItem value="15">15 сек</SelectItem>
                        <SelectItem value="30">30 сек</SelectItem>
                        <SelectItem value="60">60 сек</SelectItem>
                        <SelectItem value="90">90 сек</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-gray-300">Соотношение</Label>
                    <Select value={ratio} onValueChange={(v) => v && setRatio(v)}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectItem value="16:9">16:9 (YouTube)</SelectItem>
                        <SelectItem value="9:16">9:16 (TikTok/Reels)</SelectItem>
                        <SelectItem value="1:1">1:1 (Instagram)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-gray-300">Стиль</Label>
                    <Select value={style} onValueChange={(v) => v && setStyle(v)}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectItem value="cinematic">Кинематограф</SelectItem>
                        <SelectItem value="animated">Анимация</SelectItem>
                        <SelectItem value="slideshow">Слайдшоу</SelectItem>
                        <SelectItem value="news">Новостной</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-gray-300">Голос</Label>
                    <Select value={voice} onValueChange={(v) => v && setVoice(v)}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectItem value="ru-male">RU Мужской</SelectItem>
                        <SelectItem value="ru-female">RU Женский</SelectItem>
                        <SelectItem value="en-male">EN Мужской</SelectItem>
                        <SelectItem value="en-female">EN Женский</SelectItem>
                        <SelectItem value="none">Без голоса</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-gray-300">Музыка</Label>
                    <Select value={music} onValueChange={(v) => v && setMusic(v)}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectItem value="none">Без музыки</SelectItem>
                        <SelectItem value="ambient">Ambient</SelectItem>
                        <SelectItem value="upbeat">Energetic</SelectItem>
                        <SelectItem value="dramatic">Dramatic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-gray-300">Субтитры</Label>
                    <Select value={subtitles} onValueChange={(v) => v && setSubtitles(v)}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectItem value="off">Выкл</SelectItem>
                        <SelectItem value="ru">Русские</SelectItem>
                        <SelectItem value="en">Английские</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-gray-300">Тематика</Label>
                  <Input
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Мотивация, юмор, бизнес..."
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-gray-300">Призыв к действию (CTA)</Label>
                  <Input
                    value={cta}
                    onChange={(e) => setCta(e.target.value)}
                    placeholder="Подпишись на канал!"
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white"
                  disabled={generating}
                >
                  {generating ? "⏳ Генерируется..." : "🎬 Сгенерировать"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-base text-gray-200">Результат</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!videoReady && !generating && (
                <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center text-gray-500">
                  Здесь появится видео
                </div>
              )}
              {generating && (
                <div className="aspect-video bg-gray-800 rounded-lg flex flex-col items-center justify-center gap-3 text-gray-400">
                  <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                  <span>Генерация видео...</span>
                </div>
              )}
              {videoReady && (
                <>
                  <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 border border-violet-700">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🎬</div>
                      <div className="text-sm">Видео готово</div>
                      <div className="text-xs text-gray-500 mt-1">{duration}с · {ratio} · {style}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Опубликовать в:</Label>
                    <div className="flex flex-wrap gap-2">
                      {PLATFORMS.map((p) => (
                        <button
                          key={p}
                          onClick={() => togglePlatform(p)}
                          className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                            selectedPlatforms.includes(p)
                              ? "bg-violet-600 border-violet-600 text-white"
                              : "border-gray-700 text-gray-400 hover:border-violet-500"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  {published && (
                    <div className="flex flex-wrap gap-2">
                      {selectedPlatforms.map((p) => (
                        <Badge key={p} className="bg-green-800 text-green-200">
                          ✓ {p}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <Button
                    onClick={handlePublish}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    disabled={!selectedPlatforms.length || publishing || published}
                  >
                    {publishing ? "⏳ Публикуется..." : published ? "✓ Опубликовано" : "📡 Опубликовать"}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
