import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { baseUrl } from "../utils/axios.js";
import "../stylesheets/CommentsSearch.css";

const CommentsSearch = () => {
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    setPostId(event.target.postId.value);
  };

  useEffect(() => {
    setIsLoading(true);
    axios(`${baseUrl}/posts/${postId}/comments`)
      .then((res) => {
        setComments(res.data);
        setIsLoading(false);
        setErrorMessage(null);
      })
      .catch(() => {
        setErrorMessage("Ooops! Something went wrong...");
        setIsLoading(false);
      });
  }, [postId, errorMessage]);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h3>Find comments from post #:</h3>
        <input type="number" name="postId" placeholder="15" min="1" />
        <input type="submit" value="Search" />
      </form>
      {isLoading && <Loader />}
      {!isLoading &&
        !errorMessage &&
        (comments.length > 0 ? (
          comments.map((comment) => (
            <div className="section" key={comment.id}>
              {comment.body}
            </div>
          ))
        ) : (
          <div className="section">
            No comments available for postId {postId}
          </div>
        ))}
      {!isLoading && errorMessage && (
        <div className="section">
          <strong>{errorMessage}</strong>
        </div>
      )}
    </div>
  );
};

export default CommentsSearch;
