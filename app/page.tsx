"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

export default function FeedbackPage() {
  const [isClicked, setIsClicked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: "想了",
          timestamp: new Date().toISOString(),
        }),
      })

      console.log("[v0] 反馈已发送:", response.status)

      setIsClicked(true)
      setTimeout(() => setIsClicked(false), 3000)
    } catch (error) {
      console.error("[v0] 提交反馈失败:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-blue-50 p-4">
      <div className="text-center max-w-md">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8 text-pretty">想我了吗</h1>

        <div className="mb-12">
          <Button
            onClick={handleClick}
            disabled={isLoading}
            className={`text-lg px-12 py-6 rounded-full font-semibold transition-all duration-300 transform ${
              isClicked ? "bg-rose-500 scale-95" : "bg-rose-400 hover:bg-rose-500 hover:scale-105 active:scale-95"
            }`}
          >
            {isLoading ? "发送中..." : "想了"}
          </Button>
        </div>

        {isClicked && (
          <div className="flex items-center justify-center gap-2 text-rose-500 animate-bounce">
            <Heart className="w-5 h-5 fill-current" />
            <p className="text-lg font-medium">我收到你的想念了</p>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-gray-200">
          <a href="/admin" className="text-gray-600 hover:text-gray-900 underline text-sm">
            查看所有反馈
          </a>
        </div>
      </div>
    </main>
  )
}
