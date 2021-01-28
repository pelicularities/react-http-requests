import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";

const CommentsSearch = () => {
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    setPostId(event.target.postId.value);
  };

  useEffect(() => {
    setIsLoading(true);
    axios(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then((res) => {
        setComments(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        console.error(errorMessage);
        setIsLoading(false);
      });
  }, [postId, errorMessage]);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" name="postId" />
        <input type="submit" value="submit" />
      </form>
      {isLoading && <Loader />}
      {!isLoading &&
        comments.length > 0 &&
        comments.map((comment) => <div key={comment.id}>{comment.body}</div>)}
      {!isLoading &&
        comments.length === 0 &&
        `No comments available for postId ${postId}`}
    </div>
  );
};

export default CommentsSearch;
