import React, { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaArrowRight,
} from "react-icons/fa";
import { motion } from "framer-motion";

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribeMsg, setSubscribeMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSubscribeMsg("");
    setError("");
    try {
      const response = await fetch("http://localhost:5000/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setSubscribeMsg("Thank you for subscribing!");
        setEmail("");
      } else {
        const data = await response.json();
        setError(data.message || "Subscription failed");
      }
    } catch (err) {
      setError("Subscription failed");
    }
  };

  return (
    <footer className="bg-[#0d0a1a] text-white border-t border-white/10">
      {/* Subscription Banner */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-2xl p-8 md:p-12 shadow-xl">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">
              Stay Ahead in the Startup Game
            </h3>
            <p className="text-gray-300 text-lg mb-6">
              Get exclusive access to new projects, founder insights, and
              strategic updates delivered weekly.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <div className="flex-1 relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 outline-none transition-all placeholder:text-gray-400"
                  required
                />
              </div>
              <button
                type="submit"
                className="group flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 font-medium transition-all hover:shadow-lg hover:shadow-purple-500/20"
              >
                Subscribe
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            {subscribeMsg && (
              <p className="mt-4 text-green-400 flex items-center justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                {subscribeMsg}
              </p>
            )}
            {error && (
              <p className="mt-4 text-red-400 flex items-center justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="https://cdn.prod.website-files.com/623ae64112adcf772da9687e/678a14a9d3a398bc1e9633b3_Persist%20Startupathon%20White.svg"
                alt="Persist Ventures Logo"
                className="w-12 h-12 object-contain"
              />
              <div className="font-bold text-xl leading-tight">
                PERSIST
                <br />
                VENTURES
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Empowering entrepreneurs with strategic partnerships and
              full-spectrum expertise to scale visionary ideas.
            </p>
            <div className="flex items-center gap-4 text-gray-400">
              {[
                { icon: FaFacebookF, label: "Facebook" },
                { icon: FaTwitter, label: "Twitter" },
                { icon: FaLinkedinIn, label: "LinkedIn" },
                { icon: FaInstagram, label: "Instagram" },
              ].map(({ icon: Icon, label }, index) => (
                <motion.a
                  key={label}
                  href="#"
                  aria-label={label}
                  whileHover={{ scale: 1.1 }}
                  className="hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                >
                  <Icon className="text-xl" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links Columns */}
          {[
            {
              title: "Quick Links",
              links: [
                "Home",
                "Investor Application",
                "Job Application",
                "FAQ & Accelerator",
                "Our Team",
              ],
            },
            {
              title: "Legal",
              links: [
                "Privacy Policy",
                "Terms of Service",
                "Intellectual Property",
              ],
            },
            {
              title: "Contact",
              links: [
                "Support Center",
                "Partner Inquiry",
                "Press Relations",
                "Careers",
              ],
            },
          ].map((section, index) => (
            <div key={section.title} className="space-y-4">
              <h5 className="text-lg font-semibold text-gray-100">
                {section.title}
              </h5>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-purple-400 transition-colors text-sm flex items-center gap-2 group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} Persist Ventures. All rights reserved.
            <br className="md:hidden" /> Crafted with innovation in Silicon
            Valley.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
