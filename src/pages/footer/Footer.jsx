import React from "react";
import { Link } from "react-router-dom";
import { CiFacebook, CiLinkedin } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  const year = new Date().getFullYear();
  // console.log(year);

  return (
    <footer className="bg-[#3D3C42] h-[350px] w-full">
      <div className="h-[55%] w-full  flex justify-evenly text-white text-sm border-b ">
        <div
          id="about"
          className="w-[30%] flex items-center flex-col justify-start pt-8 sm:text-[12px]"
        >
          <ul>
            <h1 className="font-bold text-xl mb-5 font-cursive sm:text-lg">ABOUT</h1>
            <li className="cursor-pointer hover:text-gray-400 hover:underline">
              About Us
            </li>
            <li className="cursor-pointer hover:text-gray-400 hover:underline">
              Blog
            </li>
            <li className="cursor-pointer hover:text-gray-400 hover:underline">
              Privacy Policy
            </li>
            <li className="cursor-pointer hover:text-gray-400 hover:underline">
              Terms of Service
            </li>
          </ul>
        </div>
        <div
          id="help"
          className="  w-[30%] flex items-center flex-col justify-start pt-8 sm:text-[12px]"
        >
          <ul>
            <h1 className="font-bold text-xl mb-5 font-cursive sm:text-lg">HELP</h1>

            <li className="cursor-pointer hover:text-gray-400 hover:underline">
              Help Center
            </li>
            <li className="cursor-pointer hover:text-gray-400 hover:underline">
              Get Started
            </li>
            <li className="cursor-pointer hover:text-gray-400 hover:underline">
              Contact Us
            </li>
          </ul>
        </div>
        <div
          id="connect"
          className=" w-[30%] flex items-center flex-col justify-start pt-8"
        >
          <h1 className="font-bold text-xl mb-5 font-cursive sm:text-lg">CONNECT</h1>
          <ul className="flex gap-2 flex-col sm:text-[12px]">
            <li className="flex cursor-pointer hover:text-gray-400 hover:underline">
              {" "}
              <CiFacebook className="h-5 w-5 mr-2" /> Facebook
            </li>
            <li className="flex cursor-pointer hover:text-gray-400 hover:underline">
              {" "}
              <CiLinkedin className="h-5 w-5 mr-2" /> LinkedIn
            </li>
            <li className="flex cursor-pointer hover:text-gray-400 hover:underline">
              {" "}
              <FaXTwitter className="h-5 w-5 mr-2" /> Twitter
            </li>
          </ul>
        </div>
      </div>

      <div id="me" className="h-[45%] w-full  flex text-white font-cursive">
        <div className=" w-[35%] h-full flex items-center justify-center">
          <section className="flex justify-center items-center">
            <Link to="https://github.com/nishan812">
              <button
                className="group flex justify-center p-2 rounded-md drop-shadow-xl bg-gradient-to-r from-gray-600 to-black text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
                href="/"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 15 15"
                  className="w-5"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    fill="currentColor"
                    d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z"
                  ></path>
                </svg>
                <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-white group-hover:text-sm group-hover:-translate-y-10 duration-700">
                  GitHub
                </span>
              </button>
            </Link>
          </section>
          <p className="ml-5 sm:text-[10px]">Made by Nishan</p>
        </div>
        <div className=" w-[65%] h-full flex items-center justify-center text-xl text-[#efeeee] font-cursive sm:text-[10px]">
          2024-{year} <p className="ml-4 mr-1 mt-2">©</p>{" "}
          <Link to="/" className="hover:underline">
            Muse Merge
          </Link>
        </div>
       
      </div>
    </footer>
  );
}

export default Footer;
