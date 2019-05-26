import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px;
`;

const getColor = props => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isDragActive) {
    return "#2196f3";
  }
  return "#eeeeee";
};

const ThumbsContainer = styled.aside`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 16px;
`;

const Thumb = styled.div`
  display: inline-flex;
  border-radius: 2;
  border: 1px solid #eaeaea;
  margin-bottom: 8;
  margin-right: 8;
  width: 100;
  height: 100;
  padding: 4;
  box-sizing: border-box;
`;

const ThumbInner = styled.div`
  display: flex;
  min-width: 0;
  overflow: hidden;
`;

const ThumbImg = styled.img`
  display: block;
  width: auto;
  height: 100%;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  height: 200px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin: 40px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export function Upload() {
  const [files, setFiles] = useState([]);
  const [columns, setColumns] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [uploading, setUploading] = useState(false);
  const [successfulUploaded, setSuccessfulUploaded] = useState(false);

  const onDrop = useCallback(acceptedFiles => {
    setFiles(
      acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    );
    // const reader = new FileReader()

    // reader.onabort = () => console.log("file reading was aborted")
    // reader.onerror = () => console.log("file reading has failed")
    // reader.onload = () => {
    //   // Do whatever you want with the file contents
    //   const binaryStr = reader.result
    //   console.log(binaryStr)
    // }

    // acceptedFiles.forEach(file => reader.readAsBinaryString(file))
  }, []);

  const uploadFiles = useCallback(async () => {
    try {
      const response = await sendRequest(files);
      const dbId = await response.text();
      setId(dbId);
      console.log(`${dbId}を保存しました`);
      setUploading(false);
      setSuccessfulUploaded(true);
    } catch (e) {
      console.log(e);
      setUploading(false);
      setSuccessfulUploaded(false);
    }
  }, [files]);

  const sendRequest = async files => {
    console.log(`Now start to send server: Task: ${name}, Divide: ${columns}`);
    const formData = new FormData();
    files.forEach(file => {
      formData.append("file", file, file.name);
    });
    formData.append("label", name);
    formData.append("column", columns);
    return fetch("http://localhost:3333/upload", {
      method: "POST",
      body: formData
    });
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    isDragAccept
  } = useDropzone({ onDrop, accept: "image/*" });

  const thumbs = files.map(file => (
    <Thumb key={file.name}>
      <ThumbInner>
        <ThumbImg src={file.preview} />
      </ThumbInner>
    </Thumb>
  ));

  useEffect(
    () => () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  if (successfulUploaded) return <Redirect to={"tasks/" + id} />;

  return (
    <div>
      <FormWrapper>
        <label>
          Annotation Label
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>
        <label>
          Vertical Division
          <input
            type="number"
            min="1"
            value={columns}
            onChange={e => setColumns(e.target.value)}
          />
        </label>
      </FormWrapper>
      <Container
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
      >
        <input {...getInputProps()} />
        <p>Drag and drop some files here, or click to select files</p>
      </Container>
      <ThumbsContainer>{thumbs}</ThumbsContainer>
      <ButtonContainer>
        <button onClick={uploadFiles}>送信する</button>
      </ButtonContainer>
      <a href="http://localhost:1234/admin">管理画面へ</a>
    </div>
  );
}
