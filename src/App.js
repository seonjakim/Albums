import React from 'react'
import styled from 'styled-components'
import ImageCard from './components/ImageCard'
import Nav from './components/Nav'
import Pagination from './components/Pagination'
import CreateAlbum from './components/CreateAlbum'
import DeleteAlbum from './components/DeleteAlbum'

const App = () => {
  const [modalOpen, setModalOpen] = React.useState(false)
  const [albums, setAlbums] = React.useState([])
  const albumsPerPage = 5
  const [currentPage, setCurrentPage] = React.useState(1)
  const lastAlbumIndex = currentPage * albumsPerPage
  const firstAlbumIndex = lastAlbumIndex - albumsPerPage
  const currentAlbums = albums.slice(firstAlbumIndex, lastAlbumIndex)
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false)
  const [deleteAlbumIndex, setDeleteAlbumIndex] = React.useState(null)

  const [newAlbum, setNewAlbum] = React.useState({
    id: albums.length,
    title: '',
    img: '',
  })

  const cancelDeletion = () => {
    setDeleteModalOpen(false)
    setDeleteAlbumIndex(null)
  }
  const updateAlbum = () => {
    setNewAlbum(albums.filter((album) => album.id === deleteAlbumIndex)[0])
    cancelDeletion()
    setModalOpen(true)
  }

  const deleteAlbumClick = (id) => {
    setDeleteModalOpen(true)
    setDeleteAlbumIndex(id)
  }
  const confirmDeletion = () => {
    setAlbums(albums.filter((album) => album.id !== deleteAlbumIndex))
    cancelDeletion()
  }

  const pageChangeScrollToTop = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const createAlbum = (newAlbum) => {
    let index = albums.findIndex((album) => album.id === newAlbum.id)
    if (index !== -1) {
      albums[index] = newAlbum
      setAlbums(albums)
    } else setAlbums([newAlbum, ...albums])
    setModalOpen(false)
  }
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
          {currentAlbums.map((album, index) => (
            <div style={{ margin: '1em 0' }} key={index}>
              <div>{album.id}</div>
              <ImageCard
                deleteBtnClick={() => deleteAlbumClick(album.id)}
                title={album.title}
                imgUrl={album.img}
              />
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
      <DeleteAlbum
        confirmDeletion={confirmDeletion}
        cancelDeletion={cancelDeletion}
        deleteModalOpen={deleteModalOpen}
        updateAlbum={updateAlbum}
      />
      <CreateAlbum
        newAlbum={newAlbum}
        setNewAlbum={setNewAlbum}
        modalOpen={modalOpen}
        uploadAlbum={createAlbum}
        newAlbumId={albums.length + 1}
      />
    </>
  )
}

export default App

const StyledAppContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
`
