import React from "react";
import { useSelector } from "react-redux";
import PlaylistFormModal from "../Playlists/CreatePlaylistModal";
import OpenModalButton from "../OpenModalButton";


const SideNav = ({ isLoaded }) => {
    const sessionUser = useSelector(state=>state.session.user)
    return (
        <ul>
            {isLoaded && sessionUser && (
                <li>
                    <OpenModalButton
                        buttonText="Create Playlist"
                        modalComponent={<PlaylistFormModal />}
                    />
                </li>
            )}
        </ul>
    )
};

export default SideNav;
