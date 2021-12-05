import React from 'react'
import styled from 'styled-components'

const Pagination = ({ albumsPerPage, totalAlbums, setCurrentPage }) => {
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(totalAlbums / albumsPerPage); i++) {
    pageNumbers.push(i)
  }
  return (
    <StyledUl>
      {pageNumbers.map((pageNumber) => (
        <li onClick={() => setCurrentPage(pageNumber)} key={pageNumber}>
          {pageNumber}
        </li>
      ))}
    </StyledUl>
  )
}

export default Pagination

const StyledUl = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2em 0;
  li {
    border: ${({ theme }) => theme.border.main};
    width: 24px;
    height: 24px;
    text-align: center;
    line-height: 22px;
  }
`
