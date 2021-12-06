import React from 'react'
import styled from 'styled-components'
import ImageCard from './components/ImageCard'
import Nav from './components/Nav'
import Pagination from './components/Pagination'
import PostAlbumModal from './components/modals/UpdateOrCreateAlbum'
import EditButtonModal from './components/modals/UpdateOrDeleteAlbum'
import DiscardMessageModal from './components/modals/DiscardMessageModal'
import AlbumWindowModal from './components/modals/AlbumWindow'
import * as crudAction from './components/Library'

const App = () => {
  const scrollRef = React.useRef()
  /** Modal open status */
  const [modalOpen, setModalOpen] = React.useState(false)
  const [postModalOpen, setPostModalOpen] = React.useState(false)
  const [editBtnModalOpen, setEditBtnModalOpen] = React.useState(false)
  const [discardModalOpen, setDiscardModalOpen] = React.useState(false)
  const [albumModalOpen, setAlbumModalOpen] = React.useState(false)
  const [albums, setAlbums] = React.useReducer(crudAction.reducer, [])
  /** pagination */
  const [currentPage, setCurrentPage] = React.useState(1)
  const albumsPerPage = 5
  const lastAlbumIndex = currentPage * albumsPerPage
  const firstAlbumIndex = lastAlbumIndex - albumsPerPage
  const currentAlbums = albums.slice(firstAlbumIndex, lastAlbumIndex)
  /** currently selected album info for Edit, Delete, and Read */
  const [newAlbumId, setNewAlbumId] = React.useState(0)
  const albumInfo = {
    id: newAlbumId,
    title: '',
    img: '',
  }
  const [selectedAlbumId, setSelectedAlbumId] = React.useState(null)
  const [currentAlbum, setCurrentAlbum] = React.useState(albumInfo)

  const resetUpdateOrDeleteStatus = () => {
    setEditBtnModalOpen(false)
    setSelectedAlbumId(null)
  }
  const discardBtnClick = () => {
    setPostModalOpen(false)
    setDiscardModalOpen(false)
    resetUpdateOrDeleteStatus()
    setCurrentAlbum(albumInfo)
  }
  const editBtnClick = () => {
    setCurrentAlbum(
      albums[crudAction.indexOfSelectedAlbum(albums, selectedAlbumId)]
    )
    resetUpdateOrDeleteStatus()
    setPostModalOpen(true)
  }

  const verticalEllipsisClick = (id) => {
    setEditBtnModalOpen(true)
    setSelectedAlbumId(id)
  }
  const deleteBtnClick = () => {
    setAlbums({ type: 'DELETE', index: selectedAlbumId })
    resetUpdateOrDeleteStatus()
  }

  const pageChangeScrollToTop = (pageNumber) => {
    setCurrentPage(pageNumber)
    scrollRef.current.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const cancelBtnClick = () => {
    if (currentAlbum.title.length || currentAlbum.img.length)
      setDiscardModalOpen(true)
    else discardBtnClick()
  }

  const doneBtnClick = () => {
    let index = crudAction.indexOfSelectedAlbum(albums, currentAlbum.id)
    if (index !== -1) {
      setAlbums({
        type: 'UPDATE',
        albumInfo: currentAlbum,
        index,
      })
    } else setAlbums({ type: 'CREATE', albumInfo: currentAlbum })
    setNewAlbumId((state) => state + 1)
    //discardBtnClick으로 합칠 수 있음
    setPostModalOpen(false)
    setCurrentAlbum(albumInfo)
  }

  const onAlbumCardClick = (id) => {
    setAlbumModalOpen(true)
    setCurrentAlbum(albums[crudAction.indexOfSelectedAlbum(albums, id)])
  }
  const onAlbumCardClose = () => {
    setAlbumModalOpen(false)
    setCurrentAlbum(albumInfo)
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
      setNewAlbumId(data.length + 1)
    }
    apiCall()
  }, [])
  return (
    <>
      <Nav createBtnClick={() => setPostModalOpen(true)} />
      <StyledAppContainer>
        <div ref={scrollRef} style={{ overflowY: 'scroll' }}>
          {currentAlbums.map((album, index) => (
            <div
              style={{ width: 'fit-content', margin: '1em auto' }}
              key={index}
            >
              <ImageCard
                verticalEllipsisClick={() => verticalEllipsisClick(album.id)}
                onImgClick={() => onAlbumCardClick(album.id)}
                title={album.title}
                imgUrl={album.img}
              />
            </div>
          ))}
        </div>
        <Pagination
          albumsPerPage={albumsPerPage}
          totalAlbums={albums.length}
          setCurrentPage={pageChangeScrollToTop}
        />
      </StyledAppContainer>
      {albumModalOpen && (
        <AlbumWindowModal
          modalBackgroundClick={onAlbumCardClose}
          currentAlbum={currentAlbum}
        />
      )}
      {editBtnModalOpen && (
        <EditButtonModal
          deleteBtnClick={deleteBtnClick}
          cancelBtnClick={resetUpdateOrDeleteStatus}
          editBtnClick={editBtnClick}
        />
      )}
      {postModalOpen && (
        <PostAlbumModal
          currentAlbum={currentAlbum}
          setCurrentAlbum={setCurrentAlbum}
          doneBtnClick={doneBtnClick}
          cancelBtnClick={cancelBtnClick}
        />
      )}
      {discardModalOpen && (
        <DiscardMessageModal
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
  grid-template-rows: auto 1fr auto;
  height: 100vh;
  padding-top: 80px;
`
