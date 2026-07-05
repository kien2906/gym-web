import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
// import team1 from "../assets/team1.jpg";
// import team2 from "../assets/team2.jpg";
// import team3 from "../assets/team3.jpg";
import { useEffect, useState } from "react";
import getTrainers from "../services/apiTrainer";
import { Link }from "react-router-dom";

function Trainers() {
  const [trainers, setTrainers] = useState([]);
  useEffect(() => {
    const fetchTrainers = async () => {
      const data = await getTrainers();
      setTrainers(data);
    };

    fetchTrainers();
  }, []);
  console.log(trainers);
  return (
    <div>
      <section className="bg-gray-700 py-20 text-center text-white">
        <div className="flex items-center justify-center gap-3 text-lg">
          <span className="font-semibold text-teal-400">Home</span>
          <span>{">"}</span>
          <span className="font-semibold">Trainers</span>
        </div>
        <h1 className="mt-6 text-4xl font-bold sm:text-5xl">
          Meet Our Expert Trainers
        </h1>
        <p className="mx-auto mt-4 max-w-2xl px-4 text-lg text-gray-200">
          Passionate coaches ready to guide you through every workout with
          energy, expertise, and care.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-500">
            Our Team
          </p>
          <h2 className="mt-3 text-3xl font-bold text-gray-800 sm:text-4xl">
            Train with the best
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-500">
            Whether you want to build strength, improve flexibility, or boost
            endurance, our trainers have the perfect program for you.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {trainers.map((trainer) => (
            <Link
              to={`/trainers/${trainer.id}`}
              key={trainer.name}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition duration-300 hover:-translate-y-5"
          
            >
              <img
                src={trainer.image}
                alt={trainer.name}
                className="h-80 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  {trainer.name}
                </h3>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-teal-500">
                  {trainer.specialty}
                </p>
                <p className="mt-4 text-gray-600">
                  Experience: {trainer.experience}
                </p>

                <div className="mt-6 flex gap-3">
                  <a
                    href="#"
                    className="rounded-full bg-gray-100 p-3 text-gray-700 transition hover:bg-teal-500 hover:text-white"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href="#"
                    className="rounded-full bg-gray-100 p-3 text-gray-700 transition hover:bg-teal-500 hover:text-white"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="#"
                    className="rounded-full bg-gray-100 p-3 text-gray-700 transition hover:bg-teal-500 hover:text-white"
                  >
                    <FaTwitter />
                  </a>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-3  rounded-2xl bg-white p-8 shadow-md md:grid-cols-3">
            <div>
              <h3 className="text-3xl font-bold text-gray-800">24/7</h3>
              <p className="mt-2 text-gray-600">
                Flexible support and guidance for your goals.
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-800">100+</h3>
              <p className="mt-2 text-gray-600">
                Workout programs designed for every level.
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-800">4.9/5</h3>
              <p className="mt-2 text-gray-600">
                Member satisfaction from our coaching team.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Trainers;
