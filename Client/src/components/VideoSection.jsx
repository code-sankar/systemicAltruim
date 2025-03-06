import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaPlayCircle } from "react-icons/fa";

function VideoSection() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 50 });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-16 md:space-y-24">
      {/* YouTube Video Section */}
      <div
        data-aos="fade-up"
        className="group relative bg-gradient-to-br from-[#0d0a1a] to-[#1a132b] rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300"
      >
        <div className="p-6 md:p-8 text-center">
          <div className="mb-6 md:mb-8">
            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">
              Work Smart, Win Big
            </h3>
            <p className="mt-2 text-gray-300 text-sm md:text-base">
              Pro Tips from Swapnil Sharma, CTO of Ovadrive (Startupathon
              Success Story)
            </p>
          </div>

          <div className="aspect-video relative rounded-xl overflow-hidden border border-white/10 bg-black">
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <FaPlayCircle className="text-white text-5xl opacity-70" />
            </div>
            <iframe
              src="https://www.youtube.com/embed/pn_HoowYNTQ"
              title="Work Smart, Win Big"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Loom Video Section */}
      <div
        data-aos="fade-up"
        data-aos-delay="200"
        className="group relative bg-gradient-to-br from-[#0d0a1a] to-[#1a132b] rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300"
      >
        <div className="p-6 md:p-8 text-center">
          <div className="mb-6 md:mb-8">
            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">
              Transparent Hiring Journey
            </h3>
            <p className="mt-2 text-gray-300 text-sm md:text-base">
              Candidate-Centric Process Revealed Through Real Stories
            </p>
          </div>

          <div className="aspect-video relative rounded-xl overflow-hidden border border-white/10 bg-black">
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <FaPlayCircle className="text-white text-5xl opacity-70" />
            </div>
            <iframe
              src="https://www.loom.com/embed/0847b9257f144fd0830a8536dfbc8e81?sid=f726d7c3-062a-4580-994a-0bac66861d95"
              title="Our Hiring Process"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Animated Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
    </div>
  );
}

export default VideoSection;
