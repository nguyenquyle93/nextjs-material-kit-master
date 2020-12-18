import React, { useState } from 'react'
import {ImageUpload} from '../../components/FIrebase/firebaseConnect'
import { compareAsc, format } from 'date-fns'

export default function UploadImage() {
    const dateTime = format(new Date(), 'yyyyMMddHHmmss')
    const [imageUrl, setimageUrl] = useState();
    const readImage = async (e) => {
        const file = e.target.files[0]
        const imageRef = ImageUpload.ref(dateTime+file?.name)
        await imageRef.put(file)
        imageRef.getDownloadURL().then((url) => {
            setimageUrl(url)
        })
    }
    console.log("111111111",imageUrl)
    return (
        <div>
            <h1>Upload</h1>
            <input type='file' accept='image/*' onChange={readImage} />
            <image src={imageUrl}></image>=
        </div>
    )
}