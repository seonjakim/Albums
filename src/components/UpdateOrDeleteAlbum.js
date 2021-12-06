import React from 'react'
import styled from 'styled-components'
import ModalBackground from './ModalBackground'

const DeleteAlbum = ({
  resetUpdateOrDeleteStatus,
  deleteBtnClick,
  editBtnClick,
}) => {
  return (
    <>
      <ModalBackground modalBackgroundClick={resetUpdateOrDeleteStatus} />
      <StyledMessageContainer>
        <button onClick={editBtnClick}>Edit</button>
        <button onClick={deleteBtnClick}>Delete</button>
        <button onClick={resetUpdateOrDeleteStatus}>Cancel</button>
      </StyledMessageContainer>
    </>
  )
}

export default DeleteAlbum

const StyledMessageContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 4px;
  button {
    width: 100%;
    padding: 1em;
    border-top: ${({ theme }) => theme.border.main};
    background-color: transparent;
    &:nth-child(2) {
      color: red;
      font-weight: 700;
    }
  }
`
