import React from 'react'
import './addNewPost.css'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


function AddNewPost({ addNewPost, handleShowAddHide }) {

    const [postTitle, setPostTitle] = React.useState('')
    const [postDesc, setPostsDesc] = React.useState('')

    const handlePostTitleChange = (e) => {
        setPostTitle(e.target.value)
    }

    const handlePostDescChange = (e) => {
        setPostsDesc( e.target.value )
    }

    const createNewPost = () => {
        let post = {
            title: postTitle,
            desc: postDesc,
            liked: false,
            disLike: false
        }

        addNewPost(post)
        handleShowAddHide()
    }


  return (
    <>
    <form action="" className="appPostForm" >
        <button className="hideBtn" onClick={handleShowAddHide}><HighlightOffIcon /></button>
        <h2 className="formTitle">Добавление нового поста</h2>
      <div>
        <input 
        type="text" 
        name="postTitle" 
        placeholder="Ваше имя"
        value={postTitle}
        onChange={handlePostTitleChange}
        required
        />
      </div>
      <div>
        <textarea 
        name="postDescription" 
        placeholder="Описание поста"
        value={postDesc}
        onChange={handlePostDescChange}
        required
        />
      </div>
      <div>
        <button type="submit" className="add-btn" onClick={createNewPost}>Добавить пост</button>
      </div>
    </form>
    <div className="overlay"></div>
    </>
  )
}

export default AddNewPost