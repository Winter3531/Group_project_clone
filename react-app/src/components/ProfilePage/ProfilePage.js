import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom'

import { currentUserPlaylists } from "../../store/playlist";
import { currentUserAlbums } from "../../store/album";
import { likedUserThunk } from "../../store/session";
// import OpenPlayer from "../MusicPlayer/OpenPlayer";

import './profilePage.css'


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
        {user ?
        <div className='profile-page-whole'>
            <div className="profile-page-header">
                <img  src={user.image} alt={`userimg${user.id}`} id="user-img" height={120} width={120}/>
                <h1>{user.username}'s Profile</h1>
                <p>{user.first_name} {user.last_name}</p>
            </div>
            {playlists &&
                <div className="playlist-display">
                        <h3>Playlists</h3>
                        <div className="playlist-bar" >
                            {Object.values(playlists).map( playlist => (
                                <div className="playlist-card" key={playlist.id}>
                                    <p>
                                        <NavLink to={`/playlists/${playlist.id}`} >
                                            <p>{playlist.playlist_name}</p>
                                        </NavLink>
                                    </p>
                                    <p className="play-button">
                                        {/* <OpenPlayer type='playlists' typeId={playlist.id} /> */}
                                    </p>
                                </div>
                            ))}
                        </div>
                </div>
            }
                <div className="album-display">
                    <h3>Albums</h3>
                    <div className="album-bar">
                        {Object.values(albums).map( album => (
                            <div className="album-card" key={album.id}>
                                <img src={album.album_img} alt={`albumimg${album.id}`} id="album-img" height={90} width={90}/>
                                <p>
                                    <NavLink to={`/albums/${album.id}`} >
                                        <p>{album.album_name}</p>
                                    </NavLink>
                                </p>
                                <p className="play-button">
                                    {/* <OpenPlayer type='albums' typeId={album.id} /> */}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
        </div>
        :
        <div className='no-profile'>
            <h2>Create an account to continue</h2>
        </div>
        }
        </>
    )
}
