import React, { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import VideoSection from "./VideoSection";

const GuideStep = ({ title, description, side = "left", index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ delay: index * 0.2 }}
      className={`relative w-full my-12 lg:my-16 ${
        side === "left" ? "pr-0 lg:pr-12" : "pl-0 lg:pl-12"
      }`}
    >
      {/* Timeline Connector */}
      <div className="hidden lg:block absolute top-8 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-purple-600 to-transparent" />

      <div className="relative group">
        {/* Animated Dot */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 lg:left-0 lg:translate-x-0 w-4 h-4 bg-purple-600 rounded-full z-10 shadow-glow-purple" />

        {/* Content Card */}
        <div
          className={`mt-8 lg:mt-0 p-6 lg:p-8 bg-gradient-to-br from-[#1a132b] to-[#0d0a1a] border border-white/10 rounded-2xl shadow-2xl transition-all duration-300
            ${
              side === "left"
                ? "lg:float-left lg:-ml-2 lg:hover:-translate-x-2"
                : "lg:float-right lg:-mr-2 lg:hover:translate-x-2"
            }
            hover:border-purple-500/50 hover:shadow-glow-purple`}
        >
          <h3 className="text-xl font-bold bg-gradient-to-r from-purple-300 to-indigo-200 bg-clip-text text-transparent mb-4">
            {title}
          </h3>
          <p className="text-gray-300 leading-relaxed text-sm md:text-base">
            {description}
          </p>

          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-purple-500/30 rounded-tr-2xl" />
        </div>
      </div>
    </motion.div>
  );
};

function GuideSection() {
  const location = useLocation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-100px" });

  useEffect(() => {
    if (location.pathname === "/guide" && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0d0a1a] text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16 lg:mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent mb-4">
            Found Your Perfect Project Match?
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            Master the Startupathon Journey with Our Step-by-Step Success
            Blueprint
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative lg:mx-32 xl:mx-48">
          {/* Center Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 w-0.5 h-full bg-gradient-to-b from-purple-600/30 to-transparent" />

          {/* Steps */}
          {[
            {
              title: "Spark Your Vision",
              description:
                "Craft a compelling startup concept that showcases your unique value proposition. Pro Tip: Perfect your 30-second elevator pitch to captivate attention immediately.",
              side: "left",
            },
            {
              title: "Build & Impress",
              description:
                "Develop a functional prototype demonstrating your technical approach. Submit before deadline for expert evaluation against other innovative solutions.",
              side: "right",
            },
            {
              title: "Grow Through Feedback",
              description:
                "Receive detailed evaluation within 72 hours. Successful candidates progress immediately, while others get actionable insights for improvement.",
              side: "left",
            },
            {
              title: "Claim Leadership",
              description:
                "Successful completion grants project leadership with 2% equity stake, competitive salary, and full operational control to scale your vision.",
              side: "right",
            },
          ].map((step, index) => (
            <GuideStep
              key={index}
              index={index}
              title={step.title}
              description={step.description}
              side={step.side}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24"
        >
          <VideoSection />
        </motion.div>
      </div>
    </section>
  );
}

export default GuideSection;
