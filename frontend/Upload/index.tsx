import React, { useCallback, useState, useEffect, Fragment } from "react"
import { useDropzone } from "react-dropzone"
import styled from "styled-components"
import { Redirect } from "react-router-dom"
import { Button } from "../util/Button"

const Wrapper = styled.div`
  padding-top: 3rem;
  padding-bottom: 10rem;
`

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`

const Form = styled.input`
  display: inline-block;
  box-sizing: border-box;
  margin: 0.3rem 0;
  font-size: 0.9rem;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  height: 40px;
  line-height: 40px;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  :hover {
    border-color: #c0c4cc;
  }
  :focus {
    outline: none;
    border-color: #409eff;
  }
  ::placeholder {
    color: #c0c4cc;
  }
`

const getColor = props => {
  if (props.isDragAccept) {
    return "#00e676"
  }
  if (props.isDragReject) {
    return "#ff1744"
  }
  if (props.isDragActive) {
    return "#2196f3"
  }
  return "#eeeeee"
}

const ThumbsContainer = styled.aside`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 16px;
`

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
`

const ThumbInner = styled.div`
  display: flex;
  min-width: 0;
  overflow: hidden;
`

const ThumbImg = styled.img`
  display: block;
  width: auto;
  height: 100%;
`

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
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const Upload = () => {
  const [files, setFiles] = useState([])
  const [columns, setColumns] = useState("")
  const [name, setName] = useState("")
  const [id, setId] = useState("")
  const [uploading, setUploading] = useState(false)
  const [successfulUploaded, setSuccessfulUploaded] = useState(false)

  const onDrop = useCallback(acceptedFiles => {
    setFiles(
      acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    )
  }, [])

  const uploadFiles = useCallback(async () => {
    try {
      const response = await sendRequest(files)
      const dbId = await response.text()
      setId(dbId)
      setUploading(false)
      setSuccessfulUploaded(true)
    } catch (e) {
      setUploading(false)
      setSuccessfulUploaded(false)
    }
  }, [files])

  const sendRequest = async files => {
    const formData = new FormData()
    files.forEach(file => {
      formData.append("file", file, file.name)
    })
    formData.append("label", name)
    formData.append("column", columns)
    return fetch("http://localhost:3333/upload", {
      method: "POST",
      body: formData
    })
  }

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    isDragAccept
  } = useDropzone({ onDrop, accept: "image/*" })

  const thumbs = files.map(file => (
    <Thumb key={file.name}>
      <ThumbInner>
        <ThumbImg src={file.preview} />
      </ThumbInner>
    </Thumb>
  ))

  useEffect(
    () => () => {
      files.forEach(file => URL.revokeObjectURL(file.preview))
    },
    [files]
  )

  if (successfulUploaded) return <Redirect to={"tasks/" + id} />

  return (
    <Wrapper>
      <FormWrapper>
        <Form
          placeholder="Label"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Form
          placeholder="Vertical Division"
          type="number"
          min="1"
          value={columns}
          onChange={e => setColumns(e.target.value)}
        />
      </FormWrapper>
      <Container
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
      >
        <input {...getInputProps()} />
        <p>Drag and drop images(jpg/png) here, or click to select.</p>
      </Container>
      <ThumbsContainer>{thumbs}</ThumbsContainer>
      <ButtonContainer>
        <Button
          disabled={
            name === "" || columns === "" || files.length === 0 || uploading
          }
          onClick={uploadFiles}
        >
          送信する
        </Button>
      </ButtonContainer>
    </Wrapper>
  )
}
