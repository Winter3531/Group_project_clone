import React from "react";
import { useSelector,  } from "react-redux";
import PlaylistFormModal from "../Playlists/CreatePlaylistModal";
import OpenModalButton from "../OpenModalButton";
import CreateAlbumFormModal from "../AlbumCreate";


const SideNav = ({ isLoaded }) => {
    return (
        <ul>
            {isLoaded && (
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
}

export default SideNav;
