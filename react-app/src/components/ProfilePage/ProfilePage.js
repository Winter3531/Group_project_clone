import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom'

import { currentUserPlaylists } from "../../store/playlist";
import { currentUserAlbums } from "../../store/album";
import { likedUserThunk } from "../../store/session";
import OpenPlayer from "../MusicPlayer/OpenPlayer";
import ProfileButton from '../Navigation/ProfileButton'

import './profilePage.css'
import { allSongsFetch } from "../../store/song";
import { getAllAlbums } from "../../store/album";
import OpenModalButton from "../OpenModalButton";


export default function ProfilePage() {
    const dispatch = useDispatch();
    const playlists = useSelector(state=>state.playlists)
    const albums = useSelector(state=>state.albums)
    const {user} = useSelector(state=>state.session)

    useEffect(()=> {
        if (user){
            dispatch(currentUserPlaylists());
            dispatch(currentUserAlbums());
        } else {
            dispatch(getAllAlbums())
        }
    },[dispatch, user])

    async function clickAttempt(){
    }

    return(
        <>
        {user ?
        <div className='profile-page-whole'>
            <div className="profile-page-header">
                <img  src={user.user_image} alt={`userimg${user.id}`} id="user-img" height={200} width={200}/>
                <div className="user-data">
                    <h2>{user.username}'s Profile</h2>
                    <p>{user.first_name} {user.last_name}</p>
                </div>
            </div>
            {playlists &&
                <div className="playlist-display">
                        <h3>Playlists</h3>
                        <div className="playlist-bar" >
                            {Object.values(playlists).map( playlist => (
                                <div className="playlist-card" key={playlist.id}>
                                    <img className="profile-playlist-img" src="https://d2rd7etdn93tqb.cloudfront.net/wp-content/uploads/2022/03/spotify-playlist-cover-orange-headphones-032322.jpg" height={90} width={90}/>
                                    <p>
                                        <NavLink to={`/playlists/${playlist.id}`} >
                                            <p id='link-to-item' >{playlist.playlist_name}</p>
                                        </NavLink>
                                    </p>
                                    <p className="play-button">
                                        <OpenPlayer type='playlists' typeId={playlist.id} />
                                    </p>
                                </div>
                            ))}
                        </div>
                </div>
            }
                <div className="album-display">
                    <h3>Albums</h3>
                    {/* <hr className="line-break"></hr> */}
                    <div className="album-bar">
                        {Object.values(albums).map( album => (
                            <div className="album-card" key={album.id}>
                                <img src={album.album_img} alt={`albumimg${album.id}`} id="album-img" height={90} width={90}/>
                                <p>
                                    <NavLink to={`/albums/${album.id}`} >
                                        <p id='link-to-item' >{album.album_name}</p>
                                    </NavLink>
                                </p>
                                <p className="play-button">
                                    <OpenPlayer type='albums' typeId={album.id} />
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
        </div>
        :
        <div className='no-profile'>
            <h2>All Albums</h2>
            <div className="no-user-all-albums" onClick={clickAttempt}>
                {Object.values(albums).map( album => (
                    <div className="album-card" key={album.id}>
                        <img src={album.album_img} alt={`albumimg${album.id}`} id="album-img" height={90} width={90}/>
                        <p>{album.album_name}</p>
                    </div>
                ))}
            </div>
        </div>
        }
        </>
    )
}
