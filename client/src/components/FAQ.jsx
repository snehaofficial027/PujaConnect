import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How do I book a Pandit?",
    answer:
      "Browse available pandits or pujas, choose your preferred option, select the date and time, and confirm your booking in just a few clicks.",
  },
  {
    question: "Can I book an Online Puja?",
    answer:
      "Yes. PujaConnect offers both Home Puja and Online Puja through video call with experienced Vedic pandits.",
  },
  {
    question: "Are all pandits verified?",
    answer:
      "Yes. Every pandit goes through identity verification and profile approval before becoming available for bookings.",
  },
  {
    question: "Can I cancel or reschedule my booking?",
    answer:
      "Yes. You can cancel or reschedule according to our cancellation policy before the scheduled puja time.",
  },
  {
    question: "Which payment methods are supported?",
    answer:
      "You can pay securely using UPI, Debit/Credit Cards, Net Banking and Wallets.",
  },
  {
    question: "How will I receive booking confirmation?",
    answer:
      "You'll receive instant confirmation on the website, email, and SMS after your booking is successfully completed.",
  },
];

const FAQ = () => {
  const [active, setActive] = useState(null);

  return (
    <section className="py-24 bg-gray-50 flex justify-center w-full">
      {/* Max width set to 3xl for perfectly centered & clean width */}
      <div className="max-w-3xl mx-auto px-6 w-full">

        <div className="text-center mb-14">
          <span className="uppercase tracking-widest text-orange-600 font-bold text-sm">
            FAQ
          </span>

          <h2 className="text-3xl md:text-4xl font-black mt-3 text-gray-900">
            Frequently Asked Questions
          </h2>

          <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm md:text-base">
            Everything you need to know before booking your Puja with
            PujaConnect.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all"
            >
              <button
                onClick={() =>
                  setActive(active === index ? null : index)
                }
                className="w-full flex justify-between items-center p-5 text-left font-bold text-gray-800 hover:bg-gray-50 transition"
              >
                <h3 className="font-bold text-base md:text-lg pr-4">
                  {faq.question}
                </h3>

                {active === index ? (
                  <Minus className="text-orange-600 shrink-0" size={20} />
                ) : (
                  <Plus className="text-orange-600 shrink-0" size={20} />
                )}
              </button>

              {active === index && (
                <div className="px-5 pb-5 text-gray-600 leading-relaxed text-sm border-t border-gray-100 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;