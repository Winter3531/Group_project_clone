import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { NavLink } from 'react-router-dom'


import './HomePage.css'
import { getAllAlbums } from "../../store/album";
import { getAllPlaylists } from "../../store/playlist";

export default function HomePage() {
    const dispatch = useDispatch();
    const playlists = useSelector(state=>state?.playlists)
    const albums = useSelector(state=>state?.albums)

    useEffect(()=> {
            dispatch(getAllAlbums())
            dispatch(getAllPlaylists())

    },[dispatch])

    async function clickAttempt(){
    }
    return (
        <div className='no-profile'>
            <div className="no-profile-header">
                <img alt='spotify-symbol' src='https://res.cloudinary.com/dtcuw5i2e/image/upload/v1684030309/spotify-logo_mvjr5k.jpg' height={50} width={50}/>
                <h1>SpotiPy</h1>
            </div>
            <h2>All Albums</h2>
            <div className="no-user-all-albums" onClick={clickAttempt}>
                {Object.values(albums).map( album => (
                    <NavLink to={`/albums/${album.id}`} className="album-card" key={album.id}>
                        <img src={album.album_img} alt={`albumimg${album.id}`} id="album-img" height={90} width={90}/>
                        <p>{album.album_name}</p>
                    </NavLink>
                ))}
            </div>
            <h2>All Playlists</h2>
            <div className="no-user-all-albums" onClick={clickAttempt}>
                {Object.values(playlists).map( playlist => (
                    <NavLink to={`/albums/${playlist.id}`} className="album-card" key={playlist.id}>
                        <img height={90} width={90} id='album-img' alt='playlist-stock-img' src="https://d2rd7etdn93tqb.cloudfront.net/wp-content/uploads/2022/03/spotify-playlist-cover-orange-headphones-032322.jpg"/>
                        <p>{playlist.playlist_name}</p>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}
