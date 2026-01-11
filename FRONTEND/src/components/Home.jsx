import React from "react";
import { FaBus } from "react-icons/fa";
import { MdOutlineMenuOpen } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1571046314604-e32adfc8e11e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
  <header className="w-full bg-white/80 shadow-md py-3 px-4 sm:px-6 flex items-center justify-between fixed top-0 left-0 z-50">
  {/* Left: Menu Icon */}
  <MdOutlineMenuOpen 
  className="text-2xl sm:text-3xl text-black-600 cursor-pointer" 
  onClick={() => navigate("/")} 
/>


  {/* Right: Title + Bus Icon */}
  <div className="flex items-center text-right">
    <span className="text-sm sm:text-2xl font-bold text-indigo-800 hidden xs:inline">Track My Ride</span>
    <FaBus className="ml-2 text-2xl sm:text-3xl text-yellow-600" />
  </div>
</header>



      {/* Main Content Box */}
      <div className="bg-white/90 p-8 mt-16 rounded-lg shadow-lg w-full max-w-lg text-center">
        {/* Logo */}
        <img
          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIPDxAPEBISEBAPEBYPEBAQEA8QFhAPFhEYFxUVFRUYHCggGBolGxUVITEhJSkrLi4uFx8zPjgsQygtLisBCgoKDg0OGxAQGyshHx8rMC0tLS0yLS0tLS0tLS0tLS0tLS0uLS0tLS0tKy0tLS0tLS0tLS0rLS0tLS0tLS0tLf/AABEIAOkA2AMBEQACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAQMEBQYHAgj/xABMEAABAwIDAgYLDQcDBQEAAAABAAIDBBEFEjEGIQcTQVFUcRciNWF0kZKTstHSFBUyNEJTcnOBobGzwhYjMzZShPBFtMMmQ0Ri4SX/xAAbAQEAAgMBAQAAAAAAAAAAAAAAAQIDBAUGB//EADMRAQACAQIDBwQBAwQDAQAAAAABAgMEERIxUQUTFSEyUnEUMzRBIiSBwSU1YbFCkaEj/9oADAMBAAIRAxEAPwDuCifIY2txMNJazeeU8g9a4eu7YrimaYvOW1i03F52YuWpe/Vx6r2/Bedza3Pmn+U7t2mKteUKS1WVCgEBAQEBAQEBAQEBAQEBAQEBAQFIrRVL2fBceq91s4dblxeiWK2KlucMpRYmHENfuPIeQ+pej0XbFcsxXJ5S0summvnDJBdxqsbi1XlGRu4nU8wXD7Y104q91SfOW1psXF/KWFXk5nfzdIUR5AgICAgICAgICAgICAgICAgICAgICAp3BBmsIq8wyOO8aHnavWdj67va93fnDm6nFwzxQxdXJme49/d1Bed1uWcueb9W7ipw0hRWoyiAgICAgICAgICAgICAgICAgICAgICAglBVpJMr2nv7+ora0Wbuc1b9GPLTipMKK1mQUAgICAgICAgICAgICAgICAgICAgICAgICCVIhQCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApFvX18VOwyTyMhYPlyODRfm3rJiw3yztSN1bXisebAnhBwzpjPIm9lbnhWr29LF9RTqjshYX0tnkTeyp8J1XtR9TjOyDhfS2eRN7KjwrV+xP1OPqdkLC+ls8ib2U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"
          alt="Bus Tracking"
          className="mx-auto w-16 h-16 transition-transform duration-300 transform hover:scale-110"
        />

        <h2 className="text-lg font-semibold text-gray-700 mt-4">Main Menu</h2>

        {/* Buttons */}
        <div className="mt-4 space-y-3">
          <button className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700 transition"
           onClick={() => navigate("/admin-login")} >
            Admin/ Driver Login
          </button>
          <button className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700 transition"
          onClick={() => navigate("/user-login")}>
            User Login
          </button>
          <button className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700 transition"
          onClick={() => navigate("/user-register")} >
            User Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
