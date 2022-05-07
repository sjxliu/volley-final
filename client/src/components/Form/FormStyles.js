import { makeStyles } from "@material-ui/core";

export default makeStyles((main) => ({
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  writeOn: {
    padding: main.spacing(3),
  },
  base: {
    "& .MuiTextField-base": {
      margin: main.spacing(1),
    },
  },
  upload: {
    width: "75%",
    margin: "10px 0",
  },
  subBtn: {
    marginBottom: 10,
  },
}));
