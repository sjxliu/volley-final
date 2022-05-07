import { makeStyles } from "@material-ui/core";

export default makeStyles({
  content: {
    height: 0,
    paddingTop: "56.25%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundBlendMode: "darken",
  },
  title: {
    padding: "0 16px",
  },
  grid: {
    display: "flex",
  },
  border: {
    border: "solid",
  },
  topOver: {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "white",
  },
  bottomOver: {
    position: "absolute",
    top: "20px",
    right: "20px",
    color: "white",
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "15px",
    height: "100%",
    position: "relative",
  },
  fullCard: {
    height: "100%",
  },
  actions: {
    padding: "0 16px 8px 16px",
    display: "flex",
    justifyContent: "space-between",
  },
});
