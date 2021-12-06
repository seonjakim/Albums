import React from 'react'
import styled from 'styled-components'
import ModalBackground from './ModalBackground'

const CreateAlbum = ({
  currentAlbum,
  setCurrentAlbum,
  doneBtnClick,
  cancelBtnClick,
}) => {
  const [hasEmptyVal, setHasEmptyVal] = React.useState(true)
  const checkEmptyVal = (obj) =>
    Object.values(obj).some((value) => value.length === 0)

  React.useEffect(() => {
    if (!checkEmptyVal(currentAlbum)) setHasEmptyVal(false)
    else setHasEmptyVal(true)
  }, [currentAlbum])

  const uploadFileToUrl = (event) => {
    event.preventDefault()
    const reader = new FileReader()
    const file = event.target.files[0]
    console.log(file)
    reader.onloadend = () => {
      setCurrentAlbum({
        ...currentAlbum,
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
          value={currentAlbum.title}
          type="text"
          placeholder="title"
          onChange={(event) =>
            setCurrentAlbum({ ...currentAlbum, title: event.target.value })
          }
        />
        <input
          type="file"
          accept="image/jpg,impge/png,image/jpeg,image/gif"
          onChange={uploadFileToUrl}
        />
        <img
          src={
            currentAlbum.img.length
              ? currentAlbum.img
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
