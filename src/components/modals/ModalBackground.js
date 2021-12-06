import React from 'react'
import styled from 'styled-components'

const ModalBackground = ({ modalBackgroundClick, children, modalOpen }) => {
  // if (!modalOpen) return null
  return (
    <>
      <StyledModal onClick={modalBackgroundClick} />
      <StyledMessage>{children}</StyledMessage>
    </>
  )
}

export default ModalBackground

const StyledModal = styled.div`
  position: fixed;
  height: 100vh;
  width: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
`
const StyledMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 4px;
`
