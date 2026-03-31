import React from 'react';
import { motion } from "framer-motion";
import { FaGithub } from 'react-icons/fa';
import { PROJECTS_DATA, Project } from '../constants/projects';

const ProjectCard = ({ project }: { project: Project }) => (
  <div className='mb-8 flex flex-wrap lg:justify-center md:items-center'>
    <motion.div
      className='w-full md:w-1/3 lg:w-1/4 md:pr-8 lg:pr-0'
    >
      <a href={project.github} target="_blank" rel="noopener noreferrer">
        <img
          src={project.image}
          width={500}
          height={500}
          alt={project.title}
          className='mb-6 rounded-xl max-w-full h-auto mx-auto lg:mx-[-100px] shadow-lg hover:scale-105 transition-transform duration-300'
        />
      </a>
    </motion.div>

    <motion.div
      className='w-full md:w-2/3 max-w-xl lg:w-3/4'
    >
      <a href={project.liveDemo || project.github} target="_blank" rel="noopener noreferrer">
        <h3 className='mb-2 font-semibold text-2xl hover:text-stone-300 transition-colors'>{project.title}</h3>
      </a>
      <p className='mb-4 text-stone-400 leading-relaxed line-clamp-3'>
        {project.description}
      </p>

      <div className='flex gap-4 items-center'>
        <a className='text-2xl hover:text-stone-300 transition-colors' href={project.github} target='_blank' rel="noopener noreferrer">
          <FaGithub />
        </a>
        {project.liveDemo && (
          <a className='text-sm text-stone-500 hover:text-stone-300 underline font-medium' href={project.liveDemo} target='_blank' rel="noopener noreferrer">
            Live Demo
          </a>
        )}
      </div>

      <div className='mt-4 flex flex-wrap gap-2'>
        {project.technologies.map((tech, index) => (
          <span
            key={index}
            style={{ backgroundColor: project.badgeBg }}
            className={`rounded px-2 py-1 text-sm font-medium ${project.badgeTextColor}`}
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  </div>
);

const Projects = () => {
  return (
    <section id='projects' className='py-12'>
      <div className='container mx-auto px-4'>
        {PROJECTS_DATA.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
}

export default Projects;