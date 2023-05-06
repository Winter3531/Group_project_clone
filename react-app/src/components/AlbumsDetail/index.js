import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { getAlbumDetail } from '../../store/album'
import { useEffect, useState, useRef } from "react";
import * as albumActions from '../../store/album';


const AlbumDetials = () => {
    const dispatch = useDispatch();
    const { albumId } = useParams()
    const history = useHistory()
    let album = useSelector(state => state?.albums[albumId]);

    useEffect(() => {
        dispatch(getAlbumDetail(albumId))
    }, [dispatch, albumId])


    const deleteAlbum = async (e) => {
        e.preventDefault();
        await dispatch(albumActions.deleteAlbum(albumId));
        await dispatch(albumActions.currentUserAlbums(albumId));
        history.push('/albums/current')

    }
    return (
        <div>
            {album ?
                (
                    <>
                        <p>{album.id}</p>
                        <p>{album.album_name}</p>
                        <p>{album.year_recorded}</p>
                        <p>{album.album_img}</p>
                        <p>{album.user_id}</p>
                        <button onClick={deleteAlbum}>Delete</button>
                    </>
                ) :
                <p>Can't Read</p>
            }
        </div>
    )
}



export default AlbumDetials
