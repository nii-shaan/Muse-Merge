import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {PostForm} from "../components/index";
import service from "../appwrite/config";

function Post() {
  const [post, setpost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setpost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post?<div>
    <PostForm/>
  </div>:null
}

export default Post;
