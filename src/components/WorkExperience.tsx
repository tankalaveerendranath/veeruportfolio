import React from 'react';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';

interface Experience {
  id: number;
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string[];
  technologies: string[];
  website?: string;
}

const experienceData: Experience[] = [
  {
    id: 1,
    company: 'Tech Solutions Inc.',
    position: 'Full Stack Developer',
    duration: 'Jan 2023 - Present',
    location: 'Visakhapatnam, India',
    description: [
      'Developed and maintained responsive web applications using React, Node.js, and MongoDB',
      'Collaborated with cross-functional teams to deliver high-quality software solutions',
      'Implemented RESTful APIs and integrated third-party services to enhance application functionality',
      'Optimized application performance resulting in 40% faster load times',
      'Mentored junior developers and conducted code reviews to maintain code quality standards'
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'HTML/CSS', 'Git'],
    website: 'https://techsolutions.com'
  },
  {
    id: 2,
    company: 'Digital Innovations Ltd.',
    position: 'Frontend Developer',
    duration: 'Jun 2022 - Dec 2022',
    location: 'Remote',
    description: [
      'Built modern, responsive user interfaces using React and Tailwind CSS',
      'Worked closely with UI/UX designers to implement pixel-perfect designs',
      'Developed reusable component libraries to improve development efficiency',
      'Integrated frontend applications with backend APIs and databases',
      'Participated in agile development processes and sprint planning sessions'
    ],
    technologies: ['React', 'Tailwind CSS', 'JavaScript', 'HTML/CSS', 'Figma', 'Git'],
    website: 'https://digitalinnovations.com'
  },
  {
    id: 3,
    company: 'StartupHub',
    position: 'Web Developer Intern',
    duration: 'Jan 2022 - May 2022',
    location: 'Visakhapatnam, India',
    description: [
      'Assisted in developing company website and internal tools using HTML, CSS, and JavaScript',
      'Learned modern web development practices and version control with Git',
      'Collaborated with senior developers on various client projects',
      'Gained hands-on experience with database management and server deployment',
      'Contributed to improving website performance and user experience'
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'Git'],
    website: 'https://startuphub.com'
  }
];

const WorkExperience: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Work Experience
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My professional journey in web development, showcasing the roles and responsibilities 
            that have shaped my expertise in building modern web applications.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-blue-200 dark:bg-blue-800"></div>
            
            {experienceData.map((experience, index) => (
              <div key={experience.id} className={`relative mb-12 ${index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'}`}>
                {/* Timeline dot */}
                <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-blue-600 dark:bg-blue-500 rounded-full border-4 border-white dark:border-gray-900 shadow-md"></div>
                
                <div className={`ml-16 md:ml-0 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                          {experience.position}
                        </h3>
                        <div className="flex items-center text-blue-600 dark:text-blue-400 mb-2">
                          <span className="font-semibold">{experience.company}</span>
                          {experience.website && (
                            <a 
                              href={experience.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="ml-2 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                            >
                              <ExternalLink size={16} />
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center mb-1">
                          <Calendar size={16} className="mr-2" />
                          {experience.duration}
                        </div>
                        <div className="flex items-center">
                          <MapPin size={16} className="mr-2" />
                          {experience.location}
                        </div>
                      </div>
                    </div>
                    
                    <ul className="text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                      {experience.description.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;