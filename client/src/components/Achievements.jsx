import {
  Users,
  UserCheck,
  CalendarCheck,
  MapPinned,
} from "lucide-react";

const stats = [
  {
    icon: CalendarCheck,
    number: "10,000+",
    title: "Successful Pujas",
  },
  {
    icon: UserCheck,
    number: "500+",
    title: "Verified Pandits",
  },
  {
    icon: Users,
    number: "25,000+",
    title: "Happy Families",
  },
  {
    icon: MapPinned,
    number: "50+",
    title: "Cities Covered",
  },
];

const Achievements = () => {
  return (
    <section className="w-full py-24 bg-gradient-to-r from-orange-600 to-orange-500">

      <div className="max-w-9xl mx-auto px-6">

        <div className="text-center text-white mb-16">

          <span className="uppercase tracking-widest font-semibold">
            Our Achievements
          </span>

          <h2 className="text-3xl md:text-5xl font-black mt-4">
            Trusted By Thousands Of Devotees
          </h2>

          <p className="mt-5 text-orange-100 max-w-8xl mx-auto">
            PujaConnect has successfully connected families with
            experienced and verified Vedic pandits across India.
          </p>

        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center border border-white/20 hover:-translate-y-2 transition duration-300"
              >

                <div className="w-20 h-20 rounded-full bg-white mx-auto flex items-center justify-center">

                  <Icon
                    size={38}
                    className="text-orange-600"
                  />

                </div>

                <h3 className="text-4xl font-black text-white mt-6">
                  {item.number}
                </h3>

                <p className="text-orange-100 mt-2 font-medium">
                  {item.title}
                </p>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
};

export default Achievements;