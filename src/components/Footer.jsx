import {
  FaEnvelopeOpen,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaTwitter,
} from "react-icons/fa";

const Footer = ({ darkMode }) => {
  return (
    <>
      <div
        className={`bg-[#011627] text-white px-20 py-10 ${darkMode ? "bg-black text-white" : "bg-[#011627]"} `}
      >
        <div className="mx-auto grid grid-cols-4 gap-20  ">
          <div className="flex flex-col gap-5 ">
            <h2 className="text-3xl font-bold">Prowess Lift</h2>

            <p className="text-[#7f8a94] w-[350px] text-md  ">
              Lorem ipsum viverra feugiat. Pellen tesque libero ut justo,
              ultrices in ligula.
            </p>

            <div className="flex gap-2 items-center">
              <FaPhoneAlt className="text-[#7f8a94]" />{" "}
              <p className="text-[#7f8a94]"> 0948895945</p>
            </div>

            <div className="flex gap-2 items-center">
              <FaEnvelopeOpen />
              <p className="text-[#7f8a94]">kienn0619@gmail.com</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 ms-10">
            <h2 className="text-xl font-bold">Usefull Links</h2>
            <ul className="text-[#7f8a94] flex flex-col gap-5">
              <li>About Us</li>
              <li>Blog posts</li>
              <li>Pricing plans</li>
              <li>Careers</li>
              <li>Classes</li>
              <li>Contact us</li>
            </ul>
          </div>

          <div className="flex flex-col gap-5 ">
            <h2 className="text-xl font-bold ">Healthy Living</h2>
            <ul className="text-[#7f8a94] flex flex-col gap-4">
              <li>Fitness</li>
              <li>Health</li>
              <li>Before & After</li>
              <li>Weight Loss</li>
              <li>Healthy Recipes</li>
              <li>Meal Plans</li>
              <li>Workout Videos</li>
              <li>Support</li>
            </ul>
          </div>

          <div className="flex flex-col gap-5 ">
            <h2 className="text-xl font-bold">Subscribe to our Newsletter</h2>

            <p className="text-[#7f8a94]">
              Enter your email and receive the latest news, updates and special
              offers from us.
            </p>

            <input
              type="email"
              placeholder="Your Email Address"
              className={`rounded-md p-4 outline-none ${darkMode ? "bg-black" : "bg-white bg-white text-black"}`}
            />

            <button className="bg-teal-400 hover:bg-teal-500 transition rounded-md py-4 font-bold">
              Subscribe Now
            </button>
          </div>
        </div>

        <div className="mt-16 border-t border-slate-800 pt-6">
          <div className="flex flex-col gap-4  items-center justify-between">
            <p className="text-center text-sm text-[#cfd7df] md:text-left">
              © 2020 Prowess Lift. All rights reserved. Design by{" "}
              <span className="font-semibold text-teal-400">W3Layouts</span>
            </p>

            <div className="flex items-center justify-center gap-6 text-[#cfd7df] md:justify-end">
              <FaFacebookF className="cursor-pointer text-lg transition hover:text-teal-400" />
              <FaTwitter className="cursor-pointer text-lg transition hover:text-teal-400" />
              <FaInstagram className="cursor-pointer text-lg transition hover:text-teal-400" />
              <FaLinkedinIn className="cursor-pointer text-lg transition hover:text-teal-400" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Footer;
