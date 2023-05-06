import React from "react";
import { useSelector,  } from "react-redux";
import PlaylistFormModal from "../Playlists/CreatePlaylistModal";
import OpenModalButton from "../OpenModalButton";


const SideNav = ({ isLoaded }) => {
    return (
        <ul>
            {isLoaded && (
                <li>
                    <OpenModalButton
                        buttonText="Create Playlist"
                        modalComponent={<PlaylistFormModal />}
                    />
                </li>
            )}
        </ul>
    )
}

export default SideNav;
