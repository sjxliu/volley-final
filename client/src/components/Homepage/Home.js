import React, { useEffect, useState } from "react";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import { getSearchedPosts } from "../../actionsTypes/posts";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import useStyles from "./HomeStyles";
import Folio from "../Folio";
import { Pagination } from "@material-ui/lab";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dazzle_it = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
 
  const searchPost = () => {
    if (search.trim() ) {
      dispatch(getSearchedPosts({ search}));
      navigate(
        `/posts/search?searchQuery=${search || null}`
      );
    } else {
      navigate("/");
    }
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };



  //const handleDelete = (tagToDelete) =>
   // setTags(tags.filter((tag) => tag !== tagToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          className={dazzle_it.container}
          spacing={3}
          justifyContent="space-between"
          alignItems="stretch"
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} md={3} sm={6}>
            <AppBar
              className={dazzle_it.search}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleEnter}
              />
              {/* <ChipInput
                label="Search Tags"
                variant="outlined"
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
              /> */}
              <Button
                onClick={searchPost}
                variant="contained"
                className={dazzle_it.search}
                color="primary"
              ></Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            
            {/* if no tags or search*/}
            {!searchQuery && 
            // !tags.length
            //  && 
             (
              <Paper className={dazzle_it.pagination} elevation={6}>
                <Folio page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
