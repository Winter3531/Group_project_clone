import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { getAlbumDetail } from '../../store/album'
import { useEffect, useState, useRef } from "react";


const AlbumDetials = () => {
    const dispatch = useDispatch();
    const { albumId } = useParams()
    console.log(albumId)
    let album = useSelector(state => state?.albums[albumId]);
    console.log(album, 'this is albums in albumdetails')

    useEffect(() => {
        dispatch(getAlbumDetail(albumId))
    }, [dispatch, albumId])

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
                    </>
                ) :
                <p>Can't Read</p>
            }
        </div>
    )
}



export default AlbumDetials
