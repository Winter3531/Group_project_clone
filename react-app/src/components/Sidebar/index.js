import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlaylistFormModal from "../Playlists/CreatePlaylistModal";
import OpenModalButton from "../OpenModalButton";
import CreateAlbumFormModal from "../AlbumCreate";
import './Sidebar.css'
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { search } from "../../store/search";
import { allSongsFetch } from "../../store/song";
import { getAlbumDetail, getAllAlbums } from "../../store/album";
import SidebarList from "./SidebarList";


const SideNav = ({ isLoaded }) => {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const history = useHistory()
    const [input, setInput] = useState("")
    const { albumId } = useParams()

    const results = useSelector((state) => state.search)
    const albums = results.albums
    const songs = results.songs
    console.log(albumId, 'this is songs in search page')

    useEffect(() => {
        if (input.length > 0) {
            dispatch(search(input));
        }
    }, [dispatch, input])

    const show = () => {
        document.querySelector(".search-results").classList.remove('hidden');
    };

    const hide = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            document.querySelector(".search-results").classList.add('hidden');
        };
    };

    const reset = (id) => {
        document.querySelector(".search-results").classList.add("hidden");
        history.push(`/albums/${id}`);
        setInput("")
    }

    const randomColor = "#" + ((1 << 24) * Math.random() | 0).toString(16);
    document.documentElement.style.setProperty('--main-bg-color', randomColor);


    return (
        <div className="navi-drawer">
            <input
                className="search-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onFocus={() => show()}
                placeholder="Search..."
            />
            <div className="search-container" onBlur={(e) => hide(e)}>
                <div className="search-results hidden">
                    {songs && (songs.length > 0 && input?.length > 0 ?
                        songs.map((song) => (
                            <div key={song.id} className="search-card" onMouseDown={() => reset(song.album_id)}>
                                <p>Song</p>
                                <div>{song?.song_name}</div>
                            </div>))
                        : (input?.length > 0 ? <div className="search-none">Nothing.....</div> :
                            <div className="search-none hidden">Nothing.....</div>)
                    )}
                    {albums && (albums.length > 0 && input?.length > 0 ?
                        (
                            albums.map((album) => (
                                <div key={album.id} className="search-card" onMouseDown={() => reset(album.id)}>
                                    <p>Album</p>
                                    <div>{album.album_name}</div>
                                </div>))
                        ) : (input?.length > 0 ? <div className="search-none">Nothing.....</div> :
                            <div className="search-none hidden">Nothing.....</div>))}
                </div>

            </div>
            {isLoaded && sessionUser && (
                <div>
                    <div>
                        <OpenModalButton
                            buttonText="Create Playlist"
                            modalComponent={<PlaylistFormModal />}
                        /> Create Playlist
                    </div>
                    <div>
                        <OpenModalButton
                            buttonText="Create Album"
                            modalComponent={<CreateAlbumFormModal />}
                        /> Create Album
                    </div>
                    <div><SidebarList /></div>
                </div>
            )}


        </div>
    )
};

export default SideNav;
