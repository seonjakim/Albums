import React from 'react'
import styled from 'styled-components'
const DeleteAlbum = ({
  deleteModalOpen,
  cancelDeletion,
  confirmDeletion,
  updateAlbum,
}) => {
  return (
    <>
      {deleteModalOpen && (
        <StyledModal>
          <div>
            <span>Would you like to delete this Album?</span>
            <button onClick={updateAlbum}>Edit</button>
            <button onClick={confirmDeletion}>Delete</button>
            <button onClick={cancelDeletion}>Cancel</button>
          </div>
        </StyledModal>
      )}
    </>
  )
}

export default DeleteAlbum

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
    width: 400px;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 4px;
  }
  span {
    display: inline-block;
    font-size: 120%;
    font-weight: 700;
    padding: 1em;
  }
  button {
    width: 100%;
    padding: 1em;
    border-top: ${({ theme }) => theme.border.main};
    background-color: transparent;
    &:nth-child(3) {
      color: red;
      font-weight: 700;
    }
  }
`
