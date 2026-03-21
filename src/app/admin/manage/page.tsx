"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Edit3, Trash2, Calendar, FileText } from 'lucide-react'
import toast from 'react-hot-toast'
import AdminNav from '@/components/AdminNav'
import LoadingSpinner from '@/components/LoadingSpinner'

interface Post {
  id: string
  title: string
  slug: string
  published: boolean
  createdAt: string
}

export default function ManagePosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/posts')
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        console.error('Error fetching posts:', error)
        toast.error('Failed to load posts')
      } finally {
        setIsLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete post')

      setPosts(posts.filter(post => post.id !== id))
      toast.success('Post deleted successfully')
    } catch (error) {
      console.error('Error deleting post:', error)
      toast.error('Failed to delete post')
    }
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-white/30 selection:text-white relative">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      <AdminNav />
      {/* pt-24 ensures the content sits nicely below the top-4 floating nav pill */}
      <div className="p-4 sm:p-6 pt-24 sm:pt-28 pb-20 sm:pb-24">
        <div className="max-w-3xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pb-2">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold tracking-tight text-white/90">Manage Posts</h1>
              <p className="text-sm text-white/50">Edit, delete, or review your published posts.</p>
            </div>
            
            <Link 
              href="/admin" 
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Create Post</span>
            </Link>
          </div>

          <div className="space-y-3">
            {posts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] border-dashed">
                <FileText className="w-8 h-8 text-white/20 mb-3" />
                <h3 className="text-sm font-medium text-white/80 mb-1">No posts found</h3>
                <p className="text-xs text-white/40 text-center max-w-sm mb-4">
                  You haven't published any posts yet.
                </p>
                <Link 
                  href="/admin" 
                  className="px-4 py-2 rounded-lg bg-white/10 text-white text-xs font-medium hover:bg-white/20 transition-colors"
                >
                  Create first post
                </Link>
              </div>
            ) : (
              posts.map(post => (
                <div 
                  key={post.id} 
                  className="group relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-all duration-300"
                >
                  <div className="flex-1 space-y-1">
                    <Link href={`/blog/${post.slug}`} target="_blank" className="inline-block outline-none rounded-sm focus:ring-2 focus:ring-white/20">
                      <h2 className="text-base font-semibold text-white/90 group-hover:text-white transition-colors line-clamp-1">
                        {post.title}
                      </h2>
                    </Link>
                    <div className="flex items-center gap-3 text-xs text-white/40">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.createdAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${post.published ? 'bg-green-500' : 'bg-yellow-500'}`} />
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Link 
                      href={`/admin/edit/${post.id}`}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 text-xs font-medium transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 text-xs font-medium transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  )
} 