import { type NextRequest, NextResponse } from "next/server"

// 临时存储（实际应用中应使用数据库）
const feedbackStore: Map<string, { count: number; timestamp: string }> = new Map()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, timestamp } = body

    const key = new Date(timestamp).toLocaleDateString("zh-CN")
    const existing = feedbackStore.get(key)

    if (existing) {
      existing.count += 1
    } else {
      feedbackStore.set(key, { count: 1, timestamp })
    }

    // 控制台输出反馈（替代邮件通知）
    console.log(`[新反馈] ${message} - ${timestamp}`)

    return NextResponse.json({
      success: true,
      message: "反馈已提交",
    })
  } catch (error) {
    console.error("处理反馈失败:", error)
    return NextResponse.json({ error: "提交失败" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const feedbacks = Array.from(feedbackStore.entries()).map(([key, value]) => ({
      id: key,
      message: "想了",
      timestamp: value.timestamp,
      count: value.count,
    }))

    return NextResponse.json(feedbacks.reverse())
  } catch (error) {
    console.error("获取反馈失败:", error)
    return NextResponse.json({ error: "获取失败" }, { status: 500 })
  }
}
