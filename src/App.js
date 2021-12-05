import React from 'react'
import styled from 'styled-components'
import ImageCard from './components/ImageCard'
import Nav from './components/Nav'
import Pagination from './components/Pagination'
import CreateAlbum from './components/UpdateOrCreateAlbum'
import DeleteAlbum from './components/UpdateOrDeleteAlbum'
import DiscardMessage from './components/DiscardMessageModal'
import * as crudAction from './components/Library'

const App = () => {
  const albumsPerPage = 5
  const [updateOrCreateModalOpen, setUpdateOrCreateModalOpen] = React.useState(
    false
  )
  const [updateOrDeleteModalOpen, setUpdateOrDeleteModalOpen] = React.useState(
    false
  )
  const [discardModalOpen, setDiscardModalOpen] = React.useState(false)
  const [albums, setAlbums] = React.useReducer(crudAction.reducer, [])
  const [currentPage, setCurrentPage] = React.useState(1)
  const lastAlbumIndex = currentPage * albumsPerPage
  const firstAlbumIndex = lastAlbumIndex - albumsPerPage
  const currentAlbums = albums.slice(firstAlbumIndex, lastAlbumIndex)
  const [selectedAlbumId, setSelectedAlbumId] = React.useState(null)
  const [newAlbumIndex, setNewAlbumIndex] = React.useState(0)
  const albumInfo = {
    id: newAlbumIndex,
    title: '',
    img: '',
  }

  const [newAlbum, setNewAlbum] = React.useState(albumInfo)

  const resetUpdateOrDeleteStatus = () => {
    setUpdateOrDeleteModalOpen(false)
    setSelectedAlbumId(null)
  }
  const discardBtnClick = () => {
    setUpdateOrCreateModalOpen(false)
    setDiscardModalOpen(false)
    resetUpdateOrDeleteStatus()
    setNewAlbum(albumInfo)
  }
  const editBtnClick = () => {
    setNewAlbum(
      albums[crudAction.indexOfSelectedAlbum(albums, selectedAlbumId)]
    )
    resetUpdateOrDeleteStatus()
    setUpdateOrCreateModalOpen(true)
  }

  const verticalEllipsisClick = (id) => {
    setUpdateOrDeleteModalOpen(true)
    setSelectedAlbumId(id)
  }
  const deleteBtnClick = () => {
    setAlbums({ type: 'DELETE', index: selectedAlbumId })
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
    let index = crudAction.indexOfSelectedAlbum(albums, newAlbum.id)
    if (index !== -1) {
      setAlbums({
        type: 'UPDATE',
        albumInfo: newAlbum,
        index,
      })
    } else setAlbums({ type: 'CREATE', albumInfo: newAlbum })
    setUpdateOrCreateModalOpen(false)
    setNewAlbumIndex((state) => state + 1)
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
      setNewAlbumIndex(data.length + 1)
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
          cancelBtnClick={() => setDiscardModalOpen(true)}
        />
      )}
      {discardModalOpen && (
        <DiscardMessage
          discardBtnClick={discardBtnClick}
          cancelBtnClick={() => setDiscardModalOpen(false)}
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
