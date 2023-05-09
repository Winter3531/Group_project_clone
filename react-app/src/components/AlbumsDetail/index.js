import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { getAlbumDetail, likeAlbum, unLikeAlbum } from '../../store/album'
import { useEffect, useState, useRef } from "react";
import EditAlbumFormModal from "../AlbumEdit";
import OpenModalButton from "../OpenModalButton";
import ConfirmDeleteAlbumModal from "../AlbumDeleteModal";
import './AlbumsDetail.css'



const AlbumDetials = () => {
    const dispatch = useDispatch();
    const { albumId } = useParams()
    const history = useHistory()
    let album = useSelector(state => state?.albums[albumId]);
    // const {songs , likable_type} = album
    const sessionUser = useSelector(state => state?.session.user);
    const [like, setLike] = useState(false);

    console.log(album, 'this is album in album details')



    const onChange = (e) => {
        setLike(e)
        dispatch(likeAlbum(album))
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
        <div>
            {album && sessionUser ?
                (
                    <>
                        <p>album id: {album.id}</p>
                        <p>album name: {album.album_name}</p>
                        <p>year recorded: {album.year_recorded}</p>
                        <p>album img: {album.album_img}</p>
                        <p>user id: {album.user_id}</p>
                        <p>Username: {album.username}</p>

                        {(album.songs ? album.songs?.map(song =>
                            <div>{count += 1}. Name:{song.song_name}
                                length:{Math.floor(song.song_length / 60)}: {song.song_length % 60}<button>Add to playlist</button></div>)
                            : <div>No Songs </div>)}


                        {album.likable_type == 'album' ?
                            <div className="like-input">
                                <div
                                    className="true"
                                    onClick={handleCancelClick} >
                                    <i className="fas fa-heart"></i>
                                </div>
                            </div>
                            :
                            <div className="like-input">
                                <div
                                    className="false"
                                    onClick={handleClick} >
                                    <i className="far fa-heart"></i>
                                </div>
                            </div>
                        }

                        {sessionUser && sessionUser.id === album.user_id ?
                            <>
                                <OpenModalButton
                                    buttonText={"Delete Album"}
                                    modalComponent={<ConfirmDeleteAlbumModal albumId={album.id} />} />

                                <OpenModalButton
                                    buttonText={"Edit Album"}
                                    modalComponent={<EditAlbumFormModal album={album} />}/>

                                {/* {album.likable_type && (album.likable_type == 'album' ?
                                    <button type="button" onClick={handleCancelClick} >Unlike</button> :
                                    <button type="button" onClick={handleClick} >LIKE</button>)} */}
                            </> : <></>
                        }
                    </>
                ) :
                <p>Can't Read</p>
            }
        </div>
    )
}



export default AlbumDetials
