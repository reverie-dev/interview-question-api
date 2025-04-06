'use client'

import Navbar from '@/components/Navbar'
import RoadmapProgress from '@/components/RoadmapProgress'
import QuestionCard from '@/components/QuestionCard'
import { Input } from '@/components/ui/input'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function Home() {
  const { data: roadmapData } = useQuery({
    queryKey: ['roadmap'],
    queryFn: async () => [
      { category: 'Redis', total: 15, done: 8 },
      { category: 'JVM', total: 20, done: 12 },
      { category: 'MySQL', total: 30, done: 18 }
    ]
  })

  const { data: questionsData, isLoading } = useQuery({
    queryKey: ['questions'],
    queryFn: async () => [
      {
        id: '1',
        content: 'Redis 主从复制的原理是什么？',
        keywords: ['复制偏移量', '积压缓冲区', 'PSYNC'],
        answer: '主节点将写操作同步到从节点，采用PSYNC协议。',
        difficulty: 2
      },
      {
        id: '2',
        content: 'Redis 哨兵模式如何实现高可用？',
        keywords: ['选举机制', '故障转移', 'Quorum'],
        answer: '通过监控、自动故障转移、通知机制实现高可用。',
        difficulty: 3
      }
    ]
  })

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <main className="container mx-auto p-6 space-y-10">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">欢迎回来 🎯</h1>
          <Input placeholder="🔍 搜索面试题..." />
        </div>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">🛣️ Roadmap</h2>
          {roadmapData && <RoadmapProgress data={roadmapData} />}
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">📌 当前分类：Redis</h2>
          {isLoading ? (
            <div>加载中...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {questionsData.map((q: any) => <QuestionCard key={q.id} question={q} />)}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
