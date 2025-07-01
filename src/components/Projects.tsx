import React, { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { Project } from '../types';

const projectsData: Project[] = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'A full-featured online store (VERNA) with product listings, cart functionality, and secure checkout process.',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    category: 'fullstack',
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com'
  },
  {
    id: 2,
    title: 'Portfolio Website',
    description: 'A responsive personal portfolio website showcasing projects and skills with dark mode support.',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['React', 'Tailwind CSS', 'Node.js'],
    category: 'frontend',
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com'
  },
  {
    id: 3,
    title: 'Task Management App',
    description: 'A productivity app for managing tasks with drag-and-drop functionality and team collaboration features.',
    image: 'https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['HTML','CSS','JavaScript'],
    category: 'frontend',
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com'
  },
  {
    id: 4,
    title: 'Weather Dashboard',
    description: 'A weather application displaying current conditions and forecasts based on user location or search.',
    image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['JavaScript', 'HTML/CSS', 'API Integration'],
    category: 'frontend',
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com'
  },
  {
    id: 5,
    title: 'Recipe Finder',
    description: 'An application for finding recipes based on available ingredients with filtering options.',
    image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['React', 'API Integration', 'Styled Components'],
    category: 'frontend',
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com'
  },
  {
    id: 6,
    title: 'Mini Social Media Application',
    description: 'A custom website which can upload ,delete ,edit,like,dislike posts and comments can be displayed.',
    image: 'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['HTML', 'CSS', 'JavaScript', 'PHP','JSON'],
    category: 'frontend',
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com'
  }
];

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  
  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category === filter);

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">My Projects</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A selection of my recent work, showcasing my skills in web development and design.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            <button 
              onClick={() => setFilter('all')} 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('frontend')} 
              className={`filter-btn ${filter === 'frontend' ? 'active' : ''}`}
            >
              Frontend
            </button>
            <button 
              onClick={() => setFilter('backend')} 
              className={`filter-btn ${filter === 'backend' ? 'active' : ''}`}
            >
              Backend
            </button>
            <button 
              onClick={() => setFilter('fullstack')} 
              className={`filter-btn ${filter === 'fullstack' ? 'active' : ''}`}
            >
              Full Stack
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;