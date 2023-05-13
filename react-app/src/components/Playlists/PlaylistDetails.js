import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PlaylistDetailsFetch, likePlaylist, unlikePlaylist } from "../../store/playlist";
import OpenModalButton from "../OpenModalButton";
import EditPlaylistModal from "./EditPlaylistModal";
import DeletePlaylistModal from "./DeletePlaylistModal";
import RemoveSongModal from "./RemoveSongModal";
import Player from "../MusicPlayer";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import OpenPlayer from "../MusicPlayer/OpenPlayer";


const PlaylistDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const sessionUser = useSelector(state=>state.session.user);
    const { playlistId } = useParams();
    const playlist = useSelector(state=>state.playlists[playlistId]);


    useEffect(() => {
        dispatch(PlaylistDetailsFetch(playlistId));
    }, [dispatch, playlistId]);

    const likeClick = async (e) => {
        e.preventDefault();
        await dispatch(likePlaylist(playlistId))
        await dispatch(PlaylistDetailsFetch(playlistId))
        history.push(`/playlists/${playlistId}`)
    };

    const unlikeClick = async (e) => {
        e.preventDefault();
        await dispatch(unlikePlaylist(playlistId))
        await dispatch(PlaylistDetailsFetch(playlistId))
        history.push(`/playlists/${playlistId}`)
    };


    const playlistLikes = playlist?.likable_id
    let count = 0


    return playlist ? (
        <>
        <div>
            <div>Playlist Id: {playlist.id}</div>
        </div>
        <div>
            <div>Playlist Owner Id: {playlist.owner_id}</div>
        </div>
        <div>
            <div>Playlist Name: {playlist.playlist_name}</div>
        </div>
        <div>
        {(playlist.songs ? playlist.songs?.map(song =>
                            <div>
                                {count += 1}. Name:{song.song_name}
                                length:{Math.floor(song.song_length / 60)}: {song.song_length % 60}
                                <div className="delete-song-button">
                                    <OpenModalButton
                                    buttonText="Remove Song"
                                    modalComponent={<RemoveSongModal songId={song.song_id} playlistId={playlistId} />}/>
                                </div>
                            </div>)
                            : <div>No Songs </div>)}
        </div>
        <div>
            {playlistLikes && (
                <div>
                    <div>Playlist Likes: {playlistLikes.length}</div>
                </div>
            )}

            {playlist.likable_type == "playlist" ?
                <div className="like-input">
                    <div
                        className="true"
                        onClick={unlikeClick} >
                        <i className="fas fa-heart"></i>
                    </div>
                </div>
                :
                <div className="like-input">
                    <div
                        className="false"
                        onClick={likeClick} >
                        <i className="far fa-heart"></i>
                    </div>
                </div>
            }
            <OpenPlayer type='playlists' typeId={playlist.id} />
        </div>
        <div>
            {sessionUser !== undefined && sessionUser.id === playlist.owner_id && (
                <OpenModalButton
                    buttonText="Edit Playlist"
                    modalComponent={<EditPlaylistModal playlistId={playlistId} />}
                />
            )}
        </div>
        <div>
            {sessionUser !== undefined && sessionUser.id === playlist.owner_id && (
                <OpenModalButton
                    buttonText="Delete Playlist"
                    modalComponent={<DeletePlaylistModal playlistId={playlistId} />}
                />
            )}
        </div>
        </>
    ) :  null;
};


export default PlaylistDetails
