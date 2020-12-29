import React, { useState } from 'react'
import {ImageUpload} from '../../components/FIrebase/firebaseConnect'
import { compareAsc, format } from 'date-fns'
import styles from "assets/jss/nextjs-material-kit/pages/componentsSections/typographyStyle.js";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(styles);
export default function UploadImage({
    setImageLink,
    ...props
}) {
    const classes = useStyles();
    const dateTime = format(new Date(), 'yyyyMMddHHmmss')
    const [imageUrl, setimageUrl] = useState();
    const readImage = async (e) => {
        const file = e.target.files[0]
        const imageRef = ImageUpload.ref(dateTime+file?.name)
        await imageRef.put(file)
        imageRef.getDownloadURL().then((url) => {
            setimageUrl(url)
            setImageLink(url)
        })
    }
    return (
        <div>
            <input type='file' accept='image/*' onChange={readImage} />
            <img src={imageUrl}
            className={classes.imgRounded + " " + classes.imgFluid}/>
        </div>
    )
}