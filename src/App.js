import React from 'react'
import styled from 'styled-components'
import ImageCard from './components/ImageCard'
import Nav from './components/Nav'
import Pagination from './components/Pagination'
import CreateAlbum from './components/UpdateOrCreateAlbum'
import DeleteAlbum from './components/UpdateOrDeleteAlbum'

const App = () => {
  const albumsPerPage = 5
  const [updateOrCreateModalOpen, setUpdateOrCreateModalOpen] = React.useState(
    false
  )
  const [updateOrDeleteModalOpen, setUpdateOrDeleteModalOpen] = React.useState(
    false
  )

  const [albums, setAlbums] = React.useState([])
  const [currentPage, setCurrentPage] = React.useState(1)
  const lastAlbumIndex = currentPage * albumsPerPage
  const firstAlbumIndex = lastAlbumIndex - albumsPerPage
  const currentAlbums = albums.slice(firstAlbumIndex, lastAlbumIndex)
  const [selectedAlbumId, setSelectedAlbumId] = React.useState(null)
  const albumInfo = {
    id: albums.length + 1,
    title: '',
    img: '',
  }

  const [newAlbum, setNewAlbum] = React.useState(albumInfo)
  const albumsWithoutSelectedAlbum = (albums, selectedId) =>
    albums.filter((album) => album.id !== selectedId)

  const reducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE':
        state[action.index] = action.albumInfo
        return state
      case 'CREATE':
        return [action.payload, ...state]
      case 'DELETE':
        return albumsWithoutSelectedAlbum(state, action.payload)
    }
  }

  const indexOfSelectedAlbum = (albums, selectedId) =>
    albums.findIndex((album) => album.id === selectedId)

  const resetUpdateOrDeleteStatus = () => {
    setUpdateOrDeleteModalOpen(false)
    setSelectedAlbumId(null)
  }
  const editBtnClick = () => {
    setNewAlbum(albums[indexOfSelectedAlbum(albums, selectedAlbumId)])
    resetUpdateOrDeleteStatus()
    setUpdateOrCreateModalOpen(true)
  }

  const verticalEllipsisClick = (id) => {
    setUpdateOrDeleteModalOpen(true)
    setSelectedAlbumId(id)
  }
  const deleteBtnClick = () => {
    setAlbums(albumsWithoutSelectedAlbum(albums, selectedAlbumId))
    resetUpdateOrDeleteStatus()
  }

  const pageChangeScrollToTop = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const doneBtnClick = () => {
    let index = indexOfSelectedAlbum(albums, newAlbum.id)
    if (index !== -1) {
      albums[index] = newAlbum
      setAlbums(albums)
    } else setAlbums([newAlbum, ...albums])
    setUpdateOrCreateModalOpen(false)
    setNewAlbum(albumInfo)
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
      albumInfo.id = data.length + 1
    }
    apiCall()
  }, [])
  return (
    <>
      <Nav createBtnClick={() => setUpdateOrCreateModalOpen(true)} />
      <StyledAppContainer>
        {currentAlbums.map((album, index) => (
          <div style={{ margin: '1em auto' }} key={index}>
            <div>{album.id}</div>
            <ImageCard
              verticalEllipsisClick={() => verticalEllipsisClick(album.id)}
              title={album.title}
              imgUrl={album.img}
            />
          </div>
        ))}

        <div>
          <Pagination
            albumsPerPage={albumsPerPage}
            totalAlbums={albums.length}
            setCurrentPage={pageChangeScrollToTop}
          />
        </div>
      </StyledAppContainer>
      {updateOrDeleteModalOpen && (
        <DeleteAlbum
          deleteBtnClick={deleteBtnClick}
          resetUpdateOrDeleteStatus={resetUpdateOrDeleteStatus}
          editBtnClick={editBtnClick}
        />
      )}
      {updateOrCreateModalOpen && (
        <CreateAlbum
          newAlbum={newAlbum}
          setNewAlbum={setNewAlbum}
          doneBtnClick={doneBtnClick}
        />
      )}
    </>
  )
}

export default App

const StyledAppContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  padding-top: 80px;
`
