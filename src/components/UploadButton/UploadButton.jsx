import { useState } from "react";
import "./upload-button.css"


function UploadButton({imageName, onUploadEvent}) {

  return (
    <div class="custom-file-upload">
      <i className="pi pi-upload" style={{paddingRight:"10px" , color: 'slateblue' }}></i>
      <label for="fileInput">{imageName ? imageName : "Choose File"}</label>
      <input type="file" id="fileInput" onChange={onUploadEvent} style={{display: "none"}}></input>
    </div>
  );
}


export default UploadButton