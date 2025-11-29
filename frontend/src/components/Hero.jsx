import { useState, useEffect } from 'react';

function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className={`md:w-1/2 mb-8 md:mb-0 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Build Something
              <span className="text-blue-600 inline-block animate-pulse"> Amazing</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Transform your ideas into reality with our professional solutions. 
              Trusted by thousands of businesses worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold hover:scale-105 hover:shadow-lg">
                Start Free Trial
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-300 font-semibold hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
          <div className={`md:w-1/2 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
          }`}>
            <div className="bg-linear-to-br from-blue-100 to-blue-200 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="h-64 flex items-center justify-center text-gray-400">
                  <svg className="w-full h-full animate-float" viewBox="0 0 400 300" fill="none">
                    <rect x="50" y="50" width="300" height="200" rx="10" fill="#3B82F6" opacity="0.1" className="animate-pulse"/>
                    <circle cx="200" cy="150" r="50" fill="#3B82F6" opacity="0.2" className="animate-bounce-slow"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;