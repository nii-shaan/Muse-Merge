import React, { useCallback } from "react";
import { Button } from "antd";
import { set, useForm } from "react-hook-form";
import service from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RTE, Select, Input } from "../index";
import { authService } from "../../appwrite/auth";
import { useEffect } from "react";
import { useState } from "react";

function PostForm({ post }) {
  const [currentUser, setCurrentUser] = useState("");
  console.log(currentUser);

  useEffect(() => {
    authService.getCurrentUser().then((data) => setCurrentUser(data.$id));
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
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await service.uploadFile(
        data.image[0]
          ? data.image[0]
          : toast.error("File upload failed", { position: "top-center" })
      );

      if (file) {
        const fileId = file.$id;
        data.featured_image = fileId;
        const dbpost = await service.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbpost) {
          toast.success("Upload Sucessfull", { position: "top-center" });
          // TODO:   navigate(`/post/${dbpost.$id}`); 
        }
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
      className="flex flex-wrap flex-col items-center justify-center"
    >
      <div className="w-full px-2 flex flex-wrap flex-col items-start justify-center">
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
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2 mt-3">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4 w-[200px] text-white"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />

        {post && (
          <div className="w-full mb-4">
            <img
              src={service.getFilePreview(post.featured_image)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}

        <Button htmlType="submit" type="primary" className=" h-[30px] w-full ">
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
export default PostForm;
