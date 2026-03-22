"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, ArrowRight } from "lucide-react"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form"
import { Input } from "../../../components/ui/input"
import { Textarea } from "../../../components/ui/textarea"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name required" }),
  email: z.string().email({ message: "Invalid email" }),
  message: z.string().min(5, { message: "Message too short" }),
})

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          name: values.name,
          email: values.email,
          message: values.message,
          subject: `New Portfolio Message from ${values.name}`,
          from_name: "Portfolio Contact Form",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setIsSuccess(true);
        form.reset();
      } else {
        console.error("Submission failed", result);
        // Fallback for demo if key is not active yet
        // setIsSuccess(true); 
      }
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-20 md:py-24 min-h-screen flex flex-col justify-center relative">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="grid lg:grid-cols-5 gap-10 md:gap-12"
          >
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-6 md:space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
                  Let&apos;s work <br className="hidden md:block" /> together.
                </h1>
                <p className="text-zinc-500 text-base md:text-lg leading-relaxed max-w-md">
                  Have a project in mind or just want to say hi? Feel free to reach out. I&apos;m always open to new opportunities and collaborations.
                </p>
              </div>

              <div className="pt-4 md:pt-8 space-y-6 md:space-y-8 border-t border-zinc-800/50 md:border-none">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Email</span>
                  <a href="mailto:gwscary@gmail.com" className="text-white text-lg md:text-xl hover:text-orange-500 transition-colors font-medium break-all">
                    gwscary@gmail.com
                  </a>
                </div>
                
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Social</span>
                  <div className="flex flex-wrap gap-4 md:gap-6">
                    <a href="#" className="text-sm md:text-base text-zinc-400 hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5">GitHub</a>
                    <a href="#" className="text-sm md:text-base text-zinc-400 hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5">LinkedIn</a>
                    <a href="#" className="text-sm md:text-base text-zinc-400 hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5">Twitter</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-3">
              <div className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-2xl">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 md:space-y-6">
                    <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2.5 block">Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your Name" 
                                {...field} 
                                className="bg-zinc-950/50 border-zinc-800/50 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 h-12 md:h-14 rounded-xl md:rounded-2xl px-5 text-white placeholder:text-zinc-700 transition-all font-medium text-sm"
                              />
                            </FormControl>
                            <FormMessage className="text-[10px] uppercase font-bold text-red-500 mt-1.5" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2.5 block">Email</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="your@email.com" 
                                {...field} 
                                className="bg-zinc-950/50 border-zinc-800/50 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 h-12 md:h-14 rounded-xl md:rounded-2xl px-5 text-white placeholder:text-zinc-700 transition-all font-medium text-sm"
                              />
                            </FormControl>
                            <FormMessage className="text-[10px] uppercase font-bold text-red-500 mt-1.5" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2.5 block">Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="How can I help you?" 
                              className="bg-zinc-950/50 border-zinc-800/50 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 min-h-[140px] md:min-h-[160px] rounded-xl md:rounded-2xl px-5 py-4 text-white placeholder:text-zinc-700 transition-all font-medium text-sm resize-none"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-[10px] uppercase font-bold text-red-500 mt-1.5" />
                        </FormItem>
                      )}
                    />
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-fit px-10 h-12 bg-white text-black hover:bg-zinc-200 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2.5 group disabled:opacity-50 shadow-xl"
                      >
                        {isSubmitting ? (
                          <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                        ) : (
                          <>
                            Send Message
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="flex flex-col items-center justify-center text-center w-full max-w-sm"
            >
              <div className="mb-6">
                <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={1.5} />
              </div>

              <div className="space-y-1.5 mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">Message Sent</h2>
                <p className="text-zinc-500 text-base leading-relaxed">
                  Thank you. I&apos;ll get back to you soon.
                </p>
              </div>

              <button 
                onClick={() => setIsSuccess(false)}
                className="px-7 py-2.5 rounded-full border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-700 transition-all text-[10px] font-bold uppercase tracking-wider bg-zinc-900/50"
              >
                Send Another
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
