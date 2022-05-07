import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  heading: {
    color: "rbga(2, 68, 66)",
  },
  image: {
    marginLeft: "15px",
  },
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  [theme.breakpoints.down('sm')]: {
    main:{
      flexDirection: "column-reverse"
    }
  }
}));
