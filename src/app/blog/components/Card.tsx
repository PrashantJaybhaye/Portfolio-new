"use client"
import { useEffect, useState } from 'react'
import { FocusCards } from "@/components/ui/focus-cards"

interface Post {
  id: string
  title: string
  content: string
  slug: string
  coverImage: string | null
  author: {
    name: string
  }
  categories: {
    category: {
      name: string
    }
  }[]
  createdAt: string
}

export function Card() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/posts')
        const data = await response.json()
        if (Array.isArray(data)) {
          setPosts(data)
        } else {
          console.warn("API did not return an array:", data)
          setPosts([])
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPosts()
  }, [])

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 w-full">
        {[1, 2].map((i) => (
          <div key={i} className="flex rounded-2xl border border-white/[0.06] bg-white/[0.02] animate-pulse overflow-hidden" style={{ height: '200px' }}>
            <div className="w-[42%] bg-white/[0.04] flex-shrink-0" />
            <div className="flex-1 p-8 space-y-4">
              <div className="h-2 w-20 bg-white/10 rounded-full" />
              <div className="h-6 w-2/3 bg-white/10 rounded-lg" />
              <div className="h-3 w-full bg-white/[0.06] rounded-full" />
              <div className="h-3 w-4/5 bg-white/[0.06] rounded-full" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  const cards = posts.map(post => {
    // Strip markdown symbols and generate a real excerpt from post content
    const rawText = (post.content || '')
      .replace(/#{1,6}\s*/g, '')       // headings
      .replace(/[\*\_\`\[\]\(\)]/g, '') // bold, italic, code, links
      .replace(/\n+/g, ' ')             // newlines
      .trim()
    const excerpt = rawText.length > 160 ? rawText.slice(0, 157) + '…' : rawText

    return {
      title: post.title,
      src: post.coverImage || 'https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop',
      slug: post.slug,
      excerpt,
    }
  })

  return (
    <div className="w-full">
      <FocusCards cards={cards} />
    </div>
  )
}
