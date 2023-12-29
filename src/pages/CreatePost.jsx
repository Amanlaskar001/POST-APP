import React, { useState, useEffect, useContext } from "react";

import Input from "../components/input/Input";
import Button from "../components/button/Button";

import { headers, createPost } from "../utils/Urls";
import {
  errorNotification,
  successNotification,
} from "../components/shared/notifications/Notification";
import { ToastContainer } from "react-toastify";

import AppContext from "../../store/store";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const context = useContext(AppContext);

  const formSubmissionHandler = async (e) => {
    e.preventDefault();
    const postData = {
      title,
      summary,
      content,
      featuredImage,
    };
    try {
      let response = await fetch(createPost, {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify(postData),
      });
      response = await response.json();
      if (response.success) {
        successNotification("Post created successfully");
        setTitle("");
        setSummary("");
        setContent("");
        setFeaturedImage("");
        context.setUpdatedUser(response.user);
      } else {
        errorNotification(response.message || "Something went creating post");
      }
    } catch (error) {
      errorNotification(error.message || "Something went creating post");
    }
  };

  useEffect(() => {
    const isTitleValid = title.length >= 3;
    const isSummaryValid = summary.length >= 5;
    const isContentValid = content.length >= 20;
    const isFeaturedImageValid = featuredImage.trim() !== "";

    setIsFormValid(
      isTitleValid && isSummaryValid && isContentValid && isFeaturedImageValid
    );
  }, [title, summary, content, featuredImage]);

  return (
    <>
      <section className="grid place-items-center min-h-[88vh]">
        <form
          onSubmit={formSubmissionHandler}
          className="border border-[rgba(0,0,0,0.5)] px-4 py-6 max-w-xl w-[95%] mx-auto rounded-md"
        >
          <h2 className="text-center text-3xl font-bold uppercase mb-3">
            Blog Post Form
          </h2>
          <Input
            type="text"
            text="Title"
            placeholder="Enter a title (Greater than 3 characters)"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <Input
            type="text"
            text="Summary"
            placeholder="Provide a short summary (Greater than 10 characters)"
            onChange={(e) => setSummary(e.target.value)}
            value={summary}
          />
          <Input
            type="textarea"
            text="Content"
            placeholder="Write your blog post content (Greater than 20 characters)"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
          <Input
            type="text"
            text="Featured Image URL"
            placeholder="Enter the URL of the featured image"
            onChange={(e) => setFeaturedImage(e.target.value)}
            value={featuredImage}
          />

          <div className="grid place-items-center mt-4">
            <Button
              text="Create Post"
              type="submit"
              color="lGreen"
              disabled={!isFormValid}
            />
          </div>
        </form>
      </section>
      <ToastContainer />
    </>
  );
};

export default CreatePost;
