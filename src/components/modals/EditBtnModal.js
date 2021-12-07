import React from 'react'
import styled from 'styled-components'
import ModalBackground from './ModalBackground'

const EditBtnModal = ({
  cancelBtnClick,
  deleteBtnClick,
  editBtnClick,
  modalOpen,
}) => {
  return (
    <>
      <ModalBackground
        modalBackgroundClick={cancelBtnClick}
        modalOpen={modalOpen}
      >
        <StyledButtonContainer>
          <button onClick={editBtnClick}>Edit</button>
          <button onClick={deleteBtnClick}>Delete</button>
          <button onClick={cancelBtnClick}>Cancel</button>
        </StyledButtonContainer>
      </ModalBackground>
    </>
  )
}

export default EditBtnModal

const StyledButtonContainer = styled.div`
  width: 400px;
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
