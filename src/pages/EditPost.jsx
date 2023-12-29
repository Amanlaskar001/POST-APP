import React, { useState, useEffect } from "react";

import Input from "../components/input/Input";
import Button from "../components/button/Button";

import { headers, updatePost, getSinglePost } from "../utils/Urls";
import { useParams, useNavigate } from "react-router-dom";

import {
  errorNotification,
  successNotification,
} from "../components/shared/notifications/Notification";
import { ToastContainer } from "react-toastify";

const EditPost = ({}) => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        let response = await fetch(getSinglePost(postId), {
          method: "GET",
          headers,
          credentials: "include",
        });
        response = await response.json();
        if (response.success == true) {
          setTitle(response.post.title);
          setSummary(response.post.summary);
          setContent(response.post.content);
          setFeaturedImage(response.post.featuredImage);
        } else {
          let errorMessage;
          if (response.message.includes("not authorized")) {
            errorMessage = "Please sigin to read more";
          }
          errorNotification(errorMessage || "Something went wrong in updating");
          setTimeout(() => {
            navigate("/");
          }, 700);
        }
      } catch (error) {
        errorNotification("Failed to update post");
      }
    };

    fetchPost();
  }, [postId]);

  const formSubmissionHandler = async (e) => {
    e.preventDefault();
    const postData = {
      title,
      summary,
      content,
      featuredImage,
    };
    try {
      let response = await fetch(updatePost(postId), {
        method: "PATCH",
        headers,
        credentials: "include",
        body: JSON.stringify(postData),
      });
      response = await response.json();
      if (response.success) {
        successNotification("Post edited successfully");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        errorNotification(response.message || "Something went deleting post");
      }
    } catch (error) {
      errorNotification(error.message || "Something went deleting post");
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
              text="Save Post"
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

export default EditPost;
