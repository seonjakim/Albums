import React from 'react'
import styled from 'styled-components'
import ModalBackground from './ModalBackground'

const AlbumWindow = ({ modalBackgroundClick, currentAlbum }) => {
  return (
    <>
      <ModalBackground modalBackgroundClick={modalBackgroundClick} />
      <StyledAlbumWindow>
        <h2>{currentAlbum?.title}</h2>
        <img src={currentAlbum?.img} alt="album-photo" />
      </StyledAlbumWindow>
    </>
  )
}

export default AlbumWindow

const StyledAlbumWindow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  max-width: 80vw;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 4px;
  padding: 2em;
  h2 {
    margin-bottom: 8px;
  }
`
