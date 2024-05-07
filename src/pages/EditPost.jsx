import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PostForm } from "../components/index";
import service from "../appwrite/config";
import { toast } from "react-toastify";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        // console.log(post);
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div>
      <PostForm post={post} />
    </div>
  ) : null;
}

export default EditPost;
