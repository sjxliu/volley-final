import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@material-ui/core/";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate, Link } from "react-router-dom";

import useStyles from "./PDStyles.js";
import noImage from '../../images/no-image-available.png'
import { getPost, getSearchedPosts } from "../../actionsTypes/posts";

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dazzle_it = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id))
  }, [id])

  if(!post) return null

  if(isLoading){
    return(
      <Paper elevation={6} className={dazzle_it.loading}>
        <CircularProgress size='7em'/>
      </Paper>
    )
  }
  

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={dazzle_it.card}>
        <div className={dazzle_it.section}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {/* {post.tags.map((tag) => (
              <Link
                to={`/tags/${tag}`}
                style={{ textDecoration: "none", color: "#3f51b5" }}
              >
                {` #${tag} `}
              </Link>
            ))} */}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">
            Created by:
            <Link
              to={`/creators/${post.name}`}
              style={{ textDecoration: "none", color: "#3f51b5" }}
            >
              {` ${post.name}`}
            </Link>
          </Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Divider style={{ margin: "20px 0" }} />
          {/* <CommentSection post={post} /> */}
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={dazzle_it.images}>
          <img
            className={dazzle_it.media}
            src={
              post.selectedFile ||
              {noImage}
            }
            alt={post.title}
          />
        </div>
      </div>{" "}
    </Paper>
  );
};

export default PostDetails;
