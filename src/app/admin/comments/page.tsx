"use client"
import { useState, useEffect } from 'react'
import { MessageSquare, Calendar, User, ArrowRight, Send, Trash2, CheckCircle2, Edit3 } from 'lucide-react'
import toast from 'react-hot-toast'
import AdminNav from '@/components/AdminNav'
import LoadingSpinner from '@/components/LoadingSpinner'

interface Comment {
  id: string
  content: string
  guestName?: string
  adminReply?: string
  author?: {
    name: string
  }
  post: {
    title: string
    slug: string
  }
  createdAt: string
}

export default function AdminComments() {
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({})
  const [isReplying, setIsReplying] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await fetch('/api/admin/comments')
        const data = await response.json()
        setComments(data)
      } catch (error) {
        console.error('Error fetching comments:', error)
        toast.error('Failed to load comments')
      } finally {
        setIsLoading(false)
      }
    }
    fetchComments()
  }, [])

  const handleReply = async (commentId: string) => {
    const reply = replyText[commentId]
    if (!reply?.trim()) return

    setIsReplying(prev => ({ ...prev, [commentId]: true }))
    try {
      const response = await fetch(`/api/comments/${commentId}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reply })
      })

      if (!response.ok) throw new Error('Failed to send reply')

      const updated = await response.json()
      setComments(comments.map(c => c.id === commentId ? { ...c, adminReply: reply } : c))
      setReplyText(prev => ({ ...prev, [commentId]: '' }))
      toast.success('Reply sent successfully', { icon: <CheckCircle2 className="w-5 h-5 text-green-500" /> })
    } catch (error) {
      console.error('Error replying:', error)
      toast.error('Failed to send reply')
    } finally {
      setIsReplying(prev => ({ ...prev, [commentId]: false }))
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return
    try {
      const response = await fetch(`/api/admin/comments/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Failed to delete comment')
      setComments(comments.filter(c => c.id !== id))
      toast.success('Comment deleted')
    } catch (error) {
      toast.error('Failed to delete comment')
    }
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-white/30 selection:text-white relative">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      <AdminNav />
      
      <div className="p-4 sm:p-6 pt-24 sm:pt-28 pb-20 sm:pb-24">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold tracking-tight text-white/90 font-black uppercase tracking-widest">Neural Archive: Comments</h1>
            <p className="text-sm text-white/50">Direct interface for community interaction and synthesis oversight.</p>
          </div>

          <div className="grid gap-6">
            {comments.length === 0 ? (
              <div className="py-20 text-center rounded-2xl border border-dashed border-white/5 bg-white/[0.01]">
                <MessageSquare className="w-8 h-8 text-white/10 mx-auto mb-3" />
                <p className="text-white/30 text-sm">The silence is absolute. No data to process.</p>
              </div>
            ) : (
              comments.map(comment => (
                <div key={comment.id} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.03] transition-all duration-300 space-y-6 group">
                  
                  {/* Metadata Row */}
                  <div className="flex flex-col sm:flex-row justify-between gap-4 border-b border-white/[0.05] pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center text-xs font-bold text-white/30">
                        {(comment.author?.name || comment.guestName || "A").charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white/90 uppercase tracking-wider">
                          {comment.author?.name || comment.guestName || "Anonymous User"}
                        </h3>
                        <div className="flex items-center gap-2 text-[10px] text-white/40 font-medium">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(comment.createdAt).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}</span>
                          <span className="w-1 h-1 rounded-full bg-white/10" />
                          <span className="text-orange-500/60 font-black uppercase tracking-tighter line-clamp-1">On: {comment.post.title}</span>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => handleDelete(comment.id)} className="self-end sm:self-center p-2 rounded-lg bg-red-500/5 text-red-500/40 hover:bg-red-500/10 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Comment Content */}
                  <div className="relative pl-4 border-l-2 border-white/5">
                    <p className="text-sm text-white/70 leading-relaxed italic">"{comment.content}"</p>
                  </div>

                  {/* Reply Subsystem */}
                  <div className="space-y-4 pt-2">
                    {comment.adminReply && !replyText[comment.id] ? (
                      <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/20 space-y-2 relative group/response">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-orange-500/80">
                            <CheckCircle2 className="w-3 h-3" /> Admin Transmission
                          </div>
                          <button 
                            onClick={() => setReplyText({ ...replyText, [comment.id]: comment.adminReply || '' })}
                            className="p-1 px-2 rounded-md bg-white/5 text-[8px] font-black uppercase tracking-widest text-white/40 hover:bg-white/10 hover:text-white transition-all opacity-0 group-hover/response:opacity-100 flex items-center gap-1.5"
                          >
                            <Edit3 className="w-2.5 h-2.5" /> Modify Sequence
                          </button>
                        </div>
                        <p className="text-sm text-white/80 font-medium leading-relaxed">{comment.adminReply}</p>
                      </div>
                    ) : (
                      <div className="flex gap-3">
                        <input 
                          type="text" 
                          value={replyText[comment.id] || ''}
                          onChange={(e) => setReplyText({ ...replyText, [comment.id]: e.target.value })}
                          placeholder="Compose reply..."
                          className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder:text-white/20 outline-none focus:border-white/30 transition-all"
                        />
                        <button 
                          onClick={() => handleReply(comment.id)}
                          disabled={isReplying[comment.id] || !replyText[comment.id]?.trim()}
                          className="px-6 py-2 bg-white text-black rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/90 disabled:opacity-50 transition-all flex items-center gap-2"
                        >
                          {isReplying[comment.id] ? <div className="w-3 h-3 border-2 border-black/20 border-t-black rounded-full animate-spin" /> : <Send className="w-3 h-3" />}
                          Execute
                        </button>
                      </div>
                    )}
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
