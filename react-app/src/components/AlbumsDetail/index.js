import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { getAlbumDetail, likeAlbum, unLikeAlbum } from '../../store/album'
import { allSongsFetch, likeSong, unLikeSong } from "../../store/song";
import { useEffect, useState, useRef } from "react";
import EditAlbumFormModal from "../AlbumEdit";
import OpenModalButton from "../OpenModalButton";
import ConfirmDeleteAlbumModal from "../AlbumDeleteModal";
import SongAddModal from "../Songs/SongAddModal";
import SongDeleteModal from "../Songs/SongDeleteModal";
import './AlbumsDetail.css'
import SongLike from "../SongLike";
import OpenPlayer from "../MusicPlayer/OpenPlayer"



const AlbumDetials = () => {
    const dispatch = useDispatch();
    const { albumId } = useParams()
    const history = useHistory()
    let album = useSelector(state => state?.albums[albumId]);
    // let songs = useSelector(state => state.songs)
    // const {songs , likable_type} = album
    const sessionUser = useSelector(state => state?.session.user);
    const [like, setLike] = useState(false);

    const songLengthFunc = (data) => {
        const sec = data % 60
        const min = (data - sec) / 60
        if (sec === 0) {
            return `${min}:00`
        }
        if (sec < 10) {
            return `${min}:0${sec}`
        }
        return `${min}:${sec}`
    }
    const handleClick = async (e) => {
        e.preventDefault();
        await dispatch(likeAlbum(album))
        await dispatch(getAlbumDetail(albumId))
        history.push(`/albums/${albumId}`)
    }

    const handleCancelClick = async (e) => {
        e.preventDefault();
        await dispatch(unLikeAlbum(album))
        await dispatch(getAlbumDetail(albumId))
        history.push(`/albums/${albumId}`)
    }

    useEffect(() => {
        dispatch(getAlbumDetail(albumId))
    }, [dispatch, albumId])

    let count = 0

    return (
        <div id="detail-page">
            {album && sessionUser ?
                (
                    <>
<<<<<<< HEAD
                        <div className="album-header">
                            <div>
                                <img id="album-image" src={album.album_img} alt="" />
=======
                    <OpenPlayer type='albums' typeId={album.id} />
                    {album.likable_type == 'album' ?
                            <div className="like-input">
                                <div
                                    className="true"
                                    onClick={handleCancelClick} >
                                    <i className="fas fa-heart"></i>
                                    Liked
                                </div>
>>>>>>> 1c4ce28a9e4009df5c578507a12d00d4cf395417
                            </div>
                            <div className="album-details">
                                <p>Album</p>
                                <h1>{album.album_name}</h1>
                                <p><span >{album.year_recorded}</span>
                                    <span className="album-description">{album.username}</span>
                                    <span className="album-description">{album.songs?.length} songs</span>
                                    </p>
                                <p>{album.likable_id ? album.likable_id.length : 0} Like</p>
                            </div>
                        </div>
                        <div className="album-buttons">
                            {album.likable_type == 'album' ?
                                <span className="like-input">
                                    <i className="fas fa-heart true"
                                       onClick={handleCancelClick}></i>
                                </span>
                                :
                                <span className="like-input">
                                    <i className="far fa-heart false"
                                       onClick={handleClick}></i>
                                </span>
                            }
                            {sessionUser && sessionUser.id === album.user_id ?
                                <>
                                    <OpenModalButton
                                        buttonText={"Edit Album"}
                                        modalComponent={<EditAlbumFormModal album={album} />} />
                                    <OpenModalButton
                                        buttonText={"Delete Album"}
                                        modalComponent={<ConfirmDeleteAlbumModal albumId={album.id} />} />
                                    <OpenModalButton
                                        buttonText={"Add song"}
                                        modalComponent={<SongAddModal albumId={album.id} />}
                                    />
                                </> : <></>
                            }
                        </div>
                        {(album.songs ? album.songs?.map(song =>
                            <div className="song-list">
                                <div>{count += 1}. {song.song_name}</div>
                                    <div className="">{songLengthFunc(song.song_length)}</div>
                                    <div className="song-button">
                                        <span><SongLike song={song} albumId={albumId} /></span>
                                {sessionUser && sessionUser.id === album.user_id ?
                                        <span className="delete-song-button">
                                            <OpenModalButton
                                                buttonText={"Delete song"}
                                                modalComponent={<SongDeleteModal albumId={albumId} songId={song.id} />}
                                            />
                                        </span>
                                    : <></>}
                                    </div>
                            </div>)
                            : <div>No Songs </div>)}
                    </>
                ) :
                <p>Can't Read</p>
            }
        </div>
    )
}



export default AlbumDetials
