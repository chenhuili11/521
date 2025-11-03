"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Heart } from "lucide-react"
import Link from "next/link"

interface Feedback {
  id: string
  message: string
  timestamp: string
  count: number
}

export default function AdminPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchFeedbacks()
    const interval = setInterval(fetchFeedbacks, 3000)
    return () => clearInterval(interval)
  }, [])

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch("/api/feedback")
      const data = await res.json()
      setFeedbacks(data)
    } catch (error) {
      console.error("获取反馈失败:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* 返回按钮 */}
        <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-4 h-4" />
          返回
        </Link>

        {/* 标题 */}
        <h1 className="text-4xl font-bold text-gray-800 mb-8">反馈统计</h1>

        {/* 总数卡片 */}
        <Card className="mb-6 bg-white border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Heart className="w-6 h-6 fill-rose-400 text-rose-400" />
              总反馈数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-bold text-rose-500">{feedbacks.reduce((sum, f) => sum + f.count, 0)}</p>
          </CardContent>
        </Card>

        {/* 反馈列表 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">最近的反馈</h2>
          {isLoading ? (
            <p className="text-gray-600">加载中...</p>
          ) : feedbacks.length === 0 ? (
            <p className="text-gray-600">还没有反馈，等待第一个想念吧</p>
          ) : (
            feedbacks.map((feedback) => (
              <Card key={feedback.id} className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">{feedback.message}</p>
                      <p className="text-sm text-gray-500">{new Date(feedback.timestamp).toLocaleString("zh-CN")}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-rose-500">{feedback.count}</p>
                      <p className="text-xs text-gray-500">次</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </main>
  )
}
