'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

type Question = {
  id: string;
  content: string;
  keywords: string[];
  answer: string;
  difficulty: number;
}

export default function QuestionCard({ question }: { question: Question }) {
  const [showAnswer, setShowAnswer] = useState(false)

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="transition-all"
    >
      <Card className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{question.content}</h3>
          <div className="flex gap-1 text-yellow-500">{Array(question.difficulty).fill(0).map((_, i) => <span key={i}>⭐</span>)}</div>
        </div>

        <div className="flex flex-wrap gap-2">
          {question.keywords.map((kw, idx) => (
            <Badge key={idx} variant="secondary">{kw}</Badge>
          ))}
        </div>

        {!showAnswer ? (
          <Button variant="link" size="sm" onClick={() => setShowAnswer(true)}>点击揭晓答案</Button>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-700 text-sm"
          >
            {question.answer}
          </motion.div>
        )}
      </Card>
    </motion.div>
  )
}
