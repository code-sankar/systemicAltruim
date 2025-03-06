import React from "react";

function HeroHeader() {
  return (
    <section className="relative w-full bg-[#0d0a1a] text-white overflow-hidden">
      {/* Animated gradient background elements */}
      <div className="absolute top-0 left-1/4 w-1/3 h-1/3 bg-gradient-to-r from-purple-500/20 blur-3xl animate-pulse" />
      <div className="absolute top-1/2 right-0 w-1/4 h-1/3 bg-gradient-to-l from-indigo-500/20 blur-3xl animate-pulse delay-300" />

      {/* Top Image with enhanced overlay */}
      <div className="relative w-full flex justify-center pt-8">
        <div className="relative w-full max-w-6xl">
          <img
            src="https://cdn.prod.website-files.com/623ae64112adcf772da9687e/66b7a9b742a15fc71db053f3_pv%20team%20cropped.png"
            alt="Group of People"
            className="w-full h-[500px] object-cover object-center filter grayscale contrast-130 saturate-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a1a] via-[#0d0a1a]/90 to-transparent" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative w-11/12 lg:w-4/5 mx-auto flex flex-col items-center text-center px-4 py-12 md:py-16 lg:py-24 space-y-8">
        {/* Animated Title */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent leading-tight animate-fade-in-up">
          Startupathon
        </h1>

        {/* Subtitle with improved typography */}
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl font-light leading-relaxed animate-fade-in-up delay-100">
          Your Gateway to Entrepreneurial Excellence: Build, Lead, and Triumph
          as a Visionary Founder
        </p>

        {/* Video Container with modern aspect ratio */}
        <div className="w-full max-w-4xl rounded-xl overflow-hidden border border-white/10 shadow-2xl animate-fade-in-up delay-200">
          <div className="aspect-video bg-gray-900">
            <iframe
              src="https://www.loom.com/embed/996f59a2e5c34fd38b86544833c23dde?t=14"
              title="Startupathon Video"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Enhanced Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up delay-300">
          {[
            ["Ongoing Startupathon", "#ongoing"],
            ["Startupathon Guide", "#guide"],
            ["Past Startupathons", "#past"],
            ["Mentor Network", "#mentor"],
          ].map(([text, href]) => (
            <a
              key={text}
              href={href}
              className="px-6 py-3 rounded-full font-medium transition-all duration-300
                         bg-purple-600 hover:bg-purple-700 hover:scale-105
                         shadow-lg hover:shadow-purple-500/30
                         flex items-center gap-2 group"
            >
              {text}
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroHeader;
