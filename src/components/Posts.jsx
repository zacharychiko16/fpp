import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Posts() {
  const { id } = useParams();
  const navigate = useNavigate()
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);  
  const [searchId, setSearchId] = useState(id)
  
  function onSearch (event) {
   fetchPosts(searchId)
  }

async function fetchPosts(userId) {
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId || id}`
        );
        setPosts(data);
        setLoading(false);
      }
  
      function onSearchKeyPress(key) {
        setLoading(true)
        if (key === 'Enter') {
            onSearch()
        }
      }

  useEffect(() => {
    
    fetchPosts();
  }, []);
  return (
    <>
      <div className="post__search">
        <button onClick={()=>navigate('/')}>← Back</button >
        <div className="post__search--container">
          <label className="post__search--label">Search by Id</label>
          <input
            type="number"
            onChange={(event)=> setSearchId(event.target.value)}
            value={searchId}
             onKeyUp={(event) => onSearchKeyPress(event.key)}
          />
          <button onClick={() => onSearch()}
         >Enter</button>
        </div>
      </div>
      {loading
        ? new Array(10).fill(0).map((_, index) => (
            <div className="post" key={index}>
              <div className="post__title">
                <div className="post__title--skeleton"></div>
              </div>
              <div className="post__body">
                <p className="post__body--skeleton"></p>
              </div>
            </div>
          ))
        : posts.map((post) => (
            <div className="post" key={post.id}>
              <div className="post__title">{post.title}</div>
              <p className="post__body">{post.body}</p>
            </div>
          ))}
    </>
  );
}
