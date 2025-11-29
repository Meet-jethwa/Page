import { useState, useEffect, useRef } from 'react';

function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({ years: 0, clients: 0, satisfaction: 0 });
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateCounters = () => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setCounts({
        years: Math.floor(10 * progress),
        clients: Math.floor(50000 * progress),
        satisfaction: Math.floor(99 * progress)
      });

      if (step >= steps) clearInterval(timer);
    }, interval);
  };

  return (
    <section id="about" className="py-16 md:py-24 bg-gray-50" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className={`md:w-1/2 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}>
            <div className="bg-blue-600 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="bg-white/10 backdrop-blur rounded-lg p-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 animate-slide-in">
                    <div className="w-16 h-16 bg-white rounded-lg animate-pulse"></div>
                    <div className="flex-1 h-4 bg-white/50 rounded"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-white/30 rounded animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                    <div className="h-3 bg-white/30 rounded w-5/6 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="h-3 bg-white/30 rounded w-4/6 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`md:w-1/2 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              About Our Company
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              We're dedicated to providing the best solutions for businesses of all sizes. 
              With over 10 years of experience, we've helped thousands of companies achieve their goals.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our team of experts works tirelessly to ensure you get the support and tools 
              you need to succeed in today's competitive market.
            </p>
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center transform hover:scale-110 transition-transform duration-300">
                <div className="text-3xl font-bold text-blue-600 mb-2">{counts.years}+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div className="text-center transform hover:scale-110 transition-transform duration-300">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {counts.clients >= 1000 ? `${Math.floor(counts.clients / 1000)}K+` : counts.clients}
                </div>
                <div className="text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center transform hover:scale-110 transition-transform duration-300">
                <div className="text-3xl font-bold text-blue-600 mb-2">{counts.satisfaction}%</div>
                <div className="text-gray-600">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;