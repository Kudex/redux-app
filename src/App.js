import "./App.css";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Post from "./components/Post.jsx";
import { postEl, authors } from "./utils/util.jsx";

function App() {
  const postData = useSelector((state) => state.postData, shallowEqual);
  const dispatch = useDispatch();
  const onClickAddPost = (e) => {
    if (e.target.nodeName !== "BUTTON") {
      return;
    }

    const elementsForm = e.currentTarget.elements;
    const athorsByNickName = authors.find(
      (elem) => elem.nickname === elementsForm.author.value
    );
    const NewPostEl = {
      ...postEl,
      author: athorsByNickName,
      content: elementsForm.content.value,
      imagePost: elementsForm.form_image.value,
      datePost: new Date().toLocaleDateString(),
    };
    elementsForm.content.value = "";
    elementsForm.form_image.value = "";
    dispatch({ type: "ADD", add_newPost: NewPostEl });
  };

  return (
    <div className="App">
      <h1 className="title">Posts</h1>
      <form onClick={onClickAddPost}>
        <div className="form">
          <div className="form_part_author">
            <label className="form_author">
              {" "}
              Author
              <select
                id="select"
                name="author"
                defaulValue={authors[0].nickname}
              >
                {authors.map((elem) => (
                  <option value={elem.nickname}>{elem.name}</option>
                ))}
              </select>
            </label>
            <label className="form_image">
              {" "}
              image post
              <input type="text" name="form_image" placeholder="url..."></input>
            </label>
          </div>
          <div className="form_part_content">
            <label name="content" className="form_content">
              {" "}
              content
              <textarea
                name="content"
                rows="5"
                placeholder="..."
                id="content"
              ></textarea>
            </label>
            <button type="button" className="btn">
              ADD
            </button>
          </div>
        </div>
      </form>
      {postData.map((elem) => (
        <Post {...elem}></Post>
      ))}
    </div>
  );
}

export default App;