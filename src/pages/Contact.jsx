import { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

// ========================================
// GOOGLE MAP CONFIG
// ========================================

const defaultCenter = {
  lat: 10.03711,
  lng: 105.78825,
};

const mapContainerStyle = {
  width: "100%",
  height: "450px",
};

const mapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim();

// ========================================
// CONTACT
// ========================================

function Contact() {
  return (
    <div>
      <Breadcrumb name="Contact" />
      <ContactContent />
    </div>
  );
}

// ========================================
// CONTACT CONTENT
// ========================================

function ContactContent() {
  // ======================================
  // FORM
  // ======================================

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [error, setError] = useState({});

  // ======================================
  // LOCATION
  // ======================================

  const [location, setLocation] = useState(null);

  const [locationError, setLocationError] = useState("");

  // ======================================
  // GOOGLE MAP
  // ======================================

  const { isLoaded, loadError } = useJsApiLoader({
    id: "gym-management-google-map",
    googleMapsApiKey: mapsApiKey || "",
  });

  // ======================================
  // DEBUG
  // ======================================

  console.log("Google Maps API Key:", mapsApiKey);
  console.log("Google Maps loaded:", isLoaded);
  console.log("Google Maps error:", loadError);
  console.log("Current location:", location);

  // ======================================
  // GET CURRENT LOCATION
  // ======================================

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Your browser does not support geolocation.");

      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        console.log("Current latitude:", latitude);

        console.log("Current longitude:", longitude);

        setLocation({
          lat: latitude,
          lng: longitude,
        });
      },

      (error) => {
        console.error("Geolocation error:", error);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError("Location permission was denied.");
            break;

          case error.POSITION_UNAVAILABLE:
            setLocationError("Location information is unavailable.");
            break;

          case error.TIMEOUT:
            setLocationError("Getting your location timed out.");
            break;

          default:
            setLocationError("Unable to get your location.");
        }
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  }, []);

  // ======================================
  // FORM CHANGE
  // ======================================

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ======================================
  // FORM SUBMIT
  // ======================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name cannot be empty";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email cannot be empty";
    }

    if (!form.subject.trim()) {
      newErrors.subject = "Subject cannot be empty";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message cannot be empty";
    }

    setError(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

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

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setError({});

      console.log("Message sent successfully");
    } catch (error) {
      console.error(error);
    }
  };

  // ======================================
  // RENDER
  // ======================================

  return (
    <>
      {/* ==================================
          CONTACT FORM
      ================================== */}

      <div className="flex flex-col mt-5 items-center">
        <h4 className="text-sm font-bold text-[#696687]">Get in touch</h4>

        <h3 className="text-4xl font-bold mt-2 mb-4">Contact Us</h3>

        <p className="text-xl text-center max-w-237.5 text-[#696687]">
          Start working with Us that can provide everything you need to generate
          awareness, drive traffic, connect. We guarantee that you’ll be able to
          have any issue resolved within 24 hours.
        </p>

        <form className="flex flex-col gap-5 w-6xl" onSubmit={handleSubmit}>
          {/* NAME + EMAIL */}

          <div className="flex justify-center items-start gap-2 mt-5">
            {/* NAME */}

            <div className="flex flex-col w-full">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="border-2 w-full p-5 rounded-md focus:border-teal-400 focus:outline-none"
              />

              {error.name && (
                <span className="mt-2 text-red-500">{error.name}</span>
              )}
            </div>

            {/* EMAIL */}

            <div className="flex flex-col w-full">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="border-2 w-full p-5 rounded-md focus:border-teal-400 focus:outline-none"
              />

              {error.email && (
                <span className="mt-2 text-red-500">{error.email}</span>
              )}
            </div>
          </div>

          {/* SUBJECT */}

          <div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              className="p-5 border-2 rounded-md focus:border-teal-400 focus:outline-none w-full"
            />

            {error.subject && (
              <span className="mt-2 text-red-500 block">{error.subject}</span>
            )}
          </div>

          {/* MESSAGE */}

          <div>
            <textarea
              name="message"
              placeholder="Message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              className="p-5 w-full border-2 rounded-md focus:border-teal-400 focus:outline-none"
            />

            {error.message && (
              <span className="mt-2 text-red-500 block">{error.message}</span>
            )}
          </div>

          {/* BUTTON */}

          <div className="text-end">
            <button
              type="submit"
              className="p-5 bg-teal-400 rounded-md mb-3 hover:bg-teal-700 cursor-pointer font-bold text-white"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Contact;
