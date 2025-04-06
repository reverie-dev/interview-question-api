'use client'

import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <header className="w-full p-4 bg-white border-b sticky top-0 z-50 flex justify-between items-center">
      <div className="text-xl font-bold">📝 面试题复习</div>
      <div className="flex space-x-4">
        <Button variant="ghost" size="sm">面试题库</Button>
        <Button variant="ghost" size="sm">分类复习</Button>
        <Button variant="ghost" size="sm">Roadmap</Button>
        <Button variant="ghost" size="sm">统计分析</Button>
      </div>
    </header>
  )
}
