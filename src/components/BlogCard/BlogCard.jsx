import React, { useRef } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

function BlogCard({
  id, 
  title, 
  desc, 
  deletePost, 
  likePost, 
  liked,
  disliked,
  dislikePost,
  handleShowEditForm,
  handleSelectedPost,
  isAdmin
}) {

  const [ showPopup, setShowPopup ] = React.useState(false)
  const showRef = useRef()

  const showPopupOnClick = () => {
    setShowPopup(!showPopup)
  }

  const showEdit = () => {
    handleShowEditForm()
    handleSelectedPost()
  }


  const handleOutsideClick = (e) => {
    if (!e.composedPath().includes(showRef.current)) {
      setShowPopup(false);
    }
  };


  React.useEffect(() => {
    document.body.addEventListener("click", handleOutsideClick)
  }, [])

    const likeFill = liked ? '#fff' : '#282828'
    const dislikeFill = disliked ? '#fff' : '#282828'

  return (
    <div key={id}>
      <div className="border-post">
        <div className="block-posts">
          <div className="posts">
              <h2>{title}</h2>
        </div>
        <div>
          <div className="popup-style-position">
          <div className="popup-btn" ref={showRef} >
              <button className="popup-post-info" onClick={showPopupOnClick}>…</button>
          </div>
        {
          showPopup && (
            <div className="control-of-posts">
              <p className="delete-icon" onClick={deletePost}>Удалить задачу</p>
              <p className="delete-icon" onClick={showEdit}>Редактировать задачу</p>
            </div> 
          ) 
        }
        </div>
        </div>
      </div>
      <div className="post-title">
        <p>{desc}</p>
      </div>
      <div className="icon-wrap">
        <button className="btn active-btn like" onClick={likePost}>
          <ThumbUpAltIcon style={{fill: likeFill}}/>
        </button>

        <button className="btn active-btn like" onClick={dislikePost}>
          <ThumbDownIcon style={{fill:  dislikeFill}} />
        </button>
      </div>
    </div>
    </div>
  );
}

export default BlogCard;
