import React, { useEffect } from 'react'
import styled from 'styled-components'

const Pagination = ({
  albumsPerPage,
  totalAlbums,
  setCurrentPage,
  currentPage,
}) => {
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(totalAlbums / albumsPerPage); i++) {
    pageNumbers.push(i)
  }

  useEffect(() => {
    if (currentPage > pageNumbers[pageNumbers.length - 1])
      setCurrentPage(pageNumbers[pageNumbers.length - 1])
  }, [pageNumbers])

  const pageNumberChange = (type) => {
    if (
      type === 'increment' &&
      currentPage < Math.ceil(totalAlbums / albumsPerPage)
    ) {
      setCurrentPage((state) => state + 1)
    } else if (type === 'decrement' && currentPage > 1) {
      setCurrentPage((state) => state - 1)
    }
    return
  }
  return (
    <StyledPaginationContainer>
      <StyledPaginationButton onClick={() => pageNumberChange('decrement')}>
        &#8249;
      </StyledPaginationButton>
      {pageNumbers.map((pageNumber) => (
        <StyledPaginationButton
          className={currentPage === pageNumber && 'active'}
          onClick={() => setCurrentPage(pageNumber)}
          key={pageNumber}
        >
          {pageNumber}
        </StyledPaginationButton>
      ))}
      <StyledPaginationButton onClick={() => pageNumberChange('increment')}>
        &#8250;
      </StyledPaginationButton>
    </StyledPaginationContainer>
  )
}

export default Pagination

const StyledPaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 90%;
  padding: 2em 0;
  background-color: #fff;
  border-top: ${({ theme }) => theme.border.main};
  & .active {
    background-color: #3f3f3f;
    color: #fff;
    box-shadow: none;
  }
`
const StyledPaginationButton = styled.button`
  background-color: #fff;
  border: ${({ theme }) => theme.border.main};
  margin: 2px;
  width: 24px;
  height: 24px;
  text-align: center;
  line-height: 22px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`
