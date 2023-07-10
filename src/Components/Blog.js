/* eslint-disable array-callback-return */
import { useEffect, useReducer, useRef, useState } from "react";

//Blogging App using Hooks
export default function Blog() {
  //Passing the synthetic event as argument to stop refreshing the page on submit

  //   const [title, setTitle] = useState("");
  //   const [content, setContent] = useState("");

  const [formData, setFormData] = useState({ title: "", content: "" });

  // const [blogs, setBlogs] = useState([]);

  const [blogs, dispatch] = useReducer(blogsReducer, []);

  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  useEffect(() => {
    if (blogs.length > 0 && blogs[0].title) {
      document.title = blogs[0].title;
    } else {
      document.title = "No Blogs !!";
    }
  }, [blogs]);

  function blogsReducer(state, action) {
    switch (action.type) {
      case "ADD":
        return [action.blog, ...state];

      case "REMOVE":
        console.log(action);
        return state.filter((blog, index) => index != action.index);
      default:
        return [];
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    // if (formData.title == ""){
    //   document.title = 'No blogs!!'
    // }
    // setBlogs([{ title: formData.title, content: formData.content }, ...blogs]);
    dispatch({
      type: "ADD",
      blog: { title: formData.title, content: formData.content },
    });

    // setFormData([...formData]);
    setFormData({ title: "", content: "" });
    titleRef.current.focus();

    console.log(blogs);
  }

  function handleClick(e) {
    let key = e.target.value;
    dispatch({ type: "REMOVE", index: key });
    // setBlogs(blogs.filter((blog, index) => key != index));
  }

  return (
    <>
      {/* Heading of the page */}
      <h1>Write a Blog!</h1>

      {/* Division created to provide styling of section to the form */}
      <div className="section">
        {/* Form for to write the blog */}
        <form onSubmit={handleSubmit}>
          {/* Row component to create a row for first input field */}
          <Row label="Title">
            <input
              name="title"
              className="input"
              placeholder="Enter the Title of the Blog here.."
              value={formData.title}
              ref={titleRef}
              required
              // autoFocus
              onChange={(e) => {
                setFormData({
                  title: e.target.value,
                  content: formData.content,
                });
              }}
            />
          </Row>

          {/* Row component to create a row for Text area field */}
          <Row label="Content">
            <textarea
              className="input content"
              name="content"
              placeholder="Content of the Blog goes here.."
              value={formData.content}
              required
              onChange={(e) => {
                setFormData({
                  title: formData.title,
                  content: e.target.value,
                });
              }}
            />
          </Row>

          {/* Button to submit the blog */}
          <button className="btn">ADD</button>
        </form>
      </div>

      <hr />

      {/* Section where submitted blogs will be displayed */}
      <h2> Blogs </h2>
      {blogs.map((obj, i) => {
        return (
          <div className="blog" key={i}>
            <h3>{obj.title}</h3>
            <p>{obj.content}</p>
            <button onClick={handleClick} value={i}>
              DELETE
            </button>
          </div>
        );
      })}
    </>
  );
}

//Row component to introduce a new row section in the form
function Row(props) {
  const { label } = props;
  return (
    <>
      <label>
        {label}
        <br />
      </label>
      {props.children}
      <hr />
    </>
  );
}
