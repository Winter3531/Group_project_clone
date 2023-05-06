import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { getAlbumDetail } from '../../store/album'
import { useEffect, useState, useRef } from "react";
import * as albumActions from '../../store/album';
import EditAlbumFormModal from "../AlbumEdit";
import OpenModalButton from "../OpenModalButton";


const AlbumDetials = () => {
    const dispatch = useDispatch();
    const { albumId } = useParams()
    const history = useHistory()
    let album = useSelector(state => state?.albums[albumId]);

    // console.log(albumId) **confirmed

    useEffect(() => {
        dispatch(getAlbumDetail(albumId))
    }, [dispatch])


    const deleteAlbum = async (e) => {
        e.preventDefault();
        await dispatch(albumActions.deleteAlbum(albumId));
        history.push('/albums/current')
        await dispatch(albumActions.currentUserAlbums());

    }
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
                        <div>likes: {album.likes}</div>
                        <OpenModalButton
                            buttonText={"Edit Album"}
                            modalComponent={<EditAlbumFormModal album={album}/>} />
                        <button onClick={deleteAlbum}>Delete</button>
                    </>
                ) :
                <p>Can't Read</p>
            }
        </div>
    )
}



export default AlbumDetials
