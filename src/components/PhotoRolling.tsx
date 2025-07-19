import React from 'react';

const PhotoRolling: React.FC = () => {
  const photos = [
    {
      id: 1,
      url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Modern workspace setup'
    },
    {
      id: 2,
      url: 'l.png',
      alt: 'Code on laptop screen'
    },
    {
      id: 3,
      url: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Creative design workspace'
    },
    {
      id: 4,
      url: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Team collaboration'
    },
    {
      id: 5,
      url: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Mobile app development'
    },
    {
      id: 6,
      url: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Digital innovation'
    },
    {
      id: 7,
      url: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Technology and creativity'
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            My Journey
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A visual showcase of my development journey, workspace, and creative process.
          </p>
        </div>
        
        <div className="kn relative">
          {/* Rolling container */}
          <div className="kn flex animate-scroll space-x-6">
            {/* First set of photos */}
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="kn flex-shrink-0 w-96 h-72 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
              >
                <img
                  src={photo.url}
                  alt={photo.alt}
                  className="kn w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {photos.map((photo) => (
              <div
                key={`duplicate-${photo.id}`}
                className="kn flex-shrink-0 w-96 h-72 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
              >
                <img
                  src={photo.url}
                  alt={photo.alt}
                  className="kn w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
          
          {/* Gradient overlays for smooth edges */}
          <div className="kn absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-gray-50 dark:from-gray-800 to-transparent pointer-events-none z-10"></div>
          <div className="kn absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-gray-50 dark:from-gray-800 to-transparent pointer-events-none z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default PhotoRolling;