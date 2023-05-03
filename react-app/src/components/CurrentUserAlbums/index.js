import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { currentUserAlbums } from '../../store/albums'


const UserAlbums = () => {
    const dispatch = useDispatch();
    const albums = useSelector(state=>state.albums)

    useEffect(() => {
        dispatch(currentUserAlbums())
    }, [dispatch])

    return (
        <>
        <h1>WE MAKE IT </h1>
        </>
    )
}



export default UserAlbums
