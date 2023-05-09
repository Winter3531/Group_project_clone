import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlaylistFormModal from "../Playlists/CreatePlaylistModal";
import OpenModalButton from "../OpenModalButton";
import CreateAlbumFormModal from "../AlbumCreate";
import './Sidebar.css'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { search } from "../../store/search";


const SideNav = ({ isLoaded }) => {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const [term, setTerm] = useState("")
    const history = useHistory()

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(search());
        history.push('/search')

    }


    return (
        <ul>
            <div className="search-bar">
                <form onSubmit={submitHandler}>
                    <input type='text' value={term}
                        placeholder="Search..."
                            onChange={(e) => setTerm(e.target.value)} />
                    <button type='submit'><i className="fa fa-search"> </i></button>
                </form>
            </div>
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
