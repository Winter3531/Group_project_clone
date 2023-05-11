import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom'

import { PlaylistDetailsFetch, currentUserPlaylists } from "../../store/playlist";
import { currentUserAlbums } from "../../store/album";
import { likedUserThunk } from "../../store/session";
import Player from "../MusicPlayer";
import OpenModalButton from "../OpenModalButton";
import { currentTracksFetch } from '../../store/playerState';

export default function ProfilePage() {
    const dispatch = useDispatch();
    const playlists = useSelector(state=>state.playlists)
    const albums = useSelector(state=>state.albums)
    const {user} = useSelector(state=>state.session)

    useEffect(()=> {
        dispatch(currentUserPlaylists())
        dispatch(currentUserAlbums())
    },[dispatch])

    const handleClickPlaylist = (e) => {
        e.preventDefault()
        dispatch(currentTracksFetch('playlists', 1))
    }

    const handleClickAlbum = (e) => {
        e.preventDefault()

        dispatch(currentTracksFetch('albums', 1))
    }

    return(
        <>
            <h1>Profile Page</h1>
                {playlists &&
                    <div className="playlist-display">
                            <h2>{user.username}'s Playlists</h2>
                            {Object.values(playlists).map( playlist => (
                                <div className="playlist-card" key={playlist.id}>
                                    <NavLink to={`/playlists/${playlist.id}`} >
                                        <p>{playlist.playlist_name}</p>
                                    </NavLink>
                                    <br></br>
                                    {/* <OpenModalButton
                                        buttonText="Play"
                                        modalComponent={<Player type='playlists' id={playlist.id} />}
                                    /> */}
                                    <button onClick={handleClickPlaylist } >
                                        play
                                    </button>
                                </div>
                            ))}
                    </div>
                }
            <div className="album-display">
                <h2>{user.username}'s Albums</h2>
                {Object.values(albums).map( album => (
                    <div className="album-card" key={album.id}>
                        <NavLink to={`/albums/${album.id}`} >
                            <p>{album.album_name}</p>
                        </NavLink>
                        <button onClick={handleClickAlbum} >
                            play
                        </button>
                    </div>
                ))}
            </div>
        </>
    )
}
