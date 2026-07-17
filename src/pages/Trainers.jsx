import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetTrainersQuery } from "../feature/trainersApi";
import Breadcrumb from "../components/Breadcrumb";

function Trainers() {
  const { data, isLoading, error } = useGetTrainersQuery();
  console.log(data?.trainers);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-800 font-sans antialiased pb-20 mt-16 md:mt-20">
      <Breadcrumb name="Trainers" />
      {/* 2. INTRO & GRID TRAINERS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 ">
        <div className="mb-16 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-teal-700">
            Our Professional Team
          </span>
          <h2 className="mt-3 text-2xl md:text-3.5xl font-bold text-slate-900 tracking-tight">
            Train with the absolute best
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm md:text-base text-slate-500 font-light leading-relaxed">
            Whether you want to build core strength, master complex development
            architectures, or boost daily productivity, our elite mentors are
            ready to support you.
          </p>
        </div>

        {/* LOADING & ERROR STATES */}
        {isLoading && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse bg-white border border-slate-200/60 p-4 space-y-4 rounded-sm"
              >
                <div className="bg-slate-200 h-80 w-full rounded-sm" />
                <div className="h-6 bg-slate-200 w-2/3 rounded-sm" />
                <div className="h-4 bg-slate-200 w-1/2 rounded-sm" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-sm text-rose-600 font-medium">
              Không thể tải danh sách huấn luyện viên lúc này. Vui lòng thử lại
              sau.
            </p>
          </div>
        )}

        {/* TRAINER LIST GRID */}
        {!isLoading && !error && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {data?.trainers?.map((trainer) => (
              <Link
                to={`/trainers/${trainer._id}`}
                key={trainer._id || trainer.name}
                className="group flex flex-col bg-white border border-slate-200/60 hover:border-slate-300 transition-all duration-200 rounded-sm overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.01)]"
              >
                {/* Trainer Profile Photo */}
                <div className="relative aspect-[3/4] w-full bg-slate-900 overflow-hidden border-b border-slate-100">
                  <img
                   src={`http://localhost:3001/uploads/${trainer?.avatar}`}
                    alt={trainer.name}
                    className="w-full h-full object-cover opacity-90 transition-transform duration-300 group-hover:scale-[1.02]"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                </div>

                {/* Trainer Info Details */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
                    {trainer.name}
                  </h3>

                  <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-teal-700">
                    {trainer.specialty}
                  </p>

                  <p className="mt-3 text-xs text-slate-500 font-light leading-relaxed flex-1">
                    Kinh nghiệm thực chiến:{" "}
                    <span className="font-medium text-slate-700">
                      {trainer.experience} years
                    </span>
                  </p>

                  {/* Social Media Integration */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex gap-2.5">
                    <a
                      href="#"
                      onClick={(e) => e.stopPropagation()} // Ngăn chặn sự kiện click chuyển trang của thẻ Link cha
                      className="w-8 h-8 rounded-sm bg-slate-50 hover:bg-teal-700 text-slate-500 hover:text-white flex items-center justify-center text-xs transition-colors duration-150 border border-slate-100"
                      aria-label="Facebook Link"
                    >
                      <FaFacebookF size={12} />
                    </a>
                    <a
                      href="#"
                      onClick={(e) => e.stopPropagation()}
                      className="w-8 h-8 rounded-sm bg-slate-50 hover:bg-teal-700 text-slate-500 hover:text-white flex items-center justify-center text-xs transition-colors duration-150 border border-slate-100"
                      aria-label="Instagram Link"
                    >
                      <FaInstagram size={12} />
                    </a>
                    <a
                      href="#"
                      onClick={(e) => e.stopPropagation()}
                      className="w-8 h-8 rounded-sm bg-slate-50 hover:bg-teal-700 text-slate-500 hover:text-white flex items-center justify-center text-xs transition-colors duration-150 border border-slate-100"
                      aria-label="Twitter Link"
                    >
                      <FaTwitter size={12} />
                    </a>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* 3. KEY STATS SECTION - MODERN ROW DESIGN */}
      <section className="border-t border-slate-200/60 bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-150 text-center md:text-left">
            {/* Stat 1 */}
            <div className="md:px-8 py-4 md:py-0">
              <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                24/7 Support
              </h3>
              <p className="mt-2 text-xs md:text-sm text-slate-500 font-light leading-relaxed">
                Flexible support and guidance for your personal development
                goals at any hour.
              </p>
            </div>

            {/* Stat 2 */}
            <div className="md:px-8 py-6 md:py-0">
              <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                100+ Curated Programs
              </h3>
              <p className="mt-2 text-xs md:text-sm text-slate-500 font-light leading-relaxed">
                Workout and technical programs specifically designed for every
                skill level.
              </p>
            </div>

            {/* Stat 3 */}
            <div className="md:px-8 py-4 md:py-0">
              <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                4.9/5 Rating
              </h3>
              <p className="mt-2 text-xs md:text-sm text-slate-500 font-light leading-relaxed">
                Sustained member satisfaction guaranteed by our dedicated
                coaching team.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Trainers;
