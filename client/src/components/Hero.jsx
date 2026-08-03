import { motion } from "framer-motion";

const Hero = ({ onBookClick = () => {} }) => {
  return (
    <section
      className="relative min-h-[80vh] flex items-center bg-no-repeat"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.55)), url('/images/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center top 15%",
      }}
    >
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >

          {/* Badge */}

          <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/30 text-orange-200 px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm">
            🙏 Trusted by Devotees Across India
          </div>

          {/* Heading */}

          <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.15]">
            Book{" "}
            <span className="text-orange-400">
              Verified Pandits
            </span>
            <br />
            For Every{" "}
            <span className="text-orange-400">
              Sacred Occasion
            </span>
          </h1>

          {/* Description */}

          <p className="mt-4 text-sm md:text-base text-gray-200 leading-relaxed max-w-xl opacity-90">
            Book experienced and verified pandits for Home Puja,
            Temple Puja and Online Puja anywhere in India.
            Enjoy secure booking, transparent pricing,
            and instant confirmation.
          </p>

          {/* Buttons */}

          <div className="mt-8 flex flex-wrap gap-4">

            <button
              onClick={onBookClick}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3.5 rounded-xl font-bold text-sm transition shadow-md shadow-orange-600/20 active:scale-[0.98]"
            >
              Book Puja
            </button>

            <button
              onClick={onBookClick}
              className="border border-white/70 text-white hover:bg-white hover:text-black px-6 py-3.5 rounded-xl font-bold text-sm transition backdrop-blur-sm active:scale-[0.98]"
            >
              Find Pandit
            </button>

          </div>

          {/* Stats */}

          <div className="mt-12 flex flex-wrap gap-8 border-t border-white/10 pt-6 max-w-md">

            <div>
              <h3 className="text-2xl font-bold text-orange-400">
                500+
              </h3>
              <p className="text-xs text-gray-300 mt-1">
                Verified Pandits
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-orange-400">
                10K+
              </h3>
              <p className="text-xs text-gray-300 mt-1">
                Happy Devotees
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-orange-400">
                50+
              </h3>
              <p className="text-xs text-gray-300 mt-1">
                Cities Covered
              </p>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default Hero;