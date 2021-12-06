import React from 'react'
import styled from 'styled-components'

const Nav = ({ createBtnClick }) => {
  return (
    <StyledNavContainer>
      <div>
        <svg
          aria-label="Home"
          color="#262626"
          fill="#262626"
          height="32"
          role="img"
          viewBox="0 0 48 48"
          width="32"
        >
          <path d="M45.5 48H30.1c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2.1-4.6-4.6-4.6s-4.6 2.1-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.6-.6 2.1 0l21.5 21.5c.3.3.4.7.4 1.1v23.5c.1.8-.6 1.5-1.4 1.5z"></path>
        </svg>
        <button onClick={createBtnClick}>
          <svg
            aria-label="New Post"
            color="#262626"
            fill="#262626"
            height="32"
            role="img"
            viewBox="0 0 48 48"
            width="32"
          >
            <path d="M31.8 48H16.2c-6.6 0-9.6-1.6-12.1-4C1.6 41.4 0 38.4 0 31.8V16.2C0 9.6 1.6 6.6 4 4.1 6.6 1.6 9.6 0 16.2 0h15.6c6.6 0 9.6 1.6 12.1 4C46.4 6.6 48 9.6 48 16.2v15.6c0 6.6-1.6 9.6-4 12.1-2.6 2.5-5.6 4.1-12.2 4.1zM16.2 3C10 3 7.8 4.6 6.1 6.2 4.6 7.8 3 10 3 16.2v15.6c0 6.2 1.6 8.4 3.2 10.1 1.6 1.6 3.8 3.1 10 3.1h15.6c6.2 0 8.4-1.6 10.1-3.2 1.6-1.6 3.1-3.8 3.1-10V16.2c0-6.2-1.6-8.4-3.2-10.1C40.2 4.6 38 3 31.8 3H16.2z"></path>
            <path d="M36.3 25.5H11.7c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h24.6c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5z"></path>
            <path d="M24 37.8c-.8 0-1.5-.7-1.5-1.5V11.7c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v24.6c0 .8-.7 1.5-1.5 1.5z"></path>
          </svg>
        </button>
        <img
          src="https://images.velog.io/images/seonja/post/01fd7f0f-2969-4dce-8c13-abe9d004ab52/image.png"
          alt="user-icon"
        />
      </div>
    </StyledNavContainer>
  )
}

export default Nav

const StyledNavContainer = styled.nav`
  position: fixed;
  width: 100%;
  border-bottom: ${({ theme }) => theme.border.main};
  background-color: #fff;
  height: 68px;
  img {
    width: 32px;
    height: 32px;
  }
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 30vw;
    min-width: 330px;
    height: 100%;
    margin-left: auto;
    padding: 0 4rem;
  }
  button {
    background-color: transparent;
  }
`
