import axios from 'axios'
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})

export const createPlaylist = (newListName, newSongs, newComments, userEmail, userName) => {
    return api.post(`/playlist/`, {
        name: newListName,
        by: userName, 
        ownerEmail: userEmail,
        likes: 0,
        dislikes: 0,
        listens: 0,
        publishDate: "N/A",
        songs: newSongs,
        comments: newComments,
        likedDislikedUsers: [] 
    })
}
export const deletePlaylistById = (id) => api.delete(`/playlist/${id}`)
export const getPlaylistById = (id) => api.get(`/playlist/${id}`)
export const getPlaylistPairs = () => api.get(`/playlistpairs/`)
export const updatePlaylistById = (id, playlist) => {
    return api.put(`/playlist/${id}`, {
        playlist : playlist
    })
}
export const addCommentLikeDislikeListenById = (userName, comment, like, dislike, listen, id) => {
    return api.put(`/playlist/comment/${id}`, {
        userName: userName,
        comment: comment,
        like: like,
        dislike: dislike,
        listen: listen
    })
}
export const publishPlaylistById = (id) => {return api.put(`/playlist/publish/${id}`)}
export const getPlaylistPairsByName = (criteria, email) => api.get(`/playlistpairs/name/${criteria}/${email}`)
export const getPlaylistPairsByUser = (criteria, email) => api.get(`/playlistpairs/user/${criteria}/${email}`)

const apis = {
    createPlaylist,
    deletePlaylistById,
    getPlaylistById,
    getPlaylistPairs,
    updatePlaylistById,
    addCommentLikeDislikeListenById,
    publishPlaylistById,
    getPlaylistPairsByName,
    getPlaylistPairsByUser
}

export default apis