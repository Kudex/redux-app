import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Post.css";

const Post = ({
  author,
  content,
  imagePost,
  datePost,
  countComments,
  countLooks,
  countLikes,
  countDownloads,
}) => {
  const postData = useSelector((state) => state.postData);
  const dispatch = useDispatch();

  const onChangeCount = (e) => {
    const card = postData.find(
      (elem) => elem.author.nickname === e.currentTarget.dataset.value
    );
    const NewPostEl = { ...card };
    let isPostChange = false;
    if (e.target.classList.contains("comment")) {
      isPostChange = true;
      e.target.classList.toggle("plus");
      e.target.classList.contains("plus") ? countComments++ : countComments--;
      NewPostEl.countComments = countComments;
    }
    if (e.target.classList.contains("look")) {
      isPostChange = true;
      e.target.classList.toggle("plus");
      e.target.classList.contains("plus") ? countLooks++ : countLooks--;
      NewPostEl.countLooks = countLooks;
    }
    if (e.target.classList.contains("likes")) {
      isPostChange = true;
      e.target.classList.toggle("plus");
      e.target.classList.contains("plus") ? countLikes++ : countLikes--;
      NewPostEl.countLikes = countLikes;
    }
    if (e.target.classList.contains("download")) {
      isPostChange = true;
      e.target.classList.toggle("plus");
      e.target.classList.contains("plus") ? countDownloads++ : countDownloads--;
      NewPostEl.countDownloads = countDownloads;
    }
    if (isPostChange) {
      dispatch({ type: "CHANGE", add_newPost: NewPostEl });
    }
  };

  return (
    <div
      className={`post`}
      onClick={onChangeCount}
      data-value={author.nickname}
    >
      <div className="post_header">
        <div className="ava">
          <img src={author.photo} alt="card author"></img>
        </div>
        <p className="header_name">{author.name}</p>
        <div className="header_date">{datePost}</div>
      </div>
      <h4 className="post_title">{content}</h4>
      <div className="block">
        <div className="post_image">
          <img src={imagePost} alt="Photo is not ready"></img>
        </div>
        <form name="form_chat" className="form_chat">
          <div className="chat_comment">
            <label for="comment" className="chat_area">
              Your comment
            </label>
            <textarea
              name="comment"
              rows="12"
              placeholder="Welcome"
              id="comment"
            ></textarea>
          </div>
          <button type="button" className="btn">
           Add!
          </button>
        </form>
      </div>
      <div className="wrapper">
        <button type="button" className="wrapper_link comment">
          {countComments}
        </button>
        <button type="button" className="wrapper_link look">
          {countLooks}
        </button>
        <button type="button" className="wrapper_link likes">
          {countLikes}
        </button>
        <button type="button" className="wrapper_link download">
          {countDownloads}
        </button>
      </div>
    </div>
  );
};

export default Post;
