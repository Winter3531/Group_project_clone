import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { NavLink } from 'react-router-dom'

import { currentUserPlaylists } from "../../store/playlist";
import { currentUserAlbums } from "../../store/album";
import { likedUserThunk } from "../../store/session";

export default function ProfilePage() {
    const dispatch = useDispatch();
    const playlists = useSelector(state=>state.playlists)
    const albums = useSelector(state=>state.albums)
    const {user} = useSelector(state=>state.session)

    useEffect(()=> {
        dispatch(currentUserPlaylists())
        dispatch(currentUserAlbums())
    },[dispatch])

    return(
        <>
            <h1>Profile Page</h1>
            <div className="playlist-display">
                <h2>{user.username}'s Playlists</h2>
                {Object.values(playlists).map( playlist => (
                    <div className="playlist-card" key={playlist.id}>
                        <NavLink to={`/playlists/${playlist.id}`} >
                            <p>{playlist.playlist_name}</p>
                        </NavLink>
                    </div>
                ))}
            </div>
            <div className="album-display">
                <h2>{user.username}'s Albums</h2>
                {Object.values(albums).map( album => (
                    <div className="album-card" key={album.id}>
                        <NavLink to={`/albums/${album.id}`} >
                            <p>{album.album_name}</p>
                        </NavLink>
                    </div>
                ))}
            </div>
        </>
    )
}