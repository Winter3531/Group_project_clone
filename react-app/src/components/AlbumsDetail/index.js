import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { getAlbumDetail } from '../../store/albums'


const AlbumDetials = () => {
    const dispatch = useDispatch();
    const albums = useSelector(state=>state.albums)
    const { albumId } = useParams()

    // console.log(albumId) **confirmed

    useEffect(() => {
        dispatch(getAlbumDetail(albumId))
    }, [dispatch])

    return (
        <>
        {Object.values(albums).map(album =>
            <div>
                <div>{album.id}</div>
                <div>{album.album_name}</div>
            </div>
        )}
        </>
    )
}



export default AlbumDetials
