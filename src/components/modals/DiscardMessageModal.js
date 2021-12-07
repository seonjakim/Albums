import React from 'react'
import styled from 'styled-components'
import ModalBackground from './ModalBackground'

const DiscardMessageModal = ({
  discardBtnClick,
  cancelBtnClick,
  modalOpen,
}) => {
  return (
    <ModalBackground modalOpen={modalOpen}>
      <StyledDiscardMessage>
        <span>If you leave, your edits won't be saved.</span>
        <button onClick={discardBtnClick}>Discard</button>
        <button onClick={cancelBtnClick}>Cancel</button>
      </StyledDiscardMessage>
    </ModalBackground>
  )
}

export default DiscardMessageModal

const StyledDiscardMessage = styled.div`
  width: 400px;
  span {
    display: inline-block;
    font-size: 120%;
    font-weight: 700;
    padding: 2em 1em;
  }
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
