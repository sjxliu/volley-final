import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";

import { getPosts } from "../actionsTypes/posts";

import useStyles from "./FolioStyles.js";

const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.posts);
  const dazzle_it = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [page]);

  return (
    <Pagination
      dazzle_it={{ ul: dazzle_it.ul }}
      color="primary"
      variant="outlined"
      count={numberOfPages}
      page={Number(page) || 1}
      renderItem={(item) => (
        <PaginationItem
          {...item}
          element={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;
