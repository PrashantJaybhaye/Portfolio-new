"use client"
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Lock, Loader2, ArrowRight, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { LiquidButton } from '@/components/ui/liquid-glass-button'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
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
        <Link href="/" className="relative z-10 flex items-center gap-2 p-8 text-white group">
          <span className="font-bold text-xl tracking-tight group-hover:opacity-80 transition-opacity">Prashant Jaybhaye</span>
        </Link>

      </div>

      {/* Right Panel - Form (Dark Mode) */}
      <div className="relative flex w-full items-center justify-center p-8 lg:w-1/2 border-l border-zinc-800/10 bg-[#121214] overflow-hidden">
        
        {/* Mobile-only home link — Apple Liquid Glass */}
        <div className="absolute top-6 left-6 z-20 lg:hidden">
          <Link href="/" aria-label="Back to home">
            <LiquidButton size="icon" variant="default" className="pointer-events-none">
              <ArrowLeft className="h-4 w-4 text-white" />
            </LiquidButton>
          </Link>
        </div>

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
              <label htmlFor="email" className="text-[12px] font-bold text-zinc-400 uppercase tracking-wider ml-1">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="prashant@example.com"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm font-medium text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500/30 focus:bg-zinc-900 transition-all shadow-sm hover:bg-zinc-900/80 autofill:shadow-[0_0_0px_1000px_#18181b_inset] autofill:[-webkit-text-fill-color:white]"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label htmlFor="password" className="text-[12px] font-bold text-zinc-400 uppercase tracking-wider">Password</label>
                <a href="#" className="text-[12px] font-medium text-zinc-500 hover:text-white transition-colors">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3 pr-12 text-sm font-medium text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500/30 focus:bg-zinc-900 transition-all shadow-sm hover:bg-zinc-900/80 autofill:shadow-[0_0_0px_1000px_#18181b_inset] autofill:[-webkit-text-fill-color:white]"
                  required
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-white transition-colors rounded-md"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <LiquidButton
              type="submit"
              disabled={isSubmitting}
              size="xl"
              className="mt-2 w-full text-[14px] font-bold text-white"
            >
              <span className="inline-flex items-center gap-2">
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span>Initialize Session</span>
                    <ArrowRight className="h-4 w-4 text-white" />
                  </>
                )}
              </span>
            </LiquidButton>
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