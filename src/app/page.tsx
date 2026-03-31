"use client";
import { Stack } from '../components/Stack';
import React, { useEffect } from "react";
import { Type } from '@/components/Type';
import { Analytics } from "@vercel/analytics/react"
import Link from "next/link"
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import CodeIcon from '@mui/icons-material/Code';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import Projects from '@/components/Projects';

export default function Page() {
  useEffect(() => {
    // Force dark mode on the entire site
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <>

      <Analytics />
      <div className="h-852 sm:h-792 md:h-672 lg:h-632 w-full dark:bg-black bg-white dark:bg-grid-white/20 bg-grid-black/20 relative flex items-center justify-center overflow-x-hidden">

        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

        <p className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold absolute top-16 bg-clip-text text-transparent bg-linear-to-b from-neutral-200 to-neutral-500 py-8 whitespace-nowrap">
          Hi! I&apos;m{" "}
          <span className="bg-clip-text text-transparent bg-linear-to-b from-orange-200 to-orange-600 py-8">Prashant</span>
        </p>

        {/* Image below the text with margin-top */}
        <img
          src="/me.jpg"
          alt="Prashant"
          className="rounded-full h-80 w-50 absolute top-44 left-1/2 transform -translate-x-1/2 opacity-85"
        />

        <div className="cursor-pointer ">
          <GitHubIcon
            sx={{
              background: "linear-gradient(to bottom, #F07B50, #FF8C00)",
              borderRadius: "30%",
              padding: "8px",
              color: "white",
              opacity: "0.8",
              transition: "opacity 0.3s ease",
              "&:hover": {
                opacity: "1",
              },
              "&:active": {
                opacity: "1",
              },
            }}
            fontSize="large"
            onClick={() => window.open("https://github.com/prashantjaybhaye")}
            className="absolute top-60 left-[calc(20%-2rem)]"
          />

          <InstagramIcon
            sx={{
              background: "linear-gradient(to bottom, #F07B50, #FF8C00)",
              borderRadius: "30%",
              padding: "8px",
              color: "white",
              opacity: "0.8",
              transition: "opacity 0.3s ease",
              "&:hover": {
                opacity: "1",
              },
              "&:active": {
                opacity: "1",
              },
            }}
            fontSize="large"
            onClick={() => window.open("https://www.instagram.com/prashanttt__214")}
            className="absolute top-60 right-[calc(21%-2rem)]"
          />

          <LinkedInIcon
            sx={{
              background: "linear-gradient(to bottom, #F07B50, #FF8C00)",
              borderRadius: "30%",
              padding: "8px",
              color: "white",
              opacity: "0.8",
              transition: "opacity 0.3s ease",
              "&:hover": {
                opacity: "1",
              },
              "&:active": {
                opacity: "1",
              },
            }}
            fontSize="large"
            onClick={() => window.open("https://www.linkedin.com/in/prashant-jaybhaye/")}
            className="absolute top-80 left-[calc(20%-2rem)]"
          />

          <GraphicEqIcon sx={{
            background: "linear-gradient(to bottom, #F07B50, #FF8C00)",
            borderRadius: "30%",
            padding: "8px",
            color: "white",
            opacity: "0.8",
            transition: "opacity 0.3s ease",
            "&:hover": {
              opacity: "1",
            },
            "&:active": {
              opacity: "1",
            },
          }}
            fontSize="large"
            onClick={() => { }}
            className="absolute top-80 right-[calc(21%-2rem)]"
          />

          <XIcon
            sx={{
              background: "linear-gradient(to bottom, #F07B50, #FF8C00)",
              borderRadius: "30%",
              padding: "8px",
              color: "white",
              opacity: "0.8",
              transition: "opacity 0.3s ease",
              "&:hover": {
                opacity: "1",
              },
              "&:active": {
                opacity: "1",
              },
            }}
            fontSize="large"
            onClick={() => window.open("https://x.com/prashantjaybhye")}
            className="absolute top-100 left-[calc(20%-2rem)]"
          />

          <CodeIcon
            sx={{
              background: "linear-gradient(to bottom, #F07B50, #FF8C00)",
              borderRadius: "30%",
              padding: "8px",
              color: "white",
              opacity: "0.8",
              transition: "opacity 0.3s ease",
              "&:hover": {
                opacity: "1",
              },
              "&:active": {
                opacity: "1",
              },
            }}
            fontSize="large"
            onClick={() => { }}
            className="absolute top-100 right-[calc(21%-2rem)]"
          />
        </div>

        <Stack />

        <div className="absolute top-[34.2rem] left-[calc(18%-2rem)] right-[calc(21%-2rem)]">
          <Type />
        </div>

        <div className='absolute top-360 pointer-events-none whitespace-pre-wrap bg-linear-to-b from-gray-400 to-black bg-clip-text text-center text-2xl font-semibold leading-none text-transparent dark:from-black dark:to-white'>
          Here are some of my
        </div>

        <div className="absolute top-368 pointer-events-none whitespace-pre-wrap bg-linear-to-b from-gray-400 to-black bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-black dark:to-gray-100 ">
          ProJects
        </div>

        <div className='absolute top-410 sm:top-424 w-full lg:w-auto px-4 lg:px-0'>

          <Projects />

        </div>


      </div>

      {/* Blog Button */}

      <Link href="/blog">
        <button className="bg-orange-500 hover:bg-orange-700 text-white px-14 py-5 rounded-full text-lg font-semibold transition-colors duration-300 transform hover:scale-100 absolute top-[calc(0%+0.8rem)] left-[calc(0%-1rem)] h-2 w-20 flex items-center justify-center">
          Blog
        </button>
      </Link>

      {/* Contact Button */}
      <Link href="/contact">
        <button className="bg-orange-500 hover:bg-orange-700 text-white px-14 py-5 rounded-full text-lg font-semibold transition-colors duration-300 transform hover:scale-100 absolute top-[calc(0%+0.8rem)] right-[calc(0%-1rem)] h-2 w-20 flex items-center justify-center">
          Contact<span>&nbsp;</span>
        </button>
      </Link>

    </>
  )
}