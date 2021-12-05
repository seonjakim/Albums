import React from 'react'
import styled from 'styled-components'

const ModalBackground = ({ modalBackgroundClick }) => {
  return <StyledModal onClick={modalBackgroundClick} />
}

export default ModalBackground

const StyledModal = styled.div`
  position: fixed;
  height: 100vh;
  width: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
`
