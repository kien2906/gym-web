import { useState } from "react";

function Concact() {
  return (
    <div className="">
      <Concact1 />
      <Concact2 />
    </div>
  );
}

const Concact1 = () => {
  return (
    <div className="bg-gray-500 py-20 h-full text-center">
      <div className="flex justify-center gap-5 text-xl items-center">
        <span className="font-bold text-teal-400">Home</span>
        <span className="text-white font-bold">{">"}</span>
        <span className="font-bold text-white">Contact</span>
      </div>
    </div>
  );
};

const Concact2 = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [error, setError] = useState({});




  const handleSubmit = async (e) => {
    e.preventDefault();
    let errornew = {};
    if (!form.name.trim()) {
      errornew.name = "Name cannot empty";
    }
    if (!form.email.trim()) {
      errornew.email = "Email cannot empty";
    }

    if (!form.subject.trim()) {
      errornew.subject = "Subject cannot empty";
    }

    if (!form.message.trim()) {
      errornew.message = "Message cannot empty";
    }

    setError(errornew);
    if (Object.keys(errornew).length > 0) return;


    try {
      const response = await fetch("http://localhost:4000/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Could not send message");
      }

    } catch (e) {
      console.log(e);
 
  }}



  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <>
      <div className="flex flex-col mt-5 items-center">
        <h4 className="text-sm font-bold text-[#696687]">Get in touch</h4>
        <h3 className="text-4xl font-bold mt-2 mb-4">Contact Us</h3>
        <p className="text-xl text-center max-w-[950px] text-[#696687]">
          Start working with Us that can provide everything you need to generate
          awareness, drive traffic, connect. We guarantee that you’ll be able to
          have any issue resolved within 24 hours.
        </p>

        <form className="flex flex-col gap-5 w-6xl" onSubmit={handleSubmit}>
          <div className="flex justify-center items-start gap-2 mt-5 text-start">
            <div className="flex flex-col w-full">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="text-start border-2 w-full p-5 focus:border-teal-400  focus:outline-none rounded-md"
              />
              {error.name && (
                <span className="mt-2 text-emerald-300 error block">{error.name}</span>
              )}
            </div>
            <div className="flex flex-col w-full">
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="text-start border-2 w-full p-5 rounded-md  focus:border-teal-400  focus:outline-none "
              />
              {error.email && (
                <span className="mt-2 text-emerald-300 error block">{error.email}</span>
              )}
            </div>
          </div>

          <input
            type="text"
            placeholder="Subject"
            value={form.subject}
            name="subject"
            onChange={handleChange}
            className="p-5 border-2 rounded-md  focus:border-teal-400  focus:outline-none"
          />
          {error.subject && (
            <span className="mt-2 text-emerald-300 error block">{error.subject}</span>
          )}
          <textarea
            placeholder="Message"
            rows={5}
            name="message"
            value={form.message}
            onChange={handleChange}
            className="p-5 w-full border-2 rounded-md  focus:border-teal-400  focus:outline-none"
          />
          {error.message && (
            <span className="mt-2 text-emerald-300 error block">{error.message}</span>
          )}
          <div className="text-end">
            {" "}
            <button
              type="submit"
            
              className="p-5 bg-teal-400 rounded-md mb-3 hover:bg-teal-700 cursor-pointer font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
            Send
            </button>
          </div>
        </form>
        
      </div>
       
    </>
  );

}
      
  
export default Concact;
