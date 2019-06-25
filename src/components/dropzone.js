import React, { useEffect, useState, useMemo } from "react"
import styled from "styled-components"
import { useDropzone } from "react-dropzone"

const colorWhen = ({ isDragAccept, isDragReject, isDragActive }) => {
  if (isDragAccept) {
    return "#00e676"
  }

  if (isDragReject) {
    return "#ff1744"
  }

  if (isDragActive) {
    return "#2196f3"
  }

  return "#eeeeee"
}

const DropContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => colorWhen(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`

const Thumbnail = styled.img`
  justify-content: center;
  align-items: center;
  max-height: 320px;
  width: auto;
`

export default () => {
  const [file, setFile] = useState()

  useEffect(() => () => file && URL.revokeObjectURL(file.preview), [file])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/*",

    onDrop: ([file]) => {
      setFile(
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    },
  })

  return (
    <>
      <DropContainer
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
      >
        <input {...getInputProps()} />
        {file ? (
          <Thumbnail src={file.preview} />
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </DropContainer>
    </>
  )
}
