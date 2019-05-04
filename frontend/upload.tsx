import React, { useCallback, useState, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import styled from "styled-components"

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

export function Upload() {
  const [files, setFiles] = useState([])
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
    // const reader = new FileReader()

    // reader.onabort = () => console.log("file reading was aborted")
    // reader.onerror = () => console.log("file reading has failed")
    // reader.onload = () => {
    //   // Do whatever you want with the file contents
    //   const binaryStr = reader.result
    //   console.log(binaryStr)
    // }

    // acceptedFiles.forEach(file => reader.readAsBinaryString(file))
  }, [])

  const uploadFiles = useCallback(async () => {
    console.log("今から送る")
    console.log(files)
    const promises = []
    files.forEach(file => {
      console.log(file)
      promises.push(sendRequest(file))
    })
    try {
      await Promise.all(promises)
      console.log("送り終わった")
      setUploading(false)
      setSuccessfulUploaded(true)
    } catch (e) {
      console.log(e)
      setUploading(false)
      setSuccessfulUploaded(false)
    }
  }, [files])

  const sendRequest = file => {
    console.log("asdf")
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest()

      const formData = new FormData()
      formData.append("file", file, file.name)
      console.log(formData)
      req.open("POST", "http://localhost:3333/upload")
      req.send(formData)
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
    <Thumb ket={file.name}>
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

  return (
    <div>
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
    </div>
  )
}

function Foo() {
  const memoizedHandleClick = useCallback(() => {
    console.log("Click happened")
  }, []) // Tells React to memoize regardless of arguments.
  return <button onClick={memoizedHandleClick}>Click Me</button>
}
