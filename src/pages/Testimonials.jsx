import { useEffect, useState } from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import getReviews from "../services/apiReview";

function Testimonials() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [reviews, setReviews] = useState([]);
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(0);
  useEffect(() => {
    const fetchReviews = async () => {
      const data = await getReviews();
      setReviews(data);
    };

    fetchReviews();
  }, []);
  console.log(reviews);
  return (
    <div className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-500">
            Testimonials
          </p>
          <h2 className="mt-3 text-3xl font-bold text-gray-800 sm:text-4xl">
            What Our Members Say
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
            Real stories from people who found confidence, energy, and community
            through our gym.
          </p>
        </div>

        <form className="mb-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
          <h3 className="mb-4 text-2xl font-bold text-gray-800">
            Leave your review
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="rounded-lg border border-gray-300 p-3 outline-none focus:border-teal-500"
            />
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Your role"
              className="rounded-lg border border-gray-300 p-3 outline-none focus:border-teal-500"
              readOnly
              disabled={true}
            />
          </div>
          <textarea
            placeholder="Write your comment..."
            rows="4"
            className="mt-4 w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-teal-500"
          />
          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <span
                key={index}
                className={`cursor-pointer  text-2xl transition-all duration-200 hover:scale-110 ${
                  index < (hover || rating) ? "text-teal-400" : "text-gray-300"
                }`}
                onMouseEnter={() => setHover(index + 1)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(index + 1)}
            
              >
                <FaStar />
              </span>
            ))}
          </div>
          <button
            type="submit"
            className="mt-4 rounded-lg bg-teal-500 px-5 py-3 font-semibold text-white transition hover:bg-teal-600"
          >
            Submit Review
          </button>
        </form>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {reviews.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 bg-white p-8 shadow-md transition duration-300 hover:-translate-y-2"
            >
              <div className="flex gap-2 text-teal-400 duration-300  hover:scale-100">
                {Array.from({ length: item.rating }).map((_, index) => (
                  <span key={index}>
                    <FaStar />
                  </span>
                ))}
              </div>

              <div className="mt-6 text-gray-600">
                <FaQuoteLeft className="mb-4 text-3xl text-teal-500" />
                <p>{item.comment}</p>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
