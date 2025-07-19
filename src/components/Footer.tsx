import React from 'react';
import { Github, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
      <div className="kk container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Let's talk about</h3>
            <p className="text-gray-400 mb-4">
              Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.
            </p>
            <button className="px-6 py-2 bg-emerald-400 hover:bg-emerald-500 text-gray-900 rounded-md transition-colors">
              Learn more
            </button>
          </div>
          
          <div className="kt">
            <h3 className="text-xl font-bold mb-4">Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-white transition-colors">&gt; Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">&gt; About</a></li>
              <li><a href="#skills" className="text-gray-400 hover:text-white transition-colors">&gt; Skills</a></li>
              <li><a href="#experience" className="text-gray-400 hover:text-white transition-colors">&gt; Experience</a></li>
              <li><a href="#projects" className="text-gray-400 hover:text-white transition-colors">&gt; Projects</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">&gt; Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><span className="text-gray-400">&gt; Web Design</span></li>
              <li><span className="text-gray-400">&gt; Web Development</span></li>
              <li><span className="text-gray-400">&gt; Full Stack Development</span></li>
              <li><span className="text-gray-400">&gt; Data Analysis</span></li>
              <li><span className="text-gray-400">&gt; Graphic Design</span></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Have a Question?</h3>
            <address className="text-gray-400 not-italic">
              <p className="mb-2">Sujatha Nagar, Pendurthi, Visakhapatnam</p>
              <p className="mb-2">+91 93900-83562</p>
              <p className="mb-4">veerendranathtanakala05@gmail.com</p>
            </address>
            <div className="flex space-x-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
        <br />
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {currentYear} All rights reserved | Created By Veerendranath Tanakala</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;