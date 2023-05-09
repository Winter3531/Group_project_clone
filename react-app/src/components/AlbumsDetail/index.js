import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { getAlbumDetail } from '../../store/album'
import { useEffect, useState, useRef } from "react";
import EditAlbumFormModal from "../AlbumEdit";
import OpenModalButton from "../OpenModalButton";
import ConfirmDeleteAlbumModal from "../AlbumDeleteModal";



const AlbumDetials = () => {
    const dispatch = useDispatch();
    const { albumId } = useParams()
    const history = useHistory()
    let album = useSelector(state => state?.albums[albumId]);
    const sessionUser = useSelector(state => state?.session.user);

    // console.log(albumId) **confirmed

    useEffect(() => {
        dispatch(getAlbumDetail(albumId))
    }, [dispatch])


    let count = 0

    return (
        <div>
            {album ?
                (
                    <>
                        <p>album id: {album.id}</p>
                        <p>album name: {album.album_name}</p>
                        <p>year recorded: {album.year_recorded}</p>
                        <p>album img: {album.album_img}</p>
                        <p>user id: {album.user_id}</p>
                        <p>Username: {album.username}</p>
                        <div>song: </div>
                        {/* <div>song id {album.songs.map(song => <div>Name: {song.songs_name}  length: {Math.floor(song.length / 60)} mins {song.length % 60} secs</div>)}</div> */}
                        {/* <div>Name: {album.songs.songs_name.map(name =>
                            <div>{name}</div>)}
                        {album.songs.length.map(length =>
                           <div>length: {Math.floor(length / 60)} mins {length % 60} secs </div>)}</div> */}
                        {album.songs.map(song =>
                            <div>{count+= 1}. Name:{song.song_name} length:{Math.floor(song.song_length /60)}: {song.song_length % 60}</div>)}
                        {sessionUser && sessionUser.id === album.user_id ?
                            <>
                                <OpenModalButton
                                    buttonText={"Delete Album"}
                                    modalComponent={<ConfirmDeleteAlbumModal albumId={album.id} />} />
                                <OpenModalButton
                                    buttonText={"Edit Album"}
                                    modalComponent={<EditAlbumFormModal album={album} />} />
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
