import {
  FaCogs, // Group Classes
  FaUsers, // Experienced Coaches
  FaPodcast, // CrossFit Classes
  FaBicycle, // Indoor Cycling
  FaDumbbell, // Quality Equipments
  FaHeartbeat, // Health Caring
  FaPlay,
} from "react-icons/fa";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import team1 from "../assets/team1.jpg";
import team2 from "../assets/team2.jpg";
import team3 from "../assets/team3.jpg";
import { Home7 } from "./Home";
import about1 from "../assets/about1.jpg";
import about2 from "../assets/about2.jpg";
import Breadcrumb from "../components/Breadcrumb";

const About = () => {
  return (
    <>
      <Breadcrumb name="About" />
      <About2 />
      <About3 />
      <About4 />
      <About5 />
      <About6 />
      <Home7 />
    </>
  );
};

const About2 = () => {
  return (
    <div className="max-w-7xl w-full mx-auto py-5">
      <div className="grid grid-cols-[35%_65%]">
        <div>
          <p className="uppercase text-gray-400 font-bold">ABOUT US</p>
          <h3 className="text-4xl font-bold max-w-[350px]">
            Created to help you live a better, happier, healthier life.
          </h3>
        </div>

        <div className="flex flex-col gap-2">
          <p className="uppercase text-gray-400 font-bold">Why choose us</p>
          <h3 className="text-4xl font-bold  max-w-[500px]">
            How to Keep Your Body Healthy in Over the festival
          </h3>
          <p className="text-[#696687] text-lg leading-7 my-5 text-pretty">
            Lorem ipsum dolor sit amet,Ea consequuntur illum facere aperiam
            sequi optio consectetur adipisicing.Nunc id ipsum fringilla, gravida
            felis vitae. lacinia id, sunt in culpa quis lacinia. Lorem ipsum
            dolor, sit amet init elit. Eos, debitis. Quas minima sunt natus
            tempore, maiores aliquid modi felis vitae facere aperiam sequi optio
            lacinia id ipsum.
          </p>

          <div className="flex justify-self-start">
            <button className="mt-5 bg-teal-400 px-8 py-4 rounded-md text-white hover:bg-teal-600 hover:-translate-y-2.5 duration-300 ">
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const About3 = () => {
  return (
    <>
      <div className="grid grid-cols-2 p-30 gap-5">
        <div className="flex gap-5 items-start">
          <FaCogs className="text-5xl text-teal-400" />

          <div className="flex flex-col justify-items-start items-start gap-3 text-2xl">
            <h6 className="font-bold hover:text-teal-400 duration-200">
              Group Classes
            </h6>

            <p className="text-lg text-gray-400">
              Lorem ipsum dolor sit amet,Ea consequuntur illum facere aperiam
              sequi optio consectetur adipisicing.
            </p>
          </div>
        </div>
        <div className="flex gap-5 justify-between items-start">
          <FaUsers className="text-5xl text-teal-400 " />
          <div className="flex flex-col justify-items-start items-start gap-3 text-2xl">
            <h6 className="font-bold hover:text-teal-400 duration-200">
              Experienced Coaches
            </h6>
            <p className="text-lg text-gray-400">
              Lorem ipsum dolor sit amet,Ea consequuntur illum facere aperiam
              sequi optio consectetur adipisicing.
            </p>
          </div>
        </div>
        <div className="flex gap-5 justify-between items-start">
          <FaPodcast className="text-5xl text-teal-400" />
          <div className="flex flex-col justify-items-start items-start gap-3 text-2xl">
            <h6 className="font-bold hover:text-teal-400 duration-200">
              CrossFit Classes
            </h6>
            <p className="text-lg text-gray-400">
              Lorem ipsum dolor sit amet,Ea consequuntur illum facere aperiam
              sequi optio consectetur adipisicing.
            </p>
          </div>
        </div>
        <div className="flex gap-5 justify-between items-start">
          <FaBicycle className="text-5xl text-teal-400" />
          <div className="flex flex-col justify-items-start items-start gap-3 text-2xl">
            <h6 className="font-bold hover:text-teal-400 duration-200">
              CrossFit Classes
            </h6>
            <p className="text-lg text-gray-400">
              Lorem ipsum dolor sit amet,Ea consequuntur illum facere aperiam
              sequi optio consectetur adipisicing.
            </p>
          </div>
        </div>
        <div className="flex gap-5 justify-between items-start">
          <FaDumbbell className="text-5xl text-teal-400" />
          <div className="flex flex-col justify-items-start items-start gap-3 text-2xl">
            <h6 className="font-bold hover:text-teal-400 duration-200">
              Indoor cycling
            </h6>
            <p className="text-lg text-gray-400">
              Lorem ipsum dolor sit amet,Ea consequuntur illum facere aperiam
              sequi optio consectetur adipisicing.
            </p>
          </div>
        </div>
        <div className="flex gap-5 justify-between  items-start">
          <FaHeartbeat className="text-5xl text-teal-400" />
          <div className="flex flex-col justify-items-start items-start gap-3 text-2xl">
            <h6 className="font-bold hover:text-teal-400 duration-200">
              Quality Equipments
            </h6>
            <p className="text-lg text-gray-400">
              Lorem ipsum dolor sit amet,Ea consequuntur illum facere aperiam
              sequi optio consectetur adipisicing.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const About4 = () => {
  return (
    <>
      <div className="grid grid-cols-[50%_25%_25%] gap-5 h-full w-full p-30">
        {/* Content */}
        <div>
          <div className="flex flex-col gap-5 mb-5">
            <span className="text-[#7e7d7d] font-bold">About Us</span>
            <h3 className="text-3xl font-bold max-w-[400px]">
              Modern Gym & Fitness Facilities
            </h3>
            <p className="text-[#7e7d7d] text-lg">
              Lorem ipsum viverra feugiat. Pellen tesque libero ut justo,
              ultrices in ligula. Semper at tempufddfel. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Non quae, fugiat.
            </p>
          </div>
          <div className="flex   gap-5">
            <div>
              <h4 className="text-xl font-bold">Workout Videos</h4>
              <p className="text-[#7e7d7d] text-lg max-w-[290px]">
                Pellen tesque libero ut justo, ultrices in ligula.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold">Workout Plans</h4>
              <p className="text-[#7e7d7d] text-lg max-w-[290px]">
                Pellen tesque libero ut justo, ultrices in ligula.
              </p>
            </div>
          </div>
        </div>

        {/* Image 1 */}
        <div className="h-full w-full">
          <img src={about1} alt="logo" className="rounded-md" />
        </div>

        {/* Image 2 */}
        <div className="h-full w-full">
          <img src={about2} alt="logo" className="rounded-md" />
        </div>
      </div>
    </>
  );
};

const About5 = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center bg-[#6c757d] p-30">
        <span className="uppercase text-sm font-bold text-[#ddd] mb-2">
          {" "}
          Our Video
        </span>
        <h3 className="text-4xl text-white font-bold w-[736px] text-center mb-5">
          How to Keep Your Body Healthy in Over the festival
        </h3>

        <p className="text-xl text-center max-w-[800px] mt-4 text-[#eee] leading-7">
          Lorem ipsum viverra feugiat. Pellen tesque libero ut justo, ultrices
          in ligula. Semper at tempufddfel. Lorem ipsum dolor sit amet
          consectetur adipisicing elit.
        </p>

        <div className="flex gap-8 items-center justify-between mt-10">
          <button className="rounded-md py-3 px-9 text-md font-bold bg-teal-500 text-white transition-all ease-in hover:bg-teal-800">
            Get Start Now
          </button>
          <div className="flex justify-center items-center  gap-4 ">
            <p className="text-white pe-2.5 font-medium">Watch Video</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const About6 = () => {
  return (
    <>
      <div className="max-w-6xl mx-auto py-10">
        <div className="text-center flex flex-col items-center mb-8 ">
          <h6>Meet OUR</h6>
          <h3 className="text-5xl font-bold ">Strongest Team</h3>
        </div>
        <div className="flex justify-center gap-5">
          <div className="relative group w-fit">
            <img src={team1} alt="" className="rounded-lg mb-5" />
            <div className="absolute bottom-[90px] left-0 right-0 opacity-0  group-hover:opacity-100  transition duration-300 flex justify-center items-center gap-4  ">
              <div className="w-10 h-10 bg-gray-500/50 rounded-full flex items-center justify-center cursor-pointer hover:scale-125 transition  hover:bg-white  group/icon">
                {" "}
                <FaFacebookF className="text-white  hover:text-teal-400  group-hover/icon:text-teal-400 " />
              </div>
              <div className="w-10 h-10 bg-gray-500/50 rounded-full flex items-center justify-center cursor-pointer hover:scale-125 transition  hover:bg-white group/icon">
                <FaInstagram className="text-white text-2xl  hover:text-teal-400 group-hover/icon:text-teal-400 " />
              </div>
              <div className="w-10 h-10 bg-gray-500/50 rounded-full flex items-center justify-center cursor-pointer hover:scale-125 transition  hover:bg-white group/icon">
                {" "}
                <FaTwitter className="text-white group-hover/icon:text-teal-400 " />
              </div>
            </div>
            <div className="text-center ">
              <h2 className="group-hover:text-teal-500 font-bold text-2xl">
                Daniel jacobs
              </h2>
              <p className="text-[#696687]">Fitness Coach</p>
            </div>
          </div>
          <div className="relative group w-fit">
            <img src={team2} alt="" className="rounded-lg mb-5" />
            <div className="absolute bottom-[90px] left-0 right-0 opacity-0  group-hover:opacity-100  transition duration-300 flex justify-center items-center gap-4  ">
              <div className="w-10 h-10 bg-gray-500/50 rounded-full flex items-center justify-center cursor-pointer hover:scale-125 transition  hover:bg-white  group/icon">
                {" "}
                <FaFacebookF className="text-white  hover:text-teal-400  group-hover/icon:text-teal-400 " />
              </div>
              <div className="w-10 h-10 bg-gray-500/50 rounded-full flex items-center justify-center cursor-pointer hover:scale-125 transition  hover:bg-white group/icon">
                <FaInstagram className="text-white text-2xl  hover:text-teal-400 group-hover/icon:text-teal-400 " />
              </div>
              <div className="w-10 h-10 bg-gray-500/50 rounded-full flex items-center justify-center cursor-pointer hover:scale-125 transition  hover:bg-white group/icon">
                {" "}
                <FaTwitter className="text-white group-hover/icon:text-teal-400 " />
              </div>
            </div>
            <div className="text-center">
              <h2 className="group-hover:text-teal-500 font-bold text-2xl">
                Claire Daniel
              </h2>
              <p className="text-[#696687]">Fitness Coach</p>
            </div>
          </div>
          <div className="relative group w-fit ">
            <img src={team3} alt="" className="rounded-lg mb-5" />
            <div className="absolute bottom-[90px] left-0 right-0 opacity-0  group-hover:opacity-100  transition duration-300 flex justify-center items-center gap-4  ">
              <div className="w-10 h-10 bg-gray-500/50 rounded-full flex items-center justify-center cursor-pointer hover:scale-125 transition  hover:bg-white  group/icon">
                {" "}
                <FaFacebookF className="text-white  hover:text-teal-400  group-hover/icon:text-teal-400 " />
              </div>
              <div className="w-10 h-10 bg-gray-500/50 rounded-full flex items-center justify-center cursor-pointer hover:scale-125 transition  hover:bg-white group/icon">
                <FaInstagram className="text-white text-2xl  hover:text-teal-400 group-hover/icon:text-teal-400 " />
              </div>
              <div className="w-10 h-10 bg-gray-500/50 rounded-full flex items-center justify-center cursor-pointer hover:scale-125 transition  hover:bg-white group/icon">
                {" "}
                <FaTwitter className="text-white group-hover/icon:text-teal-400 " />
              </div>
            </div>
            <div className="text-center">
              <h2 className="group-hover:text-teal-500 font-bold text-2xl">
                Daniel Hunt
              </h2>
              <p className="text-[#696687]">Fitness Coach</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default About;
