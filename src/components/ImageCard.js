import React from 'react'
import styled from 'styled-components'

const ImageCard = ({ title, imgUrl }) => {
  return (
    <StyledLi>
      <div>
        <h3>{title}</h3>
        <button>&#8942;</button>
      </div>
      <img src="https://via.placeholder.com/450x400" />
    </StyledLi>
  )
}

export default ImageCard

const StyledLi = styled.li`
  border: 1px solid #eee;
  width: fit-content;
  div {
    border-bottom: 1px solid #eee;
    display: flex;
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
    padding: 0.5em 1em;
  }
  img {
    height: 400px;
    width: 450px;
  }
`
