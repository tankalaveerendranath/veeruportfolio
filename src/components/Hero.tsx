import React from 'react';
import { ArrowDown, Github, Linkedin, Twitter } from 'lucide-react';
import ButterflyBackground from './ButterflyBackground';

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center pt-16  relative overflow-hidden">
      <ButterflyBackground />
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0 space-y-6">
          <div className="space-y-2">
            <h2 className="pp text-lg md:text-xl text-white font-medium animate-fadeIn">
              Hello, I'm
            </h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white animate-slideUp">
              Veerendranath Tanakala
            </h1>
            <h3 className="text-xl md:text-2xl text-white/90 animate-slideUp animation-delay-100">
              Full-stack Website Designer & Developer
            </h3>
          </div>
          
          <p className="text-white/80 text-lg md:text-xl max-w-lg animate-fadeIn animation-delay-200">
            I craft engaging digital experiences with clean code and thoughtful design. Focused on building accessible and high-performance web applications.
          </p>
          
          <div className="flex space-x-4 animate-fadeIn animation-delay-300">
            <a 
              href="#contact" 
              className="px-6 py-3 bg-white hover:bg-gray-100 text-gray-900 font-medium rounded-lg transition-colors shadow-lg hover:shadow-xl"
            >
              Contact Me
            </a>
            <a 
              href="#projects" 
              className="px-6 py-3 bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium rounded-lg transition-colors"
            >
              View Projects
            </a>
          </div>
          
          <div className="flex items-center space-x-4 pt-4 animate-fadeIn animation-delay-400">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 text-white hover:text-white/80 transition-colors">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 text-white hover:text-white/80 transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 text-white hover:text-white/80 transition-colors">
              <Twitter size={20} />
            </a>
          </div>
        </div>
        
        <div className="oo  md:w-1/2 flex justify-center animate-slideIn animation-delay-300">
          <div className="kop relative w-90 h-96 md:w-[500px] md:h-[550px] rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl">
            <img 
              src="veeru.png" 
              alt="Veerendranath" 
              className="lop w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      
      <a 
        href="#projects" 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce p-2 bg-white/10 backdrop-blur-sm rounded-full shadow-md text-white hover:text-white/80 transition-colors"
        aria-label="Scroll to projects"
      >
        <ArrowDown size={24} />
      </a>
    </section>
  );
};

export default Hero;