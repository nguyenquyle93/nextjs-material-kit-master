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
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import firebase from 'firebase/app'
import { connectData, connectData2, connectData3, connectData4, connectData5, connectData6, newPost } from 'components/FIrebase/firebaseConnect'
import { message} from 'antd'

import styles from "assets/jss/nextjs-material-kit/pages/landingPageSections/editorStyle.js";
const useStyles = makeStyles(styles);
const { Option } = Select;
const pageOptions = ["the-thao", "casino", "slot", "xo-so", "khuyen-mai", "ve-chung-toi", "ho-tro"]

export default function EditorSection() {
  const classes = useStyles();
  const editorRef = useRef();
  const [content, setContent] = useState('');
  const [htmlContent, setHtmlContent] = useState();
  const [title, setTitle] = useState();
  const [imageLink, setImageLink] = useState();
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [page, setPage] = useState(connectData);
  const [pageLink, setPageLink] = useState("the-thao");
  const [pagePost, setPagePost] = useState(0);

  const update = (value) => {
    value.on('value', (notes) => {
      var arrayData = []
      notes.forEach((element) => {
        const id = element.key
        const title = element.val().title
        const imageLink = element.val().imageLink
        const content = element.val().content
        const createAt = element.val().createAt
        const pageLink = element.val().pageLink
        arrayData.push({
          id: id,
          title: title,
          imageLink: imageLink,
          content: content,
          createAt: createAt,
          pageLink: pageLink
        })
      })
      setData(arrayData)
    })
  }

  // const onsuccess = () => {
  //   setContent(null)
  //   setTitle(null)
  //   setImageLink(null)
  //   setData([])
  //   setDataFilter([])
  // }

  useEffect(() => {
    update(page)
  }, []);

  // const onEditorStateChange = (editorContent) => {
  //   setEditorContent(editorContent);
  //   setHtmlContent(draftToHtml(convertToRaw(editorContent.getCurrentContent())));
  // }


  const handleCreate = () => {
    console.log("1111111aaaaa",pageLink)
    page.push({
      title: title,
      content: content,
      imageLink: imageLink,
      createAt: new Date().getTime(),
      pageLink: pageLink,
    })
      .then(() => {
      message.success(`Bạn đã đăng bài ${title} thành công !!!`)
      // onsuccess()
    })
    newPost.push({
      title: title,
      content: content,
      imageLink: imageLink,
      createAt: new Date().getTime(),
      pageLink: pageLink
    })
    .then(() => {
      message.success(`Bạn đã đăng bài ${title} thành công !!!`)
      // onsuccess()
    })
    // onsuccess()
  }

  const handleEdit = (id) => {
    page.child(id).set({
      title: title,
      content: htmlContent,
      imageLink: imageLink,
      createAt: dataFilter[0].createAt,
      pageLink: pageLink
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
    setPageLink(pageOptions[value])
    // update(pageSelect[index])
    setPagePost(index)
  }

  const handleContentChange = (e) => {
    setContent(e)
  }

  const handleTitleChange = (event) => {
    const value = event.target.value
    setTitle(value)
  }
  const handleImageChange = (event) => {
    const value = event.target.value
    setImageLink(value)
  }
  return (
    <div className={classes.textCenter}>
      <GridContainer >
              <GridItem xs={12} sm={12} md={6}>
                <FormControl className={classes.formControl}>
                <InputLabel id="page">Page Select</InputLabel>
                <Select
                  labelId="page"
                  id="page"
                  // value={pagePost}
                  onChange={onChangePage}
                >
                  {pageOptions.map((item, index) => <MenuItem value={index}>{item}</MenuItem>)}
                </Select>
                </FormControl>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                {/* <AutoComplete
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
                /> */}
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
              <CustomInput
                  labelText="Title"
                  id="title"
                  formControlProps={{
                    fullWidth: true
                  }}
                  value = {title}
                  inputProps={{
                    onChange:handleTitleChange
                  }}

                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Avatar"
                  id="avatar"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange:handleImageChange
                  }}
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
        <GridItem xs={12} sm={12} md={4} className={classes.textCenter}>
                <Button 
                color="primary"
                onClick={handleCreate}
                disabled={!content || !title || !imageLink}
                >Create</Button>
          </GridItem>
      </GridContainer>
    </div>
  );
}
