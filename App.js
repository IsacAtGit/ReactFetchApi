import "./App.scss";
import { useState, useEffect } from "react";

const App = () => {
  const [resource, setresource] = useState("");
  const [users, setusers] = useState([]);
  const [item, setitem] = useState([]);
  const [comments, setcomments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((response) => response.json())
      .then((json) => {
        setusers(json);
      });
  }, [resource]);
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/comments`)
      .then((response) => response.json())
      .then((json) => {
        setcomments(json);
      });
  }, [resource]);
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${resource}`)
      .then((response) => response.json())
      .then((json) => {
        setitem(json);
      });
  }, [resource]);
  return (
    <div className="tweet">
      <div className="App">
        <button onClick={() => setresource("posts")}>Posts</button>
      </div>
      <h1>{resource}</h1>

      <div className="tweet-content">
        {resource == "posts" ? (
          item.map((e) => (
            <div>
              <div className="tweet-header">
                <div className="username">
                  {users.map((el) =>
                    el.id == e.userId ? <h4>`UserName:- {el.name}`</h4> : null
                  )}
                </div>
              </div>
              <h3>Post Title:- {e.title}</h3>
              <pre>{JSON.stringify(e.body)}</pre>{" "}
              <div className="tweet-actions">
                <button onClick={() => setShowComments(!showComments)}>
                  View Comments
                </button>
              </div>
              {showComments && (
                <div className="comments">
                  <h3>Comments:</h3>

                  {comments.map((ex) =>
                    ex.postId == e.id ? (
                      <ul>
                        <li>{ex.name}</li>
                        <li>{ex.body}</li>{" "}
                      </ul>
                    ) : null
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>click posts</p>
        )}
      </div>
    </div>
  );
};

export default App;
