import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlaylistFormModal from "../Playlists/CreatePlaylistModal";
import OpenModalButton from "../OpenModalButton";
import CreateAlbumFormModal from "../AlbumCreate";
import './Sidebar.css'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { search } from "../../store/search";
import { allSongsFetch } from "../../store/song";
import { getAlbumDetail, getAllAlbums } from "../../store/album";


const SideNav = ({ isLoaded }) => {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const history = useHistory()
    const [input, setInput] = useState("")

    const results = useSelector((state) => state.search?.results)
    console.log(results, 'this is result in search')

    useEffect(() => {
        if (input.length > 0) {
            dispatch(allSongsFetch());
            dispatch(getAllAlbums());
            dispatch(search(input));
        }
    }, [dispatch, input])

    const show = () => {
        document.querySelector(".search-results").classList.remove('hidden');
    };

    const hide = (e) => {
        if (!e.currentTarget.contain(e.relatedTarget)) {
            document.querySelector(".search-results").classList.add('hidden');
        };
    };

    const reset = (id) => {
        document.querySelector(".search-results").classList.add("hidden");
        dispatch(getAlbumDetail(id));
        history.push(`/albums/${id}`);
        setInput("")
    }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(search(input));

    }


    return (
        <ul>
            <div className="search-container" onBlur={(e) => hide(e)}>
                <from onSubmit={submitHandler}>

                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onFocus={() => show()}
                        placeholder="Search..."
                    />
                    <div className="search-results hidden">
                        {results?.albums.length > 0  && input?.length > 0 ? (
                            results?.albums.map((album) => (
                                <div className="search-card" onMouseDown={() => reset(album.id)}>
                                    <div>{album.album_name}</div>
                                </div>
                            ))
                        ) : (
                            <div className="search-none">No results.</div>
                        )}
                    </div>
                    <button type='submit'><i className="fa fa-search"> </i></button>
                </from>
            </div>
            {/* <div className="search-bar">
                <form onSubmit={submitHandler}>
                    <input type='text' value={term}
                        placeholder="Search..."
                            onChange={(e) => setTerm(e.target.value)} />
                    <button type='submit'><i className="fa fa-search"> </i></button>
                </form>
            </div> */}
            {isLoaded && sessionUser && (
                <div>
                    <li>
                        <OpenModalButton
                            buttonText="Create Playlist"
                            modalComponent={<PlaylistFormModal />}
                        />
                    </li>
                    <li>
                        <OpenModalButton
                            buttonText="Create Album"
                            modalComponent={<CreateAlbumFormModal />}
                        />
                    </li>
                </div>
            )}


        </ul>
    )
};

export default SideNav;
