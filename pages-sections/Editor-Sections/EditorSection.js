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
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import firebase from 'firebase/app'
import { connectData, connectData2, connectData3, connectData4, connectData5, connectData6, newPost } from 'components/FIrebase/firebaseConnect'
import { message} from 'antd'
import Check from "@material-ui/icons/Check";

import styles from "assets/jss/nextjs-material-kit/pages/landingPageSections/editorStyle.js";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import SnackbarContent from './../../components/Snackbar/SnackbarContent';
import UploadImage from './UploadImage';
import Dictaphone from "./Recognition";
const useStyles = makeStyles(styles);
const { Option } = Select;
const pageOptions = ["the-thao", "casino", "slot", "xo-so", "khuyen-mai", "ve-chung-toi", "ho-tro"]


export default function EditorSection() {
  const classes = useStyles();
  const editorRef = useRef();
  const [content, setContent] = useState('');
  const [htmlContent, setHtmlContent] = useState();
  const [title, setTitle] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [page, setPage] = useState(connectData);
  const [pageLink, setPageLink] = useState("the-thao");
  const [pagePost, setPagePost] = useState(0);
  const [alertOpen, setAlertOpen] = useState(false);
  const [action, setAction] = useState('');

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

  const onsuccess = () => {
    setContent('')
    setTitle('')
    setImageLink('')
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


  const handleCreate = () => {
    page.push({
      title: title,
      content: content,
      imageLink: imageLink,
      createAt: new Date().getTime(),
      pageLink: pageLink,
    })
      .then(() => {
        setAlertOpen(true)
        setAction('đăng bài')
    })
    newPost.push({
      title: title,
      content: content,
      imageLink: imageLink,
      createAt: new Date().getTime(),
      pageLink: pageLink
    })
    .then(() => {
      onsuccess()
    })
    // onsuccess()
  }

  const handleEdit = () => {
    page.child(dataFilter[0].id).set({
      title: title,
      content: content,
      imageLink: imageLink,
      createAt: dataFilter[0].createAt,
      pageLink: pageLink
    })
    .then(() => {
      setAlertOpen(true)
      setAction('sữa bài')
      onsuccess
    })
    // message.success(`Bạn đã chỉnh sữa bài ${title} thành công !!!`)
  }

  const handleDelete = () => {
    page.child(dataFilter[0].id).remove()
    .then(() => {
      setAlertOpen(true)
      setAction('xóa bài')
      onsuccess
    })
    ;
  }

  const onTitleSelect = (value) => {
    if(value.length === 0){return onsuccess()}
    const a = data.filter((item) => {
      return item.id === value.toString()
    })
    setContent(a[0]?.content)
    setTitle(a[0]?.title.toString())
    setImageLink(a[0]?.imageLink)
    setDataFilter(a)
  }
  const onChangePage = (index) => {
    const value = index.target.value
    const pageSelect = [connectData, connectData2, connectData3, connectData4, connectData5, connectData6, newPost]
    // onsuccess()
    setPage(pageSelect[value])
    setPageLink(pageOptions[value])
    // update(pageSelect[index])
    setPagePost(value)
    update(pageSelect[value])
  }

  const handleContentChange = (e) => {
    setContent(e)
  }

  const handleTitleChange = (event) => {
    const value = event.target.value
    setTitle(value)
  }
  const handleImageChange = (event) => {
    setImageLink(event)
    // console.log('11111111 đã kết nối thành công')
  }


  return (
    <div className={classes.textCenter}>
      <GridContainer >
            <Snackbar open={alertOpen} autoHideDuration={3000} onClose={()=>setAlertOpen(false)}>
              <MuiAlert onClose={()=>setAlertOpen(false)} severity="success" variant="filled">
                Bạn đã {action} {title} thành công !
              </MuiAlert>
            </Snackbar>
              <GridItem xs={12} sm={12} md={6}>
                <FormControl className={classes.formControl}>
            <InputLabel id="page">Page Select</InputLabel>
                <Select
                  labelId="page"
                  id="page"
                  value={pagePost}
                  onChange={onChangePage}
                >
                  {pageOptions.map((item, index) => <MenuItem value={index}>{item}</MenuItem>)}
                </Select>
                </FormControl>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
              <Autocomplete
                className={classes.autoSelect}
                id="auto-complete"
                autoComplete
                options={data}
                onInputChange={(event, data) => {
                  onTitleSelect(data);
                }}
                getOptionLabel={(option) => option.id?option.id:''}
                renderOption={(option) => (
                  <React.Fragment>
                    <span>{option.title}</span>
                  </React.Fragment>
                )}
                renderInput={(params) => <TextField {...params} label="Title Select"  />}
               />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
              <CustomInput
                  labelText="Title"
                  id="title"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    value:title,
                    onChange:handleTitleChange
                  }}

                />
              </GridItem>
              <GridItem xs={12} sm={12} md={2}>
                <CustomInput
                  labelText="Avatar"
                  id="avatar"
                 
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    value:imageLink,
                    onChange:handleImageChange
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4} className={classes.margin}>
                <UploadImage setImageLink={setImageLink}/>
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
            // buttonList: buttonList.formatting // Or Array of button list, eg. [['font', 'align'], ['image']]
            buttonList: [
              ['undo', 'redo',
              'font', 'fontSize', 'formatBlock',
              'paragraphStyle', 'blockquote',
              'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript',
              'fontColor', 'hiliteColor', 'textStyle',
              'removeFormat',
              'outdent', 'indent',
              'align', 'horizontalRule', 'list', 'lineHeight',
              'table', 'link', 'image', 'video', 'audio', /** 'math', */ // You must add the 'katex' library at options to use the 'math' plugin.
              /** 'imageGallery', */ // You must add the "imageGalleryUrl".
              'fullScreen', 'showBlocks', 'codeView',
              'preview', 'print', 'save', 'template']
          ]
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
        <GridItem xs={12} sm={12} md={4} className={classes.textCenter}>
                <Button 
                color="success"
                onClick={handleEdit}
                disabled={!content || !title || !imageLink}
                >Edit</Button>
          </GridItem>
        <GridItem xs={12} sm={12} md={4} className={classes.textCenter}>
                <Button 
                color="danger"
                onClick={handleDelete}
                disabled={!content || !title || !imageLink}
                >Delete</Button>
          </GridItem>
      </GridContainer>
    </div>
  );
}
