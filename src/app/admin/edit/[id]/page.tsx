"use client"
import { useState, useEffect, use } from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { CheckCircle2, XCircle, Type, AlignLeft, ImagePlus, Tags, Save, Plus } from 'lucide-react'
import AdminNav from '@/components/AdminNav'
import LoadingSpinner from '@/components/LoadingSpinner'

interface Category {
  id: string
  name: string
}

interface Post {
  id: string
  title: string
  content: string
  imageUrl?: string
  categories: {
    category: {
      id: string
      name: string
    }
  }[]
}

export default function EditPost({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [isAddingCategory, setIsAddingCategory] = useState(false)

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/posts/${resolvedParams.id}`)
        const post: Post = await response.json()
        
        setTitle(post.title || '')
        setContent(post.content || '')
        setImageUrl(post.imageUrl || '')
        setSelectedCategories((post.categories || []).map(c => c.category.id))
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching post:', error)
        toast.error('Failed to fetch post data from server.', { icon: <XCircle className="w-5 h-5 text-red-500" /> })
        setIsLoading(false)
      }
    }

    async function fetchCategories() {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data)
    }

    fetchPost()
    fetchCategories()
  }, [resolvedParams.id])

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategoryName })
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Failed to create category')
      }
      const added = await res.json()
      setCategories([...categories, added])
      setSelectedCategories([...selectedCategories, added.id])
      setNewCategoryName('')
      setIsAddingCategory(false)
      toast.success('Category created!', { icon: <CheckCircle2 className="w-5 h-5 text-green-500" /> })
    } catch (error: any) {
      toast.error(error.message || 'Failed to add category', { icon: <XCircle className="w-5 h-5 text-red-500" /> })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/posts/${resolvedParams.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, imageUrl, categories: selectedCategories }),
      })

      if (!response.ok) throw new Error('Failed to update post')

      toast.success('Post updated successfully!', { icon: <CheckCircle2 className="w-5 h-5 text-green-500" /> })
      router.push('/admin/manage')
    } catch (error) {
      console.error('Error updating post:', error)
      toast.error('Failed to update post. Please try again.', { icon: <XCircle className="w-5 h-5 text-red-500" /> })
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId])
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
          
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold tracking-tight text-white/90">Edit Post</h1>
            <p className="text-sm text-white/50">Make changes to your existing blog post.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Title Container */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-3 group transition-colors hover:bg-white/[0.03]">
              <label className="flex items-center gap-1.5 text-xs font-medium text-white/50 uppercase tracking-wider">
                <Type className="w-3.5 h-3.5" /> Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Post title..."
                className="w-full bg-transparent text-xl font-medium text-white placeholder:text-white/20 border-transparent focus:border-transparent outline-none focus:outline-none focus:ring-0 shadow-none px-0 py-1"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Image Upload */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-3 group transition-colors hover:bg-white/[0.03]">
                <label className="flex items-center gap-1.5 text-xs font-medium text-white/50 uppercase tracking-wider">
                  <ImagePlus className="w-3.5 h-3.5" /> Cover Image
                </label>
                <CldUploadWidget
                  uploadPreset="blog_uploads"
                  onUploadAdded={() => setIsUploading(true)}
                  onSuccess={(result: any) => {
                    if (result.info?.secure_url) { setImageUrl(result.info.secure_url); setIsUploading(false); }
                  }}
                  onError={() => { setIsUploading(false); toast.error('Upload failed.') }}
                >
                  {({ open }) => (
                    imageUrl && !isUploading ? (
                      <div className="relative group/img rounded-xl overflow-hidden aspect-video border border-white/10 cursor-pointer" onClick={() => open?.()}>
                        <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-xs font-medium bg-white/20 px-3 py-1.5 rounded-lg backdrop-blur-md">Change</span>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => open?.()}
                        disabled={isUploading}
                        className="w-full aspect-video flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/10 hover:border-white/30 bg-white/[0.01] hover:bg-white/[0.03] transition-all disabled:opacity-50"
                      >
                        {isUploading ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <ImagePlus className="w-5 h-5 text-white/40" />}
                        <span className="text-xs text-white/50">Upload Cover</span>
                      </button>
                    )
                  )}
                </CldUploadWidget>
              </div>

              {/* Categories */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-3 group transition-colors hover:bg-white/[0.03]">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-1.5 text-xs font-medium text-white/50 uppercase tracking-wider">
                    <Tags className="w-3.5 h-3.5" /> Categories
                  </label>
                  <button type="button" onClick={() => setIsAddingCategory(!isAddingCategory)} className="text-white/40 hover:text-white transition-colors" title="Create new category">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {isAddingCategory && (
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={newCategoryName}
                      onChange={e => setNewCategoryName(e.target.value)}
                      placeholder="New category..."
                      className="flex-1 bg-white/[0.03] border border-white/10 rounded-lg px-2 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/30"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          handleAddCategory()
                        }
                      }}
                    />
                    <button type="button" onClick={handleAddCategory} className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors">
                      Add
                    </button>
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => toggleCategory(category.id)}
                      className={`
                        px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border outline-none
                        ${selectedCategories.includes(category.id)
                          ? 'bg-white text-black border-transparent shadow-sm'
                          : 'bg-transparent text-white/60 border-white/10 hover:bg-white/5 hover:text-white'}
                      `}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Content Container */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-3 group transition-colors hover:bg-white/[0.03] flex flex-col">
              <label className="flex items-center gap-1.5 text-xs font-medium text-white/50 uppercase tracking-wider">
                <AlignLeft className="w-3.5 h-3.5" /> Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post content here..."
                className="w-full bg-transparent text-sm text-white/90 placeholder:text-white/20 border-transparent focus:border-transparent outline-none focus:outline-none focus:ring-0 shadow-none px-0 py-1 min-h-[400px] resize-y leading-relaxed"
                required
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <span>Save Changes</span>
                    <Save className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
                  </>
                )}
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  )
} 