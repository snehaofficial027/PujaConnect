import {
  ShieldCheck,
  BadgeCheck,
  CreditCard,
  CalendarCheck,
  Headphones,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Pandits",
    desc: "All pandits undergo strict background checks before joining our sacred community.",
  },
  {
    icon: BadgeCheck,
    title: "Experienced Priests",
    desc: "Highly qualified and certified pandits well-versed in Vedic rituals.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    desc: "100% safe, encrypted, and transparent digital booking payments.",
  },
  {
    icon: CalendarCheck,
    title: "Instant Booking",
    desc: "Get immediate confirmation for your chosen auspicious dates in minutes.",
  },
  {
    icon: Globe,
    title: "Online & Temple Puja",
    desc: "Flexibility to choose between Home Puja, physical Temple Puja, or E-Puja.",
  },
  {
    icon: Headphones,
    title: "24×7 Support",
    desc: "Our dedicated support team is here to assist you at every step of your ritual.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="w-full bg-orange-50/40 py-20 flex justify-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">

        {/* Heading Section - Completely Centered */}
        <div className="w-full flex flex-col items-center justify-center text-center mb-16">
          <span className="inline-block text-orange-600 text-sm font-bold tracking-widest uppercase bg-orange-100/60 px-4 py-1.5 rounded-full mx-auto">
            Our Promise
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight block w-full text-center">
            Why Choose PujaConnect?
          </h2>
          <p className="mt-4 text-gray-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed block w-full text-center">
            We bridge the gap between ancient traditions and modern convenience, providing trusted spiritual services with absolute transparency.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full justify-center">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="bg-white rounded-2xl p-6 md:p-8 border border-orange-100/50 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-start text-left w-full"
              >
                {/* Modernized Icon Badge */}
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-5 border border-orange-100 shrink-0">
                  <Icon size={24} className="text-orange-600" />
                </div>

                <h3 className="text-lg font-bold text-gray-800 tracking-tight mb-2.5">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;