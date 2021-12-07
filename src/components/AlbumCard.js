import React from 'react'
import styled from 'styled-components'

const AlbumCard = ({ title, imgUrl, verticalEllipsisClick, imgClick }) => {
  return (
    <StyledLi>
      <div>
        <h3>{title}</h3>
        <button onClick={verticalEllipsisClick}>&#8942;</button>
      </div>
      <img src={imgUrl} onClick={imgClick} />
    </StyledLi>
  )
}

export default AlbumCard

const StyledLi = styled.li`
  border: ${({ theme }) => theme.border.main};
  margin: 1em auto;
  width: 452px;
  display: grid;
  grid-template-rows: auto 1fr;
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
