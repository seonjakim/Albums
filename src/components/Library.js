export const albumsWithoutSelectedAlbum = (albums, selectedId) =>
  albums.filter((album) => album.id !== selectedId)

export const indexOfSelectedAlbum = (albums, selectedId) =>
  albums.findIndex((album) => album.id === selectedId)

export const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      return [
        ...state.slice(0, action.index),
        action.albumInfo,
        ...state.slice(action.index + 1),
      ]
    case 'CREATE':
      return [action.albumInfo, ...state]
    case 'DELETE':
      return albumsWithoutSelectedAlbum(state, action.index)
    default:
      return action
  }
}
