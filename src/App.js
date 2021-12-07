import React from 'react'
import styled from 'styled-components'
import ImageCard from './components/ImageCard'
import Nav from './components/Nav'
import Pagination from './components/Pagination'
import PostAlbumModal from './components/modals/PostModal'
import EditButtonModal from './components/modals/EditBtnModal'
import DiscardMessageModal from './components/modals/DiscardMessageModal'
import AlbumWindowModal from './components/modals/AlbumWindow'
import * as crudAction from './components/Library'

const App = () => {
  const scrollRef = React.useRef()
  const [albums, setAlbums] = React.useReducer(crudAction.reducer, [])
  /** Modal open status */
  const [modalOpen, setModalOpen] = React.useState(false)
  const [discardModalOpen, setDiscardModalOpen] = React.useState(false)
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

  const resetEditStatus = () => {
    setModalOpen(false)
    setSelectedAlbumId(null)
  }
  const discardBtnClick = () => {
    setDiscardModalOpen(false)
    resetEditStatus()
    setCurrentAlbum(albumInfo)
  }
  const editBtnClick = () => {
    setCurrentAlbum(
      albums[crudAction.indexOfSelectedAlbum(albums, selectedAlbumId)]
    )
    resetEditStatus()
    setModalOpen('post')
  }

  const verticalEllipsisClick = (id) => {
    setModalOpen('edit')
    setSelectedAlbumId(id)
  }
  const deleteBtnClick = () => {
    setAlbums({ type: 'DELETE', index: selectedAlbumId })
    resetEditStatus()
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
  /** done button on Create or Edit an album */
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
    discardBtnClick()
  }

  const onAlbumCardClick = (id) => {
    setModalOpen('read')
    setCurrentAlbum(albums[crudAction.indexOfSelectedAlbum(albums, id)])
  }
  const onAlbumCardClose = () => {
    setModalOpen(false)
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
      <StyledAppContainer>
        <Nav createBtnClick={() => setModalOpen('post')} />
        <div ref={scrollRef} className="img-card-container">
          {currentAlbums.map((album, index) => {
            const { id, title, img } = album
            return (
              <ImageCard
                key={index}
                verticalEllipsisClick={() => verticalEllipsisClick(id)}
                onImgClick={() => onAlbumCardClick(id)}
                title={title}
                imgUrl={img}
              />
            )
          })}
        </div>
        <Pagination
          albumsPerPage={albumsPerPage}
          totalAlbums={albums.length}
          currentPage={currentPage}
          setCurrentPage={pageChangeScrollToTop}
        />
      </StyledAppContainer>
      <AlbumWindowModal
        modalOpen={modalOpen === 'read'}
        modalBackgroundClick={onAlbumCardClose}
        currentAlbum={currentAlbum}
      />
      <EditButtonModal
        modalOpen={modalOpen === 'edit'}
        deleteBtnClick={deleteBtnClick}
        cancelBtnClick={resetEditStatus}
        editBtnClick={editBtnClick}
      />
      <PostAlbumModal
        modalOpen={modalOpen === 'post'}
        currentAlbum={currentAlbum}
        setCurrentAlbum={setCurrentAlbum}
        doneBtnClick={doneBtnClick}
        cancelBtnClick={cancelBtnClick}
      />
      <DiscardMessageModal
        modalOpen={discardModalOpen}
        discardBtnClick={discardBtnClick}
        cancelBtnClick={() => setDiscardModalOpen(false)}
      />
    </>
  )
}

export default App

const StyledAppContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  height: 100vh;
  & .img-card-container {
    overflow-y: scroll;
  }
`
