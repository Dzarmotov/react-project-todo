import React from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function EditPosts({ handleShowEditFormHide, getUpdatePost, selectedPost }) {

  
  const [ postTitle, setPostTitle ] = React.useState( selectedPost.title )
  const [ postDesc, setPostsDesc ] = React.useState( selectedPost.desc )

  const handlePostTitleChange = (e) => {
      setPostTitle(e.target.value)
  }

  const handlePostDescChange = (e) => {
      setPostsDesc( e.target.value )
  }

  const saveUpdatePost = (e) => {
    e.preventDefault()
      const post = {
          id: selectedPost.id,
          title: postTitle,
          desc:  postDesc,
          liked: selectedPost.liked,
          disLike: selectedPost.disliked
      }
      getUpdatePost(post)
      handleShowEditFormHide()
  }


  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleShowEditFormHide()
      }
    }

    window.addEventListener('keyup', handleEscape)

    return () => window.removeEventListener('keyup', handleEscape)
  }, [])

  return (
    <>
    <form className="appPostForm" onSubmit={saveUpdatePost}>
        <p className="hideBtn" onClick={handleShowEditFormHide}><HighlightOffIcon /></p>
        <h2 className="formTitle">Редактирования задачи</h2>
      <div>
        <input 
        type="text" 
        name="postTitle" 
        placeholder="Заголовок задачи"
        value={postTitle}
        onChange={handlePostTitleChange}
        required
        />
      </div>
      <div>
        <textarea 
        name="postDescription" 
        placeholder="Описание задачи"
        value={postDesc}
        onChange={handlePostDescChange}
        required
        />
      </div>
      <div>
        <button type="submit" className="add-btn save-changes">Сохранить измненения</button>
      </div>
    </form>
    <div className="overlay"></div>
    </>
  )
}

export default EditPosts