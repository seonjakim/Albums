import React from 'react'
import styled from 'styled-components'
import ImageCard from './components/ImageCard'
import Nav from './components/Nav'
import Pagination from './components/Pagination'
import CreateAlbum from './components/CreateAlbum'

const App = () => {
  const [modalOpen, setModalOpen] = React.useState(false)
  const [albums, setAlbums] = React.useState([])
  const albumsPerPage = 5
  const [currentPage, setCurrentPage] = React.useState(1)
  const lastAlbumIndex = currentPage * albumsPerPage
  const firstAlbumIndex = lastAlbumIndex - albumsPerPage
  const currentAlbums = albums.slice(firstAlbumIndex, lastAlbumIndex)

  const pageChangeScrollToTop = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const createAlbum = (newAlbum) => {
    setAlbums([newAlbum, ...albums])
    setModalOpen(false)
  }
  console.log(albums)
  React.useEffect(() => {
    const apiCall = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/albums')
      const data = await res.json()
      setAlbums(
        data.map((album) => {
          return { ...album, img: 'https://via.placeholder.com/450x400' }
        })
      )
    }
    apiCall()
  }, [])
  return (
    <>
      <Nav createBtnClick={() => setModalOpen(true)} />
      <StyledAppContainer>
        <div
          style={{
            margin: 'auto',
            paddingTop: '80px',
          }}
        >
          {currentAlbums.map((album) => (
            <div style={{ margin: '1em 0' }} key={album.id}>
              <ImageCard title={album.title} imgUrl={album.img} />
            </div>
          ))}
        </div>
        <div>
          <Pagination
            albumsPerPage={albumsPerPage}
            totalAlbums={albums.length}
            setCurrentPage={pageChangeScrollToTop}
          />
        </div>
      </StyledAppContainer>
      <CreateAlbum
        modalOpen={modalOpen}
        uploadAlbum={createAlbum}
        newAlbumId={albums.length}
      />
    </>
  )
}

export default App

const StyledAppContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
`
