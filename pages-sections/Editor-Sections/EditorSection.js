import React, { useState, useRef, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import SunEditor,{buttonList} from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; 
import { FormControl } from '@material-ui/core';

import styles from "assets/jss/nextjs-material-kit/pages/landingPageSections/workStyle.js";
const useStyles = makeStyles(styles);

export default function EditorSection() {
  const classes = useStyles();
  const editorRef = useRef();
  const [content, setContent] = useState('');
  useEffect(() => {
    // Get underlining core object here
    // Notice that useEffect is been used because you have to make sure the editor is rendered.
    console.log(editorRef.current.editor.core);
}, []);

  const handleContentChange = (e) => {
    setContent(e)
    console.log("111111",e)
  }
  return (
    <div className={classes.textCenter}>
      <GridContainer >
            <GridItem cs={12} sm={12} md={12}>
            <SunEditor 
            ref={editorRef}
            lang="en"
            height="70vh"
            width="100%"
            placeholder="Please type here..."
            setContents={content}
            onChange={handleContentChange}
            setOptions={{
            height: 200,
            buttonList: buttonList.formatting // Or Array of button list, eg. [['font', 'align'], ['image']]
            // Other option
        }}
            />
        </GridItem>
      </GridContainer>
    </div>
  );
}
