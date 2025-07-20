import React from 'react';

const PhotoRolling: React.FC = () => {
  const photos = [
    {
      id: 1,
      url: 'image copy 3.png',
      alt: 'Modern workspace setup'
    },
    {
      id: 2,
      url: 'image copy.png',
      alt: 'Code on laptop screen'
    },
    {
      id: 3,
      url: 'image.png',
      alt: 'Creative design workspace'
    },
    {
      id: 4,
      url: 'image copy 2.png',
      alt: 'Team collaboration'
    },
    {
      id: 5,
      url: 'image copy 4.png',
      alt: 'Mobile app development'
    },
    {
      id: 6,
      url: 'image copy 5.png',
      alt: 'Mobile app development'
    },
    {
      id: 7,
      url: 'io.png',
      alt: 'Technology and creativity'
    }
  ];

  // Calculate dynamic animation duration based on number of photos
  // More photos = longer duration for smooth scrolling
  const animationDuration = Math.max(20, photos.length * 3);
  
  // Dynamic styles for the animation
  const scrollStyle = {
    animation: `scroll ${animationDuration}s linear infinite`,
    width: `${photos.length * 2 * 408}px` // 408px = 384px width + 24px gap
  };
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Certifications
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A visual showcase of my development journey, workspace, and creative participation.
          </p>
        </div>
        
        <div className="relative">
          {/* Rolling container */}
          <div 
            className="flex space-x-6" 
            style={scrollStyle}
          >
            {/* First set of photos */}
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="flex-shrink-0 w-[800px] h-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
              >
                <img
                  src={photo.url}
                  alt={photo.alt}
                  className="w-900 h-900 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {photos.map((photo) => (
              <div
                key={`duplicate-${photo.id}`}
                className="flex-shrink-0 w-96 h-72 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
              >
                <img
                  src={photo.url}
                  alt={photo.alt}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
          
          {/* Gradient overlays for smooth edges */}
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-gray-50 dark:from-gray-800 to-transparent pointer-events-none z-10"></div>
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-gray-50 dark:from-gray-800 to-transparent pointer-events-none z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default PhotoRolling;