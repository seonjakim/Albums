import React from 'react'
import styled from 'styled-components'
import ModalBackground from './ModalBackground'

const AlbumWindow = ({ modalBackgroundClick, currentAlbum }) => {
  return (
    <ModalBackground modalBackgroundClick={modalBackgroundClick}>
      <StyledAlbumWindow>
        <h2>{currentAlbum?.title}</h2>
        <img src={currentAlbum?.img} alt="album-photo" />
      </StyledAlbumWindow>
    </ModalBackground>
  )
}

export default AlbumWindow

const StyledAlbumWindow = styled.div`
  max-width: 40vw;
  padding: 2em;
  h2 {
    width: 100%;
    margin-bottom: 8px;
    overflow-wrap: break-word;
  }
  img {
    width: 100%;
  }
`
