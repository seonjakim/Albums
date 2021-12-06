import React from 'react'
import styled from 'styled-components'
import ModalBackground from './ModalBackground'

const CreateAlbum = ({
  newAlbum,
  setNewAlbum,
  doneBtnClick,
  cancelBtnClick,
}) => {
  const [hasEmptyVal, setHasEmptyVal] = React.useState(true)
  const checkEmptyVal = (obj) =>
    Object.values(obj).some((value) => value.length === 0)

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

  return (
    <>
      <ModalBackground modalBackgroundClick={cancelBtnClick} />
      <StyledPostAlbumContainer>
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
        <img
          src={
            newAlbum.img.length
              ? newAlbum.img
              : 'https://edgepharm.com/wp-content/uploads/2020/01/image-placeholder.jpg'
          }
          alt="album-photo"
        />
        <div>
          <button onClick={cancelBtnClick}>cancel</button>
          <StyledButton disabled={hasEmptyVal} onClick={doneBtnClick}>
            Done
          </StyledButton>
        </div>
      </StyledPostAlbumContainer>
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
`

const StyledPostAlbumContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2em;
  background-color: #fff;
  border-radius: 4px;
  display: grid;
  grid-template-rows: repeat(4, auto);
  grid-template-columns: 1fr;
  gap: 8px;
  input[type='text'] {
    padding: 0.5em 1em;
  }
  img {
    width: 450px;
  }
  button {
    padding: 0.5em 1em;
    border-radius: 4px;
    margin-right: 8px;
    &:first-child {
      background-color: transparent;
      border: ${({ theme }) => theme.border.main};
    }
  }
`
const StyledButton = styled.button`
  background-color: ${({ theme, disabled }) =>
    disabled ? '#ccc' : theme.button.color};
  color: ${({ disabled }) => (disabled ? '#666' : '#fff')};
  font-weight: 700;
`
