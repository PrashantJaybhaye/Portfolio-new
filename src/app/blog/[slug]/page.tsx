"use client"
import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, User, Tag, Clock } from 'lucide-react'
import { motion, Variants } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import LoadingSpinner from '@/components/LoadingSpinner'
import { CommentSection } from '@/components/CommentSection'

interface Comment {
  id: string
  content: string
  author: {
    name: string
  }
  createdAt: string
}

interface Post {
  id: string
  title: string
  content: string
  imageUrl?: string
  author: {
    name: string
  }
  categories: {
    category: {
      name: string
    }
  }[]
  comments?: Comment[]
  createdAt: string
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
}

export default function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)

  const [post, setPost] = useState<Post | null>(null)
  const [newComment, setNewComment] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/posts/slug/${resolvedParams.slug}`)
        if (response.status === 404) {
          // Post not found — expected for invalid slugs, no need to log
          setPost(null)
          return
        }
        if (!response.ok) throw new Error('Failed to fetch post')
        const data = await response.json()
        setPost({
          ...data,
          categories: data.categories || [],
          comments: data.comments || []
        })
      } catch (error) {
        console.error('Error fetching post:', error)
        setError('Failed to load post')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [resolvedParams.slug])

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!post || !newComment.trim() || !authorName.trim()) return

    setIsSubmittingComment(true)
    try {
      const response = await fetch(`/api/posts/${post.id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newComment,
          name: authorName
        }),
      })

      if (!response.ok) throw new Error('Failed to post comment')

      const commentResult = await response.json()
      setPost((prev) => {
        if (!prev) return null
        return {
          ...prev,
          comments: [commentResult, ...(prev.comments || [])]
        }
      })
      setNewComment('')
      // Keep authorName for future comments if they want to post multiple
    } catch (error) {
      console.error('Error posting comment:', error)
    } finally {
      setIsSubmittingComment(false)
    }
  }

  if (isLoading) return <LoadingSpinner />
  if (error) return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center relative overflow-hidden">
      {/* Grid background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-size-[4rem_4rem]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0A0A0A_80%)]" />
      </div>
      {/* Red glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center text-center px-6"
      >
        {/* Error code */}
        <div className="text-[8rem] sm:text-[12rem] font-black leading-none tracking-tighter select-none" style={{ background: 'linear-gradient(180deg, rgba(220,38,38,0.25) 0%, rgba(220,38,38,0.03) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          500
        </div>
        {/* Divider */}
        <div className="w-16 h-px my-6" style={{ background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.6), transparent)' }} />
        {/* Message */}
        <h2 className="text-xl sm:text-2xl font-bold text-white/90 mb-2">Something went wrong</h2>
        <p className="text-sm text-white/40 max-w-sm mb-8 leading-relaxed">{error}. Please try again later or head back to the blog feed.</p>
        {/* Button */}
        <Link
          href="/blog"
          className="group flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/3 hover:bg-red-500/10 hover:border-red-500/30 transition-all duration-300 backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4 text-white/50 group-hover:text-red-400 transition-colors group-hover:-translate-x-0.5 duration-300" />
          <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">Back to Blog Feed</span>
        </Link>
      </motion.div>
    </div>
  )
  if (!post) return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center relative overflow-hidden">
      {/* Grid background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-size-[4rem_4rem]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0A0A0A_80%)]" />
      </div>
      {/* Orange glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center text-center px-6"
      >
        {/* Error code */}
        <div className="text-[8rem] sm:text-[12rem] font-black leading-none tracking-tighter select-none" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          404
        </div>
        {/* Divider */}
        <div className="w-16 h-px my-6" style={{ background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.6), transparent)' }} />
        {/* Message */}
        <h2 className="text-xl sm:text-2xl font-bold text-white/90 mb-2">Post not found</h2>
        <p className="text-sm text-white/40 max-w-sm mb-8 leading-relaxed">The article you&apos;re looking for doesn&apos;t exist or may have been moved.</p>
        {/* Button */}
        <Link
          href="/blog"
          className="group flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/3 hover:bg-orange-500/10 hover:border-orange-500/30 transition-all duration-300 backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4 text-white/50 group-hover:text-orange-400 transition-colors group-hover:-translate-x-0.5 duration-300" />
          <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">Back to Blog Feed</span>
        </Link>
      </motion.div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-orange-500/30 selection:text-white relative overflow-x-hidden">
      {/* Premium Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-size-[4rem_4rem]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0A0A0A_80%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        {/* Navbar-style Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <div className="flex justify-start">
            <Link
              href="/blog"
              className="group flex items-center gap-2 p-1.5 pr-4 rounded-full bg-neutral-900/50 backdrop-blur-md border border-white/10 hover:bg-neutral-900/80 transition-all duration-300 shadow-sm"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white group-hover:bg-white/20 transition-colors">
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              </div>
              <span className="text-xs font-medium text-neutral-400 group-hover:text-white transition-colors tracking-tight">
                Back to Blog Feed
              </span>
            </Link>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12 lg:gap-16"
        >
          {/* Main Content Area */}
          <div className="space-y-12">
            <article className="space-y-10">
              {/* Hero Section */}
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {post.categories?.map(({ category }) => (
                    <span
                      key={category.name}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[10px] font-bold uppercase tracking-[0.15em] rounded-md"
                    >
                      <Tag className="w-3 h-3" />
                      {category.name}
                    </span>
                  ))}
                </div>

                <h1 className="text-5xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-b from-white via-white/90 to-white/60 leading-tight">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-sm text-white/40 font-medium">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>By {post.author.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>8 min read</span>
                  </div>
                </div>
              </motion.div>

              {/* Cover Image */}
              {post.imageUrl && (
                <motion.div
                  variants={itemVariants}
                  className="relative group aspect-21/9 rounded-4xl overflow-hidden border border-white/5"
                >
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                </motion.div>
              )}

              {/* Blog Content */}
              <motion.div
                variants={itemVariants}
                className="prose prose-invert prose-orange max-w-none 
                  prose-p:text-white/70 prose-p:leading-relaxed prose-p:text-lg
                  prose-headings:text-white prose-headings:font-bold
                  prose-a:text-orange-400 prose-a:no-underline hover:prose-a:text-orange-300
                  prose-blockquote:border-l-orange-500 prose-blockquote:bg-white/2 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl
                  prose-strong:text-white prose-strong:font-bold
                  prose-ul:list-disc prose-ul:ml-6 prose-ol:list-decimal prose-ol:ml-6
                "
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {post.content}
                </ReactMarkdown>
              </motion.div>
            </article>

            {/* Comments Section */}
            <CommentSection
              comments={post.comments || []}
              newComment={newComment}
              setNewComment={setNewComment}
              authorName={authorName}
              setAuthorName={setAuthorName}
              onSubmit={handleSubmitComment}
              isSubmitting={isSubmittingComment}
            />
          </div>

          {/* Sticky Sidebar / Details Column */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              {/* Author Card */}
              <motion.div variants={itemVariants} className="p-8 rounded-4xl bg-white/2 border border-white/8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 blur-[50px] -z-10 group-hover:bg-orange-500/20 transition-all duration-500" />
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500/60 mb-6">Curated By</div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/10">
                    <img src="/me.jpg" alt={post.author.name} className="w-full h-full object-cover scale-200 origin-top" style={{ filter: 'blur(0.3px)' }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-br from-white to-white/60">{post.author.name}</h3>
                    <p className="text-xs text-white/40 mt-1">Chief Content Officer</p>
                  </div>
                </div>
                <p className="text-sm text-white/50 leading-relaxed mb-6">
                  Exploring the intersections of design, technology, and philosophy through late-night brain dumps.
                </p>
                <div className="flex gap-2">
                  <div className="flex-1 h-px bg-linear-to-r from-white/10 to-transparent" />
                </div>
              </motion.div>

              {/* Related/Stats Card */}
              <motion.div variants={itemVariants} className="p-8 rounded-4xl bg-white/2 border border-white/8">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-6">Article Stats</div>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/50">Engagement</span>
                    <span className="text-sm font-bold text-white/90">{post.comments?.length || 0} Comments</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/50">Published</span>
                    <span className="text-sm font-bold text-white/90">
                      {new Date(post.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Newsletter/CTA */}
              <motion.div variants={itemVariants} className="p-8 rounded-4xl bg-linear-to-br from-orange-500/10 to-transparent border border-orange-500/20 relative overflow-hidden group">
                <div className="relative z-10">
                  <h4 className="text-lg font-bold mb-2">Stay in the Loop</h4>
                  <p className="text-xs text-white/50 leading-relaxed mb-6">Receive atomic updates on design and engineering direct to your inbox.</p>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Email address..."
                      className="w-full bg-black/50 border border-white/5 rounded-full py-2.5 px-4 text-xs text-white placeholder:text-white/20 focus:ring-0 focus:border-orange-500/30 transition-all outline-none 
                        autofill:shadow-[0_0_0_1000px_#0A0A0A_inset]! autofill:text-white! autofill:border-white/5!
                        [&:-webkit-autofill]:[-webkit-text-fill-color:white]! [&:-webkit-autofill]:[text-fill-color:white]!
                        [&:-webkit-autofill]:border-white/5! [&:-webkit-autofill]:[outline:none]! [&:-webkit-autofill]:shadow-[0_0_0_1000px_#0A0A0A_inset]!"
                    />
                    <button className="absolute right-1 top-1 bottom-1 px-4 bg-white text-black text-[10px] font-bold rounded-full hover:bg-white/90 transition-all">
                      Subscribe
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
