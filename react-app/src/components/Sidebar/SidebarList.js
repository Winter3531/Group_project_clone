import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { currentUserAlbums } from "../../store/album";
import { currentUserPlaylists } from "../../store/playlist";
import './Sidebar.css'

const SidebarList = () => {
    const dispatch = useDispatch();
    const albums = useSelector(state=> state?.albums)
    const playlists = useSelector(state=> state?.playlists)

    useEffect(() => {
        dispatch(currentUserAlbums())
        dispatch(currentUserPlaylists())
    }, [dispatch]);

    console.log(albums, 'this si albums in side bar list ')
    console.log(playlists, 'this si albums in side bar list ')
    return (
        <div>
            <h3 className="album-list-header">Albums</h3>
            {albums && (albums ? Object.values(albums).map((album) => (
                <table className="album-list">
                <NavLink to={`/albums/${album.id}`}>
                <td>
                    <img className="album-image" src={album.album_img} alt="" />
                </td>
                <td className="list-name">
                    {album.album_name}
                </td>
                </NavLink>
                </table>
            )) : <></>)}
            <h3 className="album-list-header">Playlists</h3>
            {playlists && (playlists ? Object.values(playlists).map((playlist) => (
                <>
                <NavLink to={`/playlists/${playlist.id}`}>
                <div className="list-name">
                    {playlist.playlist_name}
                </div>
                </NavLink>
                </>
            )) : <></>)}
        </div>
    )
}


export default SidebarList
