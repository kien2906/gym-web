import backgroundAvif from "../assets/background.avif";

import { FaVideo, FaBars, FaPen, FaUsers } from "react-icons/fa";
import home2 from "../assets/anhhome.jpg";
import home4 from "../assets/anhhome4.jpg";
import home6_1 from "../assets/home6_1.jpg";
import home6_2 from "../assets/home6_2.jpg";
import home6_3 from "../assets/home6_3.jpg";
import { useEffect, useState, useContext } from "react";

import reviews from "../data.js";
import { Link } from "react-router-dom";
import { Theme } from "../context/ThemeContext.jsx";
import InputCommon from "../components/InputCommon.jsx";
// const { darkMode, handleDarkMode } = useContext(Theme);
const Home = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${backgroundAvif})`,
        }}
        className="h-screen w-full bg-cover bg-center flex justify-between items-center gap-7 px-60 fade-up"
      >
        <div className="flex flex-col items-start gap-5 text-white">
          <h1 className="text-5xl pb-7 font-bold w-[500px]">
            Workout videos for every fitness level. Absolutely free.
          </h1>
          <p>Earn your workout complete</p>
          <div className="flex gap-5 mt-10">
            <button className="bg-white p-5 text-teal-400 hover:text-black font-bold rounded-lg duration-300  hover:bg-teal-400">
              Get Started
            </button>
            <button className="bg-teal-400 text-white p-5 rounded-md font-bold hover:bg-white hover:text-teal-400 duration-300">
              Read More
            </button>
          </div>
        </div>

        <div className="bg-white w-100 p-8 rounded-md flex flex-col items-start fade-up">
          <h5 className={`text-xl font-bold pb-5`}>
            Work Out At Home For Free.
          </h5>

          <form className="flex w-full flex-col items-center gap-3">
            <InputCommon
              props={{
                type: "text",
                placeholder: "User name",
                classname: "w-full rounded-md border p-3 outline-none",
              }}
            />
            <InputCommon
              props={{
                type: "email",
                placeholder: "User Email",
                classname: "w-full rounded-md border p-3 outline-none",
              }}
            />

            <InputCommon
              props={{
                type: "password",
                placeholder: "User Password",
                classname: "w-full rounded-md border p-3 outline-none",
              }}
            />
          </form>

          <div className="flex gap-1 py-3">
            <input type="checkbox" />
            <p className="text-gray-500">I Accept Terms & Conditions</p>
          </div>

          <button className="bg-teal-400 p-3 rounded-md w-full hover:bg-teal-700 font-bold text-white duration-300">
            Join Now
          </button>
        </div>
      </div>

      <Home1 />
      <Home2 />
      <Home3 />
      <Home4 />
      <Home5 />
      <Home6 />
      <Home7 />
      <Home8 />
    </>
  );
};

const Home1 = () => {
  const { darkMode } = useContext(Theme);
  return (
    <>
      <div
        className={`flex justify-center items-center py-20 gap-5  ${darkMode ? "bg-black text-white" : "bg-white"} fade-Up`}
      >
        <div className="border px-8 py-5 flex flex-col items-start rounded-md hover:bg-[#011627] group">
          <h2 className=" text-black font-bold text-xl py-2 group-hover:text-white">
            Workout Videos
          </h2>
          <span className="rounded-full bg-teal-400 p-5 my-3">
            {" "}
            <FaVideo className="text-white text-2xl" />{" "}
          </span>
          <p className="py-2 group-hover:text-white   text-gray-500">
            Access to hundreds of free <br /> workout videos.
          </p>
        </div>
        <div className="border px-8 py-5 flex flex-col items-start rounded-md group hover:bg-[#011627]">
          <h2 className="font-bold text-xl py-2  group-hover:text-white">
            Workout Programs
          </h2>
          <span className="rounded-full bg-teal-400 p-5 my-3">
            {" "}
            <FaBars className="text-white text-2xl" />
          </span>
          <p className="py-2  text-gray-500  group-hover:text-white ">
            Affordable and effective <br /> workout programs.
          </p>
        </div>
        <div className="border px-8 py-5 flex flex-col items-start rounded-md hover:bg-[#011627] group">
          <h2 className="font-bold text-xl py-2  group-hover:text-white">
            Meal Plans
          </h2>
          <span className="rounded-full bg-teal-400 p-5 my-3  group-hover:text-white">
            {" "}
            <FaPen className="text-white text-2xl" />
          </span>
          <p className="py-2  text-gray-500  group-hover:text-white">
            Plans built with registered <br /> nutritionists.
          </p>
        </div>
        <div className="border px-8 py-5 flex flex-col items-start rounded-md  hover:bg-[#011627] group">
          <h2 className="font-bold text-xl py-2  group-hover:text-white">
            Free Membership
          </h2>
          <span className="rounded-full bg-teal-400 p-5 my-3">
            <FaUsers className="text-white text-2xl" />
          </span>
          <p className="py-2  text-gray-500  group-hover:text-white">
            Add powerful features to <br /> your membership.
          </p>
        </div>
      </div>
    </>
  );
};

const Home2 = () => {
  const { darkMode } = useContext(Theme);
  return (
    <>
      <div
        className={`w-full flex items-stretch gap-8 py-16 px-60
      ${darkMode ? "bg-black text-white shadow-[0_-15px_30px_rgba(255,255,255,0.1),0_15px_30px_rgba(255,255,255,0.1),0_0_50px_rgba(255,255,255,0.08)]" : "bg-white text-black"}`}
      >
        <div className="w-1/2">
          <img src={home2} alt="Home2" className="object-cover rounded-md" />
        </div>

        <div className="w-1/2 flex flex-col items-start justify-center">
          <h2 className="text-4xl font-bold  max-w-md">
            Get more with low-cost training programs and advanced features.
          </h2>
          <p
            className={`text-gray-500 text-md leading-6 max-w-xl font-light my-5 w-125 ${darkMode ? "text-gray-200" : "text-gray-500"}`}
          >
            Lorem ipsum viverra feugiat. Pellen tesque libero ut justo, ultrices
            in ligula. Semper at tempufddfel. Lorem ipsum dolor sit amet elit.
            Non quae, fugiat nihil ad. Lorem ipsum dolor sit amet. Lorem ipsum
            init dolor sit, amet elit. Dolor ipsum non velit, culpa!
          </p>

          <div>
            <button className="bg-teal-400 text-white px-7 py-3 rounded-md outline-0 hover:bg-teal-600 font-bold text-sm">
              Read More
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const Home3 = () => {
  const { darkMode } = useContext(Theme);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount1((pre) => (pre >= 35 ? 35 : pre + 1));
      setCount2((pre) => (pre >= 500 ? 500 : pre + 10));
      setCount3((pre) => (pre >= 26 ? 26 : pre + 1));
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`flex flex-col items-center px-30 py-20  ${darkMode ? "bg-black text-white" : "bg-white "}`}
    >
      <div className="flex flex-col items-center justify-between mb-10">
        <h6 className="text-[#7e7d7d] text-sm font-bold">About Prowess Lift</h6>
        <h2 className="font-bold text-4xl">Everything about Success</h2>
      </div>

      <div className="flex justify-between gap-5 ">
        <div className="flex flex-col items-center w-[400px] text-center gap-5 leading-8">
          <h2 className="text-5xl font-bold  hover:scale-150 transition-all  duration-500">
            {count1}+
          </h2>
          <p className="text-gray-500 text-xl ">
            35+ million workout Programs completed each month by our amazing
            Prowess Lift Family.
          </p>
        </div>
        <div className="flex flex-col items-center w-[350px]  text-center gap-5 leading-8">
          <h2 className="text-5xl font-bold hover:scale-150 transition-all  duration-500">
            {count2}+
          </h2>
          <p className="text-gray-500 text-xl">
            500+ Free workout videos for every fitness level + effective &
            affordable workout programs.
          </p>
        </div>

        <div className="flex flex-col items-center w-[350px] leading-8 text-center gap-5">
          <h2 className="text-5xl font-bold hover:scale-150 transition-all  duration-500">
            {count3}+
          </h2>
          <p className="text-gray-500 text-xl ">
            26+ years of combined experience helping people achieve their
            fitness & health goals.
          </p>
        </div>
      </div>
    </div>
  );
};
const Home4 = () => {
  const { darkMode } = useContext(Theme);
  return (
    <>
      <div
        className={`justify-center items-start gap-5 flex p-30 ${darkMode ? "bg-black text-white  shadow-[0_-15px_30px_rgba(255,255,255,0.1),0_15px_30px_rgba(255,255,255,0.1),0_0_50px_rgba(255,255,255,0.08)]" : "bg-white"}`}
      >
        <div className="flex flex-col justify-items-start items-start w-[550px]">
          <h2 className="font-bold text-4xl">
            Once you can control your mind, you can control your body.
          </h2>

          <p className="w-[520px] py-8 text-gray-500">
            Lorem ipsum viverra feugiat. Pellen tesque libero ut justo, ultrices
            in ligula. Semper at tempufddfel. Lorem ipsum dolor sit amet elit.
          </p>

          <div>
            <div className="w-[450px] py-3">
              <h2 className="font-bold text-md mb-3">Immune</h2>

              <div className="w-full h-1 bg-gray-200 rounded-full">
                <div className="w-[80%] h-1 bg-red-500 rounded-full"></div>
              </div>
            </div>

            <div className="w-[450px] py-3">
              <h2 className="font-bold text-md mb-3">Heart & Energy</h2>

              <div className="w-full bg-gray-200 h-1 rounded-full">
                <div className="w-[90%] h-1 bg-red-500 rounded-full"></div>
              </div>
            </div>

            <div className="w-[450px] py-3">
              <h2 className="font-bold text-md mb-3">Joints & Bones</h2>

              <div className="w-full bg-gray-200 rouded-full">
                <div className="w-[50%] h-1 bg-red-500 rounded-full"></div>
              </div>
            </div>

            <div className="w-[450px] py-3">
              <h2 className="font-bold text-md mb-3">Skin</h2>

              <div className="w-full bg-gray-200 rouded-full">
                <div className="w-[50%] h-1 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <img
            src={home4}
            alt="logo"
            className="w-[600px] object-cover rounded-xl"
          />
        </div>
      </div>
    </>
  );
};

const Home5 = () => {
  const { darkMode } = useContext(Theme);
  return (
    <>
      <div
        className={`flex flex-col items-center gap-5 p-20 h-full  ${darkMode ? "bg-black text-white w-full" : "bg-[#6c757d] text-white"} `}
      >
        <h2 className=" text-4xl font-bold text-center w-[800px] text-[#eee]">
          Everything you want is outside of your comfort zone.
        </h2>

        <p className="text-xl  text-center py-5 w-[800px] text-[#eee]">
          Lorem ipsum viverra feugiat. Pellen tesque libero ut justo, ultrices
          in ligula. Semper at tempufddfel. Lorem ipsum dolor sit amet elit.
        </p>

        <div className="flex gap-3">
          <button className="text-[#eee]  px-7 py-4  rounded-md bg-[white] text-teal-400 hover:text-black">
            Get started
          </button>
          <Link to="/contact">
            <button className="text-[#eee]  px-7 py-4  rounded-md  bg-teal-400 cursor-pointer">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

const Home6 = () => {
  const { darkMode } = useContext(Theme);
  return (
    <>
      <div
        className={`flex flex-col items-center p-30 ${darkMode ? "bg-black text-white   shadow-[0_-15px_30px_rgba(255,255,255,0.1),0_15px_30px_rgba(255,255,255,0.1),0_0_50px_rgba(255,255,255,0.08)]" : "bg-white"}`}
      >
        <div className="flex flex-col items-center gap-2 mb-10">
          <p className="text-sm font-bold text-gray-500"> Blog posts</p>
          <h2 className="text-4xl font-bold">Take Charge Of Your Life</h2>
        </div>

        <div className="flex gap-5 w-[1100px]  ">
          <div className="flex flex-col items-start gap-5 justify-center">
            <img src={home6_1} alt="" className="rounded-md object-cover" />
            <p className="text-gray-500">Aug 28, 2020.</p>

            <h3 className=" text-2xl font-bold hover:text-teal-400">
              One-Hour Workout
            </h3>

            <p className=" text-gray-500 text-md text-justify">
              Lorem ipsum viverra feugiat. Pellen tesque libero ut justo,
              ultrices in ligula. Semper at tempufddfel.
            </p>

            <div className="flex">
              {" "}
              <button className="font-bold">
                Read more <span className="text-teal-400 text-xl">→</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col items-start gap-5 ">
            <img src={home6_2} alt="" className="rounded-md  object-cover" />
            <p className="text-gray-500">Aug 28, 2020.</p>

            <h3 className=" text-2xl font-bold hover:text-teal-400">
              One-Hour Workout
            </h3>

            <p className="text-gray-500 text-md text-justify ">
              Lorem ipsum viverra feugiat. Pellen tesque libero ut justo,
              ultrices in ligula. Semper at tempufddfel.
            </p>

            <div className="flex">
              {" "}
              <button className="font-bold">
                Read more <span className="text-teal-400 text-xl">→</span>
              </button>
            </div>
          </div>
          <div className=" flex flex-col items-start gap-5 ">
            <img src={home6_3} alt="" className="rounded-md  object-cover" />
            <p className="text-gray-500">Aug 28, 2020.</p>

            <h3 className=" text-2xl font-bold hover:text-teal-400">
              One-Hour Workout
            </h3>

            <p className="text-gray-500 text-md  text-justify">
              Lorem ipsum viverra feugiat. Pellen tesque libero ut justo,
              ultrices in ligula. Semper at tempufddfel.
            </p>

            <div className="flex">
              {" "}
              <button className="font-bold">
                Read more <span className="text-teal-400 text-xl">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Home7 = () => {
  return (
    <>
      <div className="flex bg-teal-400 gap-5 justify-between items-center px-40 py-15 ">
        <h2 className="text-4xl font-bold">
          Ready to try a Prowess Lift workout?
        </h2>
        <button className="px-10 py-3 border rounded-md bg-white text-teal-400 font-bold  text-xl">
          Get Started Today
        </button>
      </div>
    </>
  );
};

const Home8 = () => {
  const { darkMode } = useContext(Theme);
  const [current, setCurrent] = useState(0);
  return (
    <div
      className={`flex flex-col items-center justify-center py-10 w-full ${darkMode ? "bg-black text-white" : "bg-white"}`}
    >
      <p className="text-gray-500 text-md font-bold">Testimonials</p>
      <h2 className="font-bold text-4xl py-2  ">What our Clients say</h2>
      <img
        src={reviews[current].image}
        className="w-40 h-40 rounded-full object-cover p-5"
        alt="logo"
      />
      <p className="text-gray-500 w-[1000px] text-center m-5 text-xl">
        {reviews[current].review}
      </p>
      <p className="font-bold">{reviews[current].name}</p>
      <p className="text-gray-400">Example Name</p>

      <div className="flex gap-3 mt-4 justify-center py-3">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              current === index ? "bg-teal-400" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Home;
export { Home7 };
