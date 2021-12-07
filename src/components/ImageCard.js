import React from 'react'
import styled from 'styled-components'

const ImageCard = ({ title, imgUrl, verticalEllipsisClick, onImgClick }) => {
  return (
    <StyledLi>
      <div>
        <h3>{title}</h3>
        <button onClick={verticalEllipsisClick}>&#8942;</button>
      </div>
      <img src={imgUrl} onClick={onImgClick} />
    </StyledLi>
  )
}

export default ImageCard

const StyledLi = styled.li`
  border: ${({ theme }) => theme.border.main};
  width: fit-content;
  margin: 1em auto;
  width: 450px;
  div {
    border-bottom: ${({ theme }) => theme.border.main};
    display: flex;
    background-color: #fff;
  }
  button {
    display: block;
    margin-left: auto;
    padding: 0.5rem 1rem;
    border-radius: 50%;
    background-color: transparent;
    font-size: 120%;
  }
  h3 {
    width: 400px;
    padding: 0.5em 1em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  img {
    width: 100%;
  }
`
