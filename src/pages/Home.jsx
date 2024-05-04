import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Typewriter } from "react-simple-typewriter";
import { Button } from "antd";
import { CiLogin } from "react-icons/ci";
import { SiGnuprivacyguard } from "react-icons/si";
import { Link } from "react-router-dom";
import service from "../appwrite/config";
import {PostCard} from "../components/index";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    service.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  const status = useSelector((state) => state.authReducer.status);
  console.log(status);

  if (status) {
    return (
      <div className="bg-[#151515] h-screen w-full min-h-[700px] text-white flex items-center justify-center">
        {posts.map((post) => (
          <div key={post.$id}>
            <PostCard post={post} />
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <>
        {" "}
        <div className="bg-[#151515] h-screen w-full min-h- [700px] text-white flex flex-col items-center justify-start">
          <div className="h-[500px]  w-full flex items-center justify-center flex-col">
            <div id="textArea">
              <span className="text-[60px] font-cursive ">
                <Typewriter
                  words={[
                    "Write, Inspire, Connect.",
                    "Write with purpose",
                    "Connect with passion",
                    "Join the conversation",
                    "Write your story",
                    "Your story",
                    "Our community",
                    "Start writing.",
                  ]}
                  cursor
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
            </div>

            <div className="h-[60px] w-[300px] flex justify-evenly items-center">
              <Link to="/login">
                <Button
                  ghost
                  className="w-[100px] flex items-center justify-evenly"
                >
                  <CiLogin className="h-[25px] w-[25px]" />
                  Login
                </Button>
              </Link>

              <Link to="/signup">
                <Button
                  ghost
                  className="w-[100px] flex items-center justify-evenly"
                >
                  <SiGnuprivacyguard className="h-[20px] w-[20px]" />
                  Signup
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
