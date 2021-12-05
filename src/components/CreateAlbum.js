import React from 'react'
import styled from 'styled-components'

const CreateAlbum = ({
  newAlbum,
  setNewAlbum,
  modalOpen,
  uploadAlbum,
  newAlbumId,
}) => {
  const [hasEmptyVal, setHasEmptyVal] = React.useState(true)
  const checkEmptyVal = (obj) =>
    Object.values(obj).some((value) => value.length === 0)

  React.useEffect(() => {
    setNewAlbum({
      ...newAlbum,
      id: newAlbumId,
    })
  }, [newAlbumId])
  React.useEffect(() => {
    if (!checkEmptyVal(newAlbum)) setHasEmptyVal(false)
    else setHasEmptyVal(true)
  }, [newAlbum])

  const uploadFileToUrl = (event) => {
    event.preventDefault()
    const reader = new FileReader()
    const file = event.target.files[0]
    console.log(file)
    reader.onloadend = () => {
      setNewAlbum({
        ...newAlbum,
        img: reader.result,
      })
    }
    reader.readAsDataURL(file)
  }

  const submitAlbum = (newAlbum) => {
    uploadAlbum(newAlbum)
    setNewAlbum({
      id: newAlbumId + 1,
      title: '',
      img: '',
    })
  }
  return (
    <>
      {modalOpen && (
        <StyledModal>
          <div>
            <input
              value={newAlbum.title}
              type="text"
              placeholder="title"
              onChange={(event) =>
                setNewAlbum({ ...newAlbum, title: event.target.value })
              }
            />
            <input
              type="file"
              accept="image/jpg,impge/png,image/jpeg,image/gif"
              onChange={uploadFileToUrl}
            />
            <StyledButton
              disabled={hasEmptyVal}
              onClick={() => submitAlbum(newAlbum)}
            >
              Done
            </StyledButton>
            <button>cancel</button>
          </div>
        </StyledModal>
      )}
    </>
  )
}

export default CreateAlbum

const StyledModal = styled.div`
  position: fixed;
  height: 100vh;
  width: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);

  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50vw;
    min-width: 300px;
    padding: 2em;
    background-color: #fff;
    border-radius: 4px;
  }
`
const StyledButton = styled.button`
  background-color: ${({ theme, disabled }) =>
    disabled ? '#ccc' : theme.button.color};
  padding: 0.5em 1em;
  border-radius: 4px;
  color: ${({ disabled }) => (disabled ? '#666' : '#fff')};
`
