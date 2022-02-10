import React from 'react'
import { useMutation, gql } from '@apollo/client'

const UPLOAD_FILE = gql`
    mutation uploadFile($file:Upload!){
        uploadFile(file:$file){
            
            url
        }
    }
`
//console.log(UPLOAD_FILE);
export default function UploadFrom() {
    const [uploadFile] = useMutation(UPLOAD_FILE, {
        onCompleted: data => console.log(data)
    })

    const handleFileChange = e => {
        let file = e.target.files
        let output = document.getElementById('listing');
        let filedetails = '';

        // console.log(e.target.files)
        for (let i = 0; i < file.length; i++) {
            if (!file[i]) return
            uploadFile({ variables: { file } })
        }

        for (let i = 0; i < file.length; i++) {
            let item = document.createElement('li');
            item.innerHTML = ''
            filedetails = 'Pathname: ' + file[i].webkitRelativePath + ' Name: ' + file[i].name + ' Type: ' + file[i].type + ' size: ' + file[i].size
            item.innerHTML = filedetails
            output.appendChild(item);


        };
    }
    return (
        <div>
            <h1>Upload Folder</h1>
            <input type="file" onChange={handleFileChange} webkitdirectory="true" mozdirectory="true" directory="true" />
            <ul id="listing"></ul>
        </div>
    )
}
