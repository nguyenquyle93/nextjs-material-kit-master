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
import firebase from 'firebase/app'
import { connectData, connectData2, connectData3, connectData4, connectData5, connectData6, newPost } from 'components/FIrebase/firebaseConnect'
import { message, Row, Col, Card, Input, AutoComplete, Select } from 'antd'

import styles from "assets/jss/nextjs-material-kit/pages/landingPageSections/workStyle.js";
const useStyles = makeStyles(styles);
const { Option } = Select;
const pageOptions = ["user", "post", "request", "chart/ECharts", "chart/highCharts", "pages6", "chart/Recharts"]

export default function EditorSection() {
  const classes = useStyles();
  const editorRef = useRef();
  const [content, setContent] = useState('');
  const [htmlContent, setHtmlContent] = useState();
  const [title, setTitle] = useState();
  const [imageLink, setImageLink] = useState();
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [page, setPage] = useState();
  const [pageLink, setPageLink] = useState();
  const [pagePost, setPagePost] = useState();

  const update = (value) => {
    // value.on('value', (notes) => {
    //   var arrayData = []
    //   notes.forEach((element) => {
    //     const id = element.key
    //     const title = element.val().title
    //     const imageLink = element.val().imageLink
    //     const content = element.val().content
    //     const createAt = element.val().createAt
    //     arrayData.push({
    //       id: id,
    //       title: title,
    //       imageLink: imageLink,
    //       content: content,
    //       createAt: createAt,
    //       editorContent: content
    //     })
    //   })
    //   setData(arrayData)
    // })
    console.log("11111")
  }
  const onsuccess = () => {
    setHtmlContent(null)
    setTitle(null)
    setImageLink(null)
    setData([])
    setDataFilter([])
  }

  useEffect(() => {
    update(page)
  }, []);

  // const onEditorStateChange = (editorContent) => {
  //   setEditorContent(editorContent);
  //   setHtmlContent(draftToHtml(convertToRaw(editorContent.getCurrentContent())));
  // }

  const handleInputChange = (e) => {
    setTitle(e.target.value)
  }

  const handleImageLinkChange = (e) => {
    setImageLink(e.target.value)
  }

  const handleCreate = () => {
    page.push({
      title: title,
      content: htmlContent,
      imageLink: imageLink,
      createAt: new Date().getTime(),
    })
    newPost.push({
      title: title,
      content: htmlContent,
      imageLink: imageLink,
      createAt: new Date().getTime(),
      pageLink: pageLink
    })
    // message.success(`Bạn đã đăng bài ${title} thành công !!!`)
    onsuccess()
  }

  const handleEdit = (id) => {
    page.child(id).set({
      title: title,
      content: htmlContent,
      imageLink: imageLink,
      createAt: dataFilter[0].createAt,
    })
    // message.success(`Bạn đã chỉnh sữa bài ${title} thành công !!!`)
    onsuccess()
  }

  const handleDelete = (id) => {
    page.child(id).remove();
    // message.success(`Bạn đã xóa bài ${dataFilter[0].title} thành công !!!`)
    onsuccess()
  }

  const onSelect = (value) => {
    const a = data.filter((item) => {
      return item.title === value.toString()
    })
    const content = ContentState.createFromText(a[0].content)
    setDataFilter(a)
    setTitle(a[0].title)
    setImageLink(a[0].imageLink)
  }

  const onChangePage = (index) => {
    const value = index.target.value
    const pageSelect = [connectData, connectData2, connectData3, connectData4, connectData5, connectData6, newPost]
    // onsuccess()
    setPage(pageSelect[value])
    setPageLink(pageOptions[index])
    // update(pageSelect[index])
    setPagePost(index)
  }

  const handleContentChange = (e) => {
    setContent(e)
    console.log("111111",e)
  }
  return (
    <div className={classes.textCenter}>
      <GridContainer >
      <GridItem xs={12} sm={12} md={6}>
                {/* <InputLabel id="demo-simple-select-helper-label">Age</InputLabel> */}
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={pagePost}
                  onChange={onChangePage}
                >
                  {pageOptions.map((item, index) => <MenuItem value={index}>{item}</MenuItem>)}
                </Select>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <AutoComplete
                  style={{ width: "100%", marginTop: 10 }}
                  size="large"
                  placeholder="tile search"
                  options={data?.map((item) => {
                    return { ...item, value: item.title }
                  })}
                  onSelect={onSelect}
                // filterOption={(inputValue, option) =>
                //   option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                //   -1
                // }
                />
              </GridItem>
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
