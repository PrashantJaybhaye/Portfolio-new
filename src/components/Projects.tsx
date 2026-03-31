import React from 'react';
import { motion } from "framer-motion";
import { FaGithub } from 'react-icons/fa';


const Projects = () => {
  return (
    <section id='projects'>
      <div className='pb-4' >
        {/* Sidvia AI Project */}
        <div className='mb-8 flex flex-wrap lg:justify-center md:items-center'>
          <motion.div
            className='w-full md:w-1/3 lg:w-1/4 md:pr-8 lg:pr-0'>
            <a href='https://github.com/PrashantJaybhaye/Sidvia-Interview-Agent'>
              <img src='/sidvia.png' width={500} height={500} alt="Sidvia AI" className='mb-6 rounded-xl max-w-full h-auto mx-auto lg:mx-[-100px] shadow-lg' />
            </a>
          </motion.div>
          <motion.div
            className='w-full md:w-2/3 max-w-xl lg:w-3/4'>
            <a href='https://github.com/PrashantJaybhaye/Sidvia-Interview-Agent'>
              <h3 className='mb-2 font-semibold text-2xl'>Sidvia AI</h3>
            </a>
            <p className='mb-4 text-stone-400'>
              Smart Interactive Digital Voice-based Interview Agent. Practice and master your next job interview with real-time AI feedback. Features voice-based interactions, intelligent question generation, and comprehensive analytics.
            </p>
            <div className='flex gap-4 items-center'>
              <a className='text-2xl  ' href='https://github.com/PrashantJaybhaye/Sidvia-Interview-Agent' target='_blank'>
                <FaGithub />
              </a>
              <a className='text-sm text-stone-500 hover:text-stone-300 underline font-medium' href='https://sidvia.vercel.app/' target='_blank'>
                Live Demo
              </a>
            </div>
            <div className='mt-4 flex flex-wrap'>
              <span className='mr-3 rounded bg-[#d6cc99] p-2 text-sm font-medium text-stone-900'>Next.js 15</span>
              <span className='mr-3 rounded bg-[#d6cc99] p-2 text-sm font-medium text-stone-900'>React 19</span>
              <span className='mr-3 rounded bg-[#d6cc99] p-2 text-sm font-medium text-stone-900'>Firebase</span>
              <span className='mr-3 rounded bg-[#d6cc99] p-2 text-sm font-medium text-stone-900'>VAPI AI</span>
              <span className='mr-3 rounded bg-[#d6cc99] p-2 text-sm font-medium text-stone-900'>Gemini AI</span>
            </div>
          </motion.div>
        </div>

        {/* Siora AI */}
        <div className='mb-8 flex flex-wrap lg:justify-center md:items-center'>
          <motion.div
            className='w-full md:w-1/3 lg:w-1/4 md:pr-8 lg:pr-0'>
            <a href='https://github.com/PrashantJaybhaye/AI-Agent'>
              <img src='/siora.png' width={500} height={500} alt="Siora AI" className='mb-6 rounded-xl max-w-full h-auto mx-auto lg:mx-[-100px] shadow-lg' />
            </a>

          </motion.div>
          <motion.div
            className='w-full md:w-2/3 max-w-xl lg:w-3/4'>
            <a href='https://github.com/PrashantJaybhaye/AI-Agent'>
              <h3 className='mb-2 font-semibold text-2xl'>Siora - AI Agent</h3>
            </a>
            <p className='mb-4 text-stone-400'>
              A personal AI mindfulness companion that enables real-time voice interactions for stress relief and focus. Built with React Native, Expo, LiveKit, and ElevenLabs to provide an immersive, intelligent meditation experience.
            </p>
            <a className='text-2xl  ' href='https://github.com/PrashantJaybhaye/AI-Agent' target='_blank'>
              <FaGithub />
            </a>
            <div className='mt-4 flex flex-wrap'>
              <span className='mr-3 rounded bg-[#0a4174] p-2 text-sm font-medium text-stone-300'>React Native</span>
              <span className='mr-3 rounded bg-[#0a4174] p-2 text-sm font-medium text-stone-300'>Expo</span>
              <span className='mr-3 rounded bg-[#0a4174] p-2 text-sm font-medium text-stone-300'>LiveKit</span>
              <span className='mr-3 rounded bg-[#0a4174] p-2 text-sm font-medium text-stone-300'>ElevenLabs</span>
              <span className='mr-3 rounded bg-[#0a4174] p-2 text-sm font-medium text-stone-300'>AI Voice</span>
            </div>
          </motion.div>
        </div>

        {/* smart allocation system */}
        <div className='mb-8 flex flex-wrap lg:justify-center md:items-center'>
          <motion.div
            className='w-full md:w-1/3 lg:w-1/4 md:pr-8 lg:pr-0'>
            <a href='https://github.com/PrashantJaybhaye/Smart-Allocation-system'>
              <img src='/smart-allocation.png' width={500} height={500} alt="Smart Allocation System" className='mb-6 rounded-xl max-w-full h-auto mx-auto lg:mx-[-100px] shadow-lg' />
            </a>
          </motion.div>
          <motion.div
            className='w-full md:w-2/3 max-w-xl lg:w-3/4'>
            <a href='https://smart-allocation-system.onrender.com' target='_blank'>
              <h3 className='mb-2 font-semibold text-2xl'>Smart Allocation System</h3>
            </a>
            <p className='mb-4 text-stone-400'>
              A robust Flask-based system built to automate course allocation for university students. Features secure user management, CSV/Excel data processing, and an intelligent allocation algorithm to manage large volumes of academic data effectively.
            </p>
            <div className='flex gap-4 items-center'>
              <a className='text-2xl  ' href='https://github.com/PrashantJaybhaye/Smart-Allocation-system' target='_blank'>
                <FaGithub />
              </a>
              <a className='text-sm text-stone-500 hover:text-stone-300 underline font-medium' href='https://smart-allocation-system.onrender.com' target='_blank'>
                Live Demo
              </a>
            </div>
            <div className='mt-4 flex flex-wrap'>
              <span className='mr-3 rounded bg-[#abca9e] p-2 text-sm font-medium text-stone-900'>Flask</span>
              <span className='mr-3 rounded bg-[#abca9e] p-2 text-sm font-medium text-stone-900'>Python</span>
              <span className='mr-3 rounded bg-[#abca9e] p-2 text-sm font-medium text-stone-900'>SQLite</span>
              <span className='mr-3 rounded bg-[#abca9e] p-2 text-sm font-medium text-stone-900'>Tailwind CSS</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Projects;