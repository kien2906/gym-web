import { useParams, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getTrainersId } from "../services/apiTrainer";

function TrainersDetail() {
  const { id } = useParams();
  const [trainer, setTrainer] = useState(null);

  useEffect(() => {
    const fetchTrainer = async () => {
      const data = await getTrainersId(id);
      setTrainer(data);
    };
    fetchTrainer();
  }, [id]);

  if (!trainer) {
    return <div className="px-6 py-20 text-center text-gray-600">Loading...</div>;
  }

  const description = `Professional ${trainer.specialty || "trainer"} with ${trainer.experience || "years of experience"} dedicated to helping clients build strength, confidence, and healthy habits.`;

  return (
    <div className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Link to="/trainers" className="mb-8 inline-flex items-center gap-2 text-teal-500 hover:underline">
          <FaArrowLeft />
          Back to Trainers
        </Link>

        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <img
                src={trainer.image}
                alt={trainer.name}
                className="h-[420px] w-full rounded-2xl object-cover"
              />
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-500">
                Trainer Profile
              </p>
              <h1 className="mt-3 text-4xl font-bold text-gray-800">{trainer.name}</h1>
              <p className="mt-3 text-lg font-semibold text-teal-500">{trainer.specialty}</p>
              <p className="mt-2 text-gray-600">{trainer.experience}</p>
              <p className="mt-5 text-lg leading-8 text-gray-600">{description}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-teal-100 px-4 py-2 text-sm font-medium text-teal-700">
                  Personalized coaching
                </span>
                <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                  Flexible training plans
                </span>
                <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700">
                  Motivation & support
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainersDetail;