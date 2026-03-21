"use client"
import React from 'react'
import { MessageSquare, Send, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Comment {
  id: string
  content: string
  author?: {
    name: string
  }
  guestName?: string
  adminReply?: string
  createdAt: string
}

interface CommentSectionProps {
  comments: Comment[]
  newComment: string
  setNewComment: (val: string) => void
  authorName: string
  setAuthorName: (val: string) => void
  onSubmit: (e: React.FormEvent) => void
  isSubmitting: boolean
}

export const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  newComment,
  setNewComment,
  authorName,
  setAuthorName,
  onSubmit,
  isSubmitting
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="pt-16 border-t border-white/[0.05]"
    >
      <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:justify-between mb-12 gap-6">
        <div className="flex flex-col gap-1 items-center sm:items-start">
          <div className="flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-white/5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">
            <Sparkles className="w-3 h-3 text-orange-500" />
            Community Discourse
          </div>
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60">
            Discussion
            <span className="text-white/10 ml-3 font-medium select-none">{comments.length}</span>
          </h2>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center gap-1">
            <span className="text-white font-bold text-xl">{comments.length}</span>
            <span className="text-[9px] font-black uppercase tracking-widest text-white/20">Syntheses</span>
          </div>
          <div className="w-px h-8 bg-white/5" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-white/60 font-bold text-xl">24h</span>
            <span className="text-[9px] font-black uppercase tracking-widest text-white/20">Activity</span>
          </div>
        </div>
      </div>

      {/* Strictly Redesigned Double-Row Bento Input - Medium Compact */}
      <div className="mb-16 relative group/input">
        <div className="absolute -inset-6 bg-orange-500/[0.02] blur-[80px] rounded-full opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-1000 pointer-events-none" />
        
        <div className="relative p-px rounded-[2rem] bg-gradient-to-b from-white/[0.08] to-transparent focus-within:from-orange-500/20 transition-all duration-700">
          <div className="p-6 sm:p-8 rounded-[1.9rem] bg-[#050505]/85 backdrop-blur-2xl border border-white/[0.03] group-focus-within/input:border-white/[0.08] transition-all duration-500 relative overflow-hidden">
             {/* Subtle Technical Grid Overlay */}
             <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
                  style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

             <form onSubmit={onSubmit} className="relative z-10 space-y-6">
                {/* Row 1: Identity */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 px-1">
                    <div className="w-1 h-1 rounded-full bg-orange-500" />
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">ID: Identity</label>
                  </div>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Enter handle..."
                    className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-5 py-3 text-sm text-white placeholder:text-white/10 focus:bg-white/[0.04] focus:border-orange-500/30 transition-all outline-none font-medium selection:bg-orange-500/30"
                    required
                  />
                </div>

                {/* Row 2: Perspective */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 px-1">
                    <div className="w-1 h-1 rounded-full bg-white/10" />
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">Entry: Perspective</label>
                  </div>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Post your synthesis..."
                    className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-5 py-3 text-sm text-white placeholder:text-white/10 focus:bg-white/[0.04] focus:border-orange-500/30 transition-all outline-none min-h-[100px] resize-none leading-relaxed font-medium selection:bg-orange-500/30"
                    required
                  />
                </div>
                
                {/* Subsystem: Execution */}
                <div className="flex items-center justify-between pt-6 border-t border-white/[0.05] gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-[0.15em] text-white/30 truncate max-w-[120px] sm:max-w-none">
                      Awaiting Transmission
                    </span>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting || !newComment.trim() || !authorName.trim()}
                    className="group relative h-11 px-8 bg-white/[0.03] hover:bg-orange-500 text-white rounded-xl font-black text-[9px] uppercase tracking-[0.2em] transition-all duration-500 disabled:opacity-50 overflow-hidden border border-white/5 hover:border-orange-400/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.15)]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <div className="relative flex items-center gap-2.5">
                      {isSubmitting ? (
                        <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Execute Post</span>
                          <Send className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </>
                      )}
                    </div>
                  </button>
                </div>
             </form>
          </div>
        </div>
      </div>

      {/* Redesigned Comments Display */}
      <div className="relative pl-4 sm:pl-8 space-y-8">
        <AnimatePresence initial={false}>
          {comments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.05,
                duration: 0.4,
                ease: "easeOut"
              }}
              className="relative group mb-4 last:mb-0"
            >
              <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300 relative overflow-hidden group/card shadow-sm">
                <div className="flex items-start gap-4 relative z-10">
                  {/* Avatar Subsystem */}
                  <div className="shrink-0">
                    <div className="w-10 h-10 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-xs font-bold text-white/40 group-hover/card:border-white/20 transition-all duration-300 shadow-inner">
                      {(comment.author?.name || comment.guestName || "A").charAt(0).toUpperCase()}
                    </div>
                  </div>

                  {/* Information Grid */}
                  <div className="flex-1 min-w-0 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm font-semibold tracking-tight text-white/90">
                          {comment.author?.name || comment.guestName || "Anonymous User"}
                        </span>
                        
                        {/* Admin-style Status Tag */}
                        <div className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border transition-all duration-300 ${
                          comment.author 
                            ? 'bg-white text-black border-transparent shadow-[0_0_10px_rgba(255,255,255,0.1)]' 
                            : 'bg-transparent text-white/40 border-white/10 group-hover/card:text-white/60 group-hover/card:border-white/20'
                        }`}>
                          {comment.author ? 'Contributor' : 'Visitor'}
                        </div>
                      </div>

                      <span className="text-[10px] font-medium text-neutral-500 uppercase tracking-widest tabular-nums">
                        {new Date(comment.createdAt).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>

                    {/* Synthesis Output */}
                    <div className="relative space-y-4">
                      <div className="relative">
                        <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-orange-500/0 group-hover/card:bg-orange-500/40 transition-all duration-500 pointer-events-none" />
                        <p className="text-sm text-neutral-400 leading-relaxed font-medium selection:bg-white/10">
                          {comment.content}
                        </p>
                      </div>

                      {/* Admin Response Module */}
                      {comment.adminReply && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 rounded-xl bg-orange-500/[0.03] border border-orange-500/10 space-y-2 relative group/reply overflow-hidden"
                        >
                          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
                          <div className="flex items-center gap-2 mb-1">
                            <Sparkles className="w-3 h-3 text-orange-500/60" />
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-orange-500/80">Admin Response Sequence</span>
                          </div>
                          <p className="text-sm text-white/80 font-medium leading-relaxed italic">
                            {comment.adminReply}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Decorative Tech Corner */}
                <div className="absolute top-0 right-0 p-1 opacity-[0.03] group-hover/card:opacity-[0.1] transition-opacity pointer-events-none">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {comments.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 px-4 rounded-[40px] border border-dashed border-white/5 bg-white/[0.01] relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-orange-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white/20" />
              </div>
              <div className="space-y-1">
                <div className="text-white/30 font-black uppercase tracking-[0.2em] text-[10px]">Neural Void</div>
                <div className="text-white/10 font-medium italic text-sm">Waiting for the first synthesis.</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}
