import { title } from "assets/jss/nextjs-material-kit.js";

const editorStyle = {
  section: {
    backgroundColor: "#FFFFFF",
    display: "block",
    width: "100%",
    position: "relative",
    padding: "0"
  },
  margin:{
    margin: "auto"
  },
  formControl: {
    margin: 10,
    minWidth: '100%',
  },
  selectEmpty: {
    marginTop: 10,
  },
  autoSelect: {
    margin: 10,
  },
  section: {
    padding: "70px 0"
  },
  title: {
    ...title,
    marginBottom: "50px",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
    textAlign: "center"
  },
  description: {
    color: "#999",
    textAlign: "center"
  },
  textCenter: {
    color: "#999",
    textAlign: "center"
  },
  textArea: {
    marginRight: "15px",
    marginLeft: "15px"
  }
};

export default editorStyle;
