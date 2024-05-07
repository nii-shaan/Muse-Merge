import React, { useCallback } from "react";
import { Button } from "antd";
import { useForm } from "react-hook-form";
import service from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { TextEditor, Select, Input } from "../index";
import { authService } from "../../appwrite/auth";
import { useEffect } from "react";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";

function PostForm({ post }) {
  const [currentUser, setCurrentUser] = useState("");
  const [userMail, setUserMail] = useState("");
  // console.log(userMail);

  useEffect(() => {
    authService.getCurrentUser().then((data) => setCurrentUser(data.$id));
    authService.getCurrentUser().then((data) => setUserMail(data.email));
  }, []);

  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
        user_id: currentUser,
      },
    });

  const navigate = useNavigate();
  [];
  const userData = useSelector((state) => state.authReducer.userData);

  const submit = async (data) => {
    data.user_id = currentUser;
    if (post) {
      const file = data.image[0] ? service.uploadFile(data.image[0]) : null;

      if (file) {
        service.deleteFile(post.featured_image);
      }
      const dbPost = await service.updatePost(post.$id, {
        ...data,
        featured_image: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/yourposts`);
        toast.success("Post updated successfully", {
          position: "top-center",
          pauseOnHover: false,
        });
      }
    } else {
      console.log(userData);
      const file = await service.uploadFile(
        data.image[0]
          ? data.image[0]
          : toast.error("File upload failed", {
              position: "top-center",
              pauseOnHover: false,
            })
      );

      if (userData) {
        if (file) {
          const fileId = file.$id;
          data.featured_image = fileId;
          const dbpost = await service.createPost({
            ...data,
            user_id: userData.$id,
            user_mail: userMail,
          });

          if (dbpost) {
            toast.success("Upload Sucessfull", {
              position: "top-center",
              pauseOnHover: false,
            });
            navigate(`/yourposts`);
          } else {
            toast.error("Error posting, Maybe you wrote more than 255 char?", {
              position: "top-center",
              autoClose: 8000,
              pauseOnHover: false,
            });
          }
        }
      } else {
        toast.error("Failed to get user data, please refresh the page", {
          position: "top-center",
          pauseOnHover: false,
        });
      }
    }
  };
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value.trim().toLowerCase().replace(/\s+/g, "-");
    }
    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="w-full  flex flex-col items-center justify-center "
    >
      <div className="w-full px-2 flex flex-wrap flex-col items-start justify-center">
        <div className="w-full  flex justify-center">
          <div
            id="inputAndSlug"
            className="max-w-[500px] px-2 pb-2 w-full flex justify-center items-center  sm:flex-col "
          >
            <Input
              label="Title: "
              placeholder="Title"
              className="mb-4"
              {...register("title", { required: true })}
            />

            <Input
              label="Slug: "
              placeholder="Slug"
              className="mb-4"
              {...register("slug", { required: true })}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                });
              }}
            />
          </div>
        </div>

        <div className="w-full flex justify-center sm:justify-start">
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
          />
        </div>
        <div className="w-full  flex justify-center">
          <TextEditor
            label="Content"
            name="content"
            control={control}
            defaultValue={getValues("content")}
            {...register("content", { required: true })}
          />
        </div>
      </div>
      <div className="w-full  flex justify-center">
        <div className=" w-[50%] h-32 flex flex-col flex-wrap">
          <Input
            label="Featured Image :"
            type="file"
            className="mb-4 w-[200px] text-white "
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />

          {post && (
            <div
              id="featuredImage"
              className="w-[100px] h-[100px] bg-contain bg-no-repeat   rounded-xl sm:h-[70px] sm:w-[70px] sm:mt-2"
              style={{
                backgroundImage: `url("${
                  service.getFilePreview(post.featured_image).href
                }")`,
              }}
            ></div>
          )}
        </div>
      </div>
      <div className=" w-[250px]">
        <Button htmlType="submit" type="primary" className=" h-[30px] w-full">
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
export default PostForm;
