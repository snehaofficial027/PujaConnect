import {
  Search,
  UserCheck,
  CalendarDays,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Choose Your Puja",
    description:
      "Browse from a wide range of Vedic rituals and select the puja that suits your spiritual needs.",
  },
  {
    icon: UserCheck,
    title: "Select Verified Pandit",
    description:
      "Compare experienced pandits by language, experience, city and ratings before booking.",
  },
  {
    icon: CalendarDays,
    title: "Pick Date & Time",
    description:
      "Choose your preferred date, time and location for a smooth booking experience.",
  },
  {
    icon: BadgeCheck,
    title: "Confirm Booking",
    description:
      "Complete your booking securely and receive instant confirmation with all details.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-white">

      <div className="w-full max-w-7xl mx-auto px-6 text-center">

        <div className="text-center mb-16">

          <span className="text-orange-600 uppercase font-bold tracking-widest">
            How It Works
          </span>

          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4">
            Book Your Puja In 4 Easy Steps
          </h2>

          <p className="text-gray-500 max-w-11xl mx-auto mt-5 leading-8">
            PujaConnect makes booking experienced and verified pandits
            simple, transparent and completely hassle-free.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center">

          {steps.map((step, index) => {

            const Icon = step.icon;

            return (

              <div
                key={index}
                className="relative w-full max-w-sm bg-white rounded-3xl border shadow-md p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition duration-300"
              >

                <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mx-auto">

                  <Icon
                    size={36}
                    className="text-orange-600"
                  />

                </div>

                <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-orange-600 text-white font-bold flex items-center justify-center">
                  {index + 1}
                </div>

                <h3 className="text-2xl font-black mt-6">
                  {step.title}
                </h3>

                <p className="text-gray-500 leading-7 mt-4">
                  {step.description}
                </p>

                {index !== steps.length - 1 && (
                  <ArrowRight
                    size={28}
                    className="hidden lg:block absolute -right-8 top-1/2 -translate-y-1/2 text-orange-400"
                  />
                )}

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
};

export default HowItWorks;