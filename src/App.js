import React, { useReducer, useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import AlbumCard from './components/AlbumCard'
import Nav from './components/Nav'
import Pagination from './components/Pagination'
import PostAlbumModal from './components/modals/PostModal'
import EditButtonModal from './components/modals/EditButtonModal'
import DiscardMessageModal from './components/modals/DiscardMessageModal'
import AlbumModal from './components/modals/AlbumModal'
import * as crudAction from './components/Library'

const App = () => {
  const scrollRef = useRef()
  const [albums, setAlbums] = useReducer(crudAction.reducer, [])
  /** Modal open status */
  const [modalOpen, setModalOpen] = useState(false)
  const [discardModalOpen, setDiscardModalOpen] = useState(false)
  /** pagination */
  const [currentPage, setCurrentPage] = useState(1)
  const albumsPerPage = 5
  const lastAlbumIndex = currentPage * albumsPerPage
  const firstAlbumIndex = lastAlbumIndex - albumsPerPage
  const currentAlbums = albums.slice(firstAlbumIndex, lastAlbumIndex)
  /** currently selected album info for Edit, Delete, and Read */
  const [newAlbumId, setNewAlbumId] = useState(0)
  const albumInfo = {
    id: newAlbumId,
    title: '',
    img: '',
  }
  const [selectedAlbumId, setSelectedAlbumId] = useState(null)
  const [currentAlbum, setCurrentAlbum] = useState(albumInfo)

  const albumIdOnEditStage = (id) => {
    setModalOpen('edit')
    setSelectedAlbumId(id)
  }
  const resetEditStatus = () => {
    setModalOpen(false)
    setSelectedAlbumId(null)
  }
  const clearUserInput = () => {
    setDiscardModalOpen(false)
    resetEditStatus()
    setCurrentAlbum(albumInfo)
  }
  const selectedAlbumOnEditStage = () => {
    setCurrentAlbum(
      albums[crudAction.indexOfSelectedAlbum(albums, selectedAlbumId)]
    )
    resetEditStatus()
    setModalOpen('post')
  }

  const stopPostAndReset = () => {
    if (currentAlbum.title.length || currentAlbum.img.length)
      setDiscardModalOpen(true)
    else clearUserInput()
  }
  const postAlbum = () => {
    let index = crudAction.indexOfSelectedAlbum(albums, currentAlbum.id)
    if (index !== -1) {
      setAlbums({
        type: 'UPDATE',
        albumInfo: currentAlbum,
        index,
      })
    } else {
      setAlbums({ type: 'CREATE', albumInfo: currentAlbum })
      setNewAlbumId((state) => state + 1)
      setCurrentPage(1)
    }
    clearUserInput()
  }

  const deleteAlbum = () => {
    setAlbums({ type: 'DELETE', index: selectedAlbumId })
    resetEditStatus()
  }

  const albumOpen = (id) => {
    setModalOpen('read')
    setCurrentAlbum(albums[crudAction.indexOfSelectedAlbum(albums, id)])
  }
  const albumClose = () => {
    setModalOpen(false)
    setCurrentAlbum(albumInfo)
  }

  const pageChangeScrollToTop = (pageNumber) => {
    setCurrentPage(pageNumber)
    scrollRef.current.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/albums')
      const data = await res.json()
      setAlbums(
        data.map((album) => {
          return { ...album, img: 'https://via.placeholder.com/450x400' }
        })
      )
      setNewAlbumId(data.length + 1)
    }
    fetchData()
  }, [])
  return (
    <>
      <StyledAppContainer>
        <Nav createBtnClick={() => setModalOpen('post')} />
        <div ref={scrollRef} className="img-card-container">
          {currentAlbums.map((album, index) => {
            const { id, title, img } = album
            return (
              <AlbumCard
                key={index}
                verticalEllipsisClick={() => albumIdOnEditStage(id)}
                imgClick={() => albumOpen(id)}
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
      <AlbumModal
        modalOpen={modalOpen === 'read'}
        modalBackgroundClick={albumClose}
        currentAlbum={currentAlbum}
      />
      <EditButtonModal
        modalOpen={modalOpen === 'edit'}
        deleteBtnClick={deleteAlbum}
        cancelBtnClick={resetEditStatus}
        editBtnClick={selectedAlbumOnEditStage}
      />
      <PostAlbumModal
        modalOpen={modalOpen === 'post'}
        currentAlbum={currentAlbum}
        setCurrentAlbum={setCurrentAlbum}
        doneBtnClick={postAlbum}
        cancelBtnClick={stopPostAndReset}
      />
      <DiscardMessageModal
        modalOpen={discardModalOpen}
        discardBtnClick={clearUserInput}
        cancelBtnClick={() => setDiscardModalOpen(false)}
      />
    </>
  )
}

export default App

const StyledAppContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
  & .img-card-container {
    overflow-y: scroll;
  }
`
