"use client"
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Lock, Loader2, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.ok) {
      router.push('/admin')
    } else {
      alert('Login failed')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-[#121214] font-sans text-white">
      {/* Left Panel - Image & Branding overlay */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden lg:flex">
        {/* Background Image Placeholder */}
        <img
          src="https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1074&auto=format&fit=crop"
          alt="Premium Dark Abstract"
          className="absolute inset-0 h-full w-full object-cover grayscale-[0.3]"
        />
        {/* Gradient Overlay for bottom text readability */}
        <div className="absolute inset-0 bg-linear-to-t from-[#121214]/90 via-[#121214]/40 to-[#121214]/20 mix-blend-multiply" />
        <div className="absolute inset-0 bg-linear-to-t from-[#121214] via-transparent to-transparent" />

        {/* Top Text Mark */}
        <div className="relative z-10 flex items-center gap-2 p-8 text-white">
          <span className="font-bold text-xl tracking-tight">Prashant Jaybhaye</span>
        </div>

      </div>

      {/* Right Panel - Form (Dark Mode) */}
      <div className="relative flex w-full items-center justify-center p-8 lg:w-1/2 border-l border-zinc-800/10 bg-[#121214] overflow-hidden">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute top-[35%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/1.5 blur-[120px] rounded-full pointer-events-none" />

        <div className="w-full max-w-[400px] relative z-10">

          {/* Form Header */}
          <div className="mb-10 flex flex-col items-center text-center">
            <div className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-red-500/10 to-red-500/5 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-red-500 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
              <Lock className="h-3 w-3" />
              Restricted Admin Access
            </div>
            <h2 className="mb-2 text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-br from-white to-zinc-500">
              Welcome Back
            </h2>
            <p className="text-sm text-zinc-400 font-medium">
              Only authorized administrators may proceed.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-zinc-400 uppercase tracking-wider ml-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="prashant@example.com"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm font-medium text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500 focus:bg-zinc-900 transition-all shadow-sm hover:bg-zinc-900/80"
                style={{ WebkitBoxShadow: '0 0 0px 1000px #18181b inset', WebkitTextFillColor: 'white' }}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[12px] font-bold text-zinc-400 uppercase tracking-wider">Password</label>
                <a href="#" className="text-[12px] font-medium text-zinc-500 hover:text-white transition-colors">
                  Forgot?
                </a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm font-medium text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500 focus:bg-zinc-900 transition-all shadow-sm hover:bg-zinc-900/80"
                style={{ WebkitBoxShadow: '0 0 0px 1000px #18181b inset', WebkitTextFillColor: 'white' }}
                required
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative mt-2 w-full flex items-center justify-center gap-2 rounded-xl bg-white py-3 text-[14px] font-bold text-black transition-all hover:bg-zinc-200 active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 shadow-[0_4px_14px_rgba(255,255,255,0.08)] hover:shadow-[0_4px_20px_rgba(255,255,255,0.15)]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-black" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Initialize Session</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="mt-16 text-center">
            <p className="text-xs font-semibold text-zinc-600">
              © 2026 Developer Portfolio
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}