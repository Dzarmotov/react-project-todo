import React from "react";
import axios from "axios";

import "./posts.css";
import AddNewPost from "../AddNewPost/addNewPost";
import BlogCard from "../BlogCard/BlogCard";
import EditPosts from "../EditPosts.jsx/EditPosts";

const Posts = () => {
  // Состояние
  const [postsData, setPostsData] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showEditForm, setEditForm] = React.useState(false);
  const [selectedPost, setSelectedPost] = React.useState({});

  // Запросы

  const fetchPost = () => {
    axios
      .get("https://642983ce5a40b82da4d48622.mockapi.io/api/posts/data")
      .then((response) => {
        setPostsData(response.data);
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    fetchPost();
  }, []);

  const deletePost = (blogPost) => {
    if (window.confirm(`Удалить ${blogPost.title} ?`)) {
      axios
        .delete(
          `https://642983ce5a40b82da4d48622.mockapi.io/api/posts/data/${blogPost.id}`
        )
        .then(() => {
          fetchPost();
          setIsLoading(!isLoading);
        });
    }
  };

  const getUpdatePost = (updatePost) => {
    axios
      .put(
        `https://642983ce5a40b82da4d48622.mockapi.io/api/posts/data/${updatePost.id}`,
        updatePost
      )
      .then(() => {
        fetchPost();
        setIsLoading(!isLoading);
      });
  };

  const addNewPost = (blogPost) => {
    axios
      .post(
        "https://642983ce5a40b82da4d48622.mockapi.io/api/posts/data",
        blogPost
      )
      .then(() => {
        fetchPost();
      });
  };

  const likePost = (blogPost) => {
    const temp = { ...blogPost };
    temp.liked = !temp.liked;

    axios
      .put(
        `https://642983ce5a40b82da4d48622.mockapi.io/api/posts/data/${blogPost.id}`,
        temp
      )
      .then(() => {
        fetchPost();
      });
  };

  const dislikePost = (blogPost) => {
    const temp = { ...blogPost };
    temp.disliked = !temp.disliked;

    axios
      .put(
        `https://642983ce5a40b82da4d48622.mockapi.io/api/posts/data/${blogPost.id}`,
        temp
      )
      .then(() => {
        fetchPost();
      });
  };

  // Функции
  const handleShowEditForm = () => {
    setEditForm(!showEditForm);
  };

  const handleShowEditFormHide = () => {
    setEditForm(!showEditForm);
  };

  const handleShowAddForm = () => {
    setShowForm(!showForm);
  };

  const handleShowAddHide = () => {
    setShowForm(!showForm);
  };

  const handleSelectedPost = (blogPost) => {
    setSelectedPost(blogPost);
  };

  if (postsData.length === 0) {
    return (
      <div className="overlay">
        <div className="spinner">
          <div className="blob top"></div>
          <div className="blob bottom"></div>
          <div className="blob left"></div>
          <div className="blob move-blob"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="main-container">
        <div className="add-post-btn">
          <button className="add-btn" onClick={handleShowAddForm}>
            Добавить задачу
          </button>
        </div>

        {showForm && (
          <AddNewPost
            postsData={postsData}
            handleShowAddHide={handleShowAddHide}
            addNewPost={addNewPost}
          />
        )}

        {showEditForm && (
          <EditPosts
            handleShowEditFormHide={handleShowEditFormHide}
            getUpdatePost={getUpdatePost}
            selectedPost={selectedPost}
          />
        )}

        {postsData.map((post) => (
          <BlogCard
            key={post.id}
            title={post.title}
            desc={post.desc}
            liked={post.liked}
            disliked={post.disliked}
            handleShowEditForm={handleShowEditForm}
            handleSelectedPost={() => handleSelectedPost(post)}
            dislikePost={() => dislikePost(post)}
            deletePost={() => deletePost(post)}
            likePost={() => likePost(post)}
          />
        ))}
      </div>
      {isLoading && (
        <div className="overlay">
          <div className="spinner">
            <div className="blob top"></div>
            <div className="blob bottom"></div>
            <div className="blob left"></div>

            <div className="blob move-blob"></div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Posts;
