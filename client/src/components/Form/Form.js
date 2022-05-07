import React, { useState, useEffect } from "react";
import { TextField, Button, Paper, Typography } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import useStyles from "./FormStyles";
import { newPost, updatePost } from "../../actionsTypes/posts.js";

// STEAL CURRENT ID

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    caption: "",
    selectedFile: "",
  });

  const post = useSelector((state) =>
    currentId
      ? state.posts.find((selected) => selected._id === currentId)
      : null
  );

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      caption: "",
      selectedFile: "",
    });
  };

  const dazzle_it = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  //handlers
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(newPost({ ...postData, name: user?.result?.name }, navigate));
      clear();
    } else {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
      clear();
    }
  };

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setPostData({
      ...postData,
    });
  };

  if (!user?.result?.name) {
    return (
      <Paper className={dazzle_it.base} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to trash talk and support.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={dazzle_it.base} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={dazzle_it.form}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Editing "${post?.title}"` : `Spike It!`}
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={handleChange}
        />
        <TextField
          name="caption"
          variant="outlined"
          label="Caption"
          fullWidth
          value={postData.caption}
          onChange={handleChange}
        />
        <div className={dazzle_it.upload}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={dazzle_it.subBtn}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
