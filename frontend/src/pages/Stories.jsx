import peony from '../assets/images/peony.mp4';
import FeedbackForm from '../components/FeedbackForm';
import Lottie from "lottie-react";
import feedbackFlower from "../assets/images/feedbackFlower.json";

export default function Stories() {
  return (
    <div className="min-h-screen bg-[#faf7f5]">

      {/* HERO VIDEO */}
      <section className="relative h-screen overflow-hidden">

        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute w-full h-full object-cover"
        >
          <source src={peony} type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/10"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">

          <p className="uppercase tracking-[0.4em] text-sm mb-4">
            bloom Stories
          </p>

          <br /><br /><br /><br /><br /><br /><br /><br />

          <p className="max-w-2xl text-lg md:text-xl text-gray-200 leading-relaxed">
            A cinematic floral collection inspired by delicate peonies,
            soft romance, and timeless elegance.
          </p>

        </div>

      </section>

      {/* lottie animation */}

      <div className="flex justify-center mb-6">
        <div className="w-56">
          <Lottie animationData={feedbackFlower} loop={true} />
        </div>
      </div>




      {/* FEEDBACK SECTION */}
      <section className="py-24 px-6 md:px-20 bg-white">

        <div className="text-center mb-12">

          <p className="uppercase tracking-[0.3em] text-xs text-gray-400 mb-3">
            bloom Experience
          </p>

          <h2 className="text-5xl font-extralight text-gray-900 mb-4">
            Share Your Thoughts
          </h2>

          <p className="text-gray-500 max-w-2xl mx-auto">
            Tell us what you loved about our floral collections,
            gifting experience, and handcrafted bouquets.
          </p>

        </div>

        <FeedbackForm />

      </section>

    </div>

  )
}