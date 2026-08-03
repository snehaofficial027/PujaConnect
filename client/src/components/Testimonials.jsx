import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya Shah",
    city: "Ahmedabad",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    review:
      "Excellent service! The pandit arrived on time and performed the Satyanarayan Puja beautifully. Highly recommended.",
  },
  {
    id: 2,
    name: "Rahul Mehta",
    city: "Surat",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    review:
      "Very professional and knowledgeable. Booking process was simple and everything was managed perfectly.",
  },
  {
    id: 3,
    name: "Neha Patel",
    city: "Vadodara",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    review:
      "Amazing experience with PujaConnect. The pandit explained every ritual in detail. Will definitely book again.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-orange-50">

      <div className="w-full max-w-8xl mx-auto px-6 lg:px-8">

        <div className="text-center mb-16">

          <span className="text-orange-600 font-bold uppercase tracking-wider">
            Testimonials
          </span>

          <h2 className="text-4xl md:text-5xl font-black mt-3 text-gray-900">
            What Our Devotees Say
          </h2>

          <p className="text-gray-500 mt-5 max-w-8xl mx-auto">
            Thousands of families trust PujaConnect for authentic
            Vedic rituals performed by verified and experienced pandits.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">

          {testimonials.map((item) => (

            <div
              key={item.id}
              className="w-full max-w-sm bg-white rounded-3xl shadow-lg p-8 hover:-translate-y-2 hover:shadow-2xl transition duration-300"
            >

              <div className="flex items-center gap-4">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-orange-100"
                />

                <div>

                  <h3 className="font-bold text-lg">
                    {item.name}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    {item.city}
                  </p>

                </div>

              </div>

              <div className="flex gap-1 mt-5">

                {[...Array(item.rating)].map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    fill="#f59e0b"
                    color="#f59e0b"
                  />
                ))}

              </div>

              <p className="text-gray-600 leading-7 mt-5">
                "{item.review}"
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Testimonials;