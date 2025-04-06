'use client'

import { Progress } from "@/components/ui/progress"

type RoadmapItem = {
  category: string;
  total: number;
  done: number;
}

export default function RoadmapProgress({ data }: { data: RoadmapItem[] }) {
  if (!data || data.length === 0) {
    return <div>暂无Roadmap数据</div>;
  }

  return (
    <div className="space-y-6">
      {data.map((item, index) => {
        const progress = Math.round((item.done / item.total) * 100)
        return (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-semibold">{item.category}</span>
              <span>{item.done}/{item.total} ({progress}%)</span>
            </div>
            <Progress value={progress} />
          </div>
        )
      })}
    </div>
  )
}
