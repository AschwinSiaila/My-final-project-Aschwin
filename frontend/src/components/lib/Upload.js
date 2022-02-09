import React, { useState } from "react";

const Upload = () => {
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    console.log("submitting");
    e.preventDefault();
    if (!previewSource) return;
    uploadImage(previewSource);
    //   const reader = new FileReader();
    //   reader.readAsDataURL(selectedFile);
  };
  const uploadImage = (base64EncodedImage) => {
    console.log(base64EncodedImage);
  };

  return (
    <div>
      <h1>Upload</h1>
      <form className="uploadForm" onsubmit={handleSubmitFile}>
        <input type="file" name="image" onChange={handleFileInputChange} value={fileInputState} className="form-input" />
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
      {previewSource && <img src={previewSource} alt="chosen" style={{ height: "300px" }} />}
    </div>
  );
};

export default Upload;
