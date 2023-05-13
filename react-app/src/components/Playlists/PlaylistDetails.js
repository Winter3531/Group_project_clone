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

import './PlaylistDetails.css'


const PlaylistDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const sessionUser = useSelector(state=>state.session.user);
    const { playlistId } = useParams();
    const playlist = useSelector(state=>state?.playlists[playlistId]);


    useEffect(() => {
        dispatch(PlaylistDetailsFetch(playlistId));
    }, [dispatch, playlistId]);

    const songLengthFunc = (data) => {
        const sec = data % 60
        const min = (data - sec) / 60
        if (sec === 0) {
            return `${min} min 00 sec`
        }
        if (sec < 10) {
            return `${min} min 0${sec} sec`
        }
        return `${min} min ${sec} sec`
    };

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


    let playlistLikes = playlist?.likable_id
    if (playlistLikes == null) {
        playlistLikes = 0
    }
    console.log(playlistLikes)
    let count = 0


    const songLengthsArr = playlist?.songs?.map(song => song.song_length);
    const summedSongs = songLengthsArr?.reduce((total, length) => total + length, null);
    const playlistSeconds = songLengthFunc(summedSongs)



    return playlist ? (
        <>
        <div className="playlist-details">
            <p>Playlist</p>

            <div>{playlist.playlist_name}</div>
            <p>
                <span>{playlist.owner_name}</span>
                {playlist?.songs ? (
                    <>
                        <span className="playlist-description">{playlist?.songs.length} Songs, </span>
                        <span className="playlist-time">{playlistSeconds}</span>
                    </>
                ): null}
            </p>
        </div>
        <div>
            {playlistLikes?.length >= 2 ? (
                <div>
                    <div>{playlistLikes.length} Likes</div>
                </div>
            ): (
                <div>
                    <div>{playlistLikes.length || 0} Like</div>
                </div>
            )}
            <div className="playlist-buttons">
                    {playlist.likable_type == "playlist" ?
                        <span className="like-input">
                            <i className="fas fa-heart true"
                                onClick={unlikeClick}></i>
                            </span>
                            :
                        <span className="like-input">
                            <i className="far fa-heart false"
                                onClick={likeClick}></i>
                        </span>
                    }
                    {sessionUser !== undefined && sessionUser.id === playlist.owner_id && (
                        <OpenModalButton
                            buttonText={"Edit Playlist"}
                            modalComponent={<EditPlaylistModal playlistId={playlistId} />}
                        />
                    )}
                    {sessionUser !== undefined && sessionUser.id === playlist.owner_id && (
                        <OpenModalButton
                            buttonText={"Delete Album"}
                            modalComponent={<DeletePlaylistModal playlistId={playlistId} />}
                        />
                    )}
            </div>
        </div>
        <table className="playlist-table">
            <tr className="song-header">
            <th >
                #</th>
                <th >Title</th>
                <th ><i className="far fa-clock"></i></th>
                <th></th>
            </tr>
        {(playlist.songs ? playlist.songs?.map(song =>
                            <tr >
                                <td>{count += 1}.</td>
                                <td>{song.song_name}</td>
                                <td>{songLengthFunc(song.song_length)}</td>
                                <div className="delete-song-button">
                                    <OpenModalButton
                                        buttonText={"Delete song"}
                                        modalComponent={<RemoveSongModal songId={song.song_id} playlistId={playlistId} />}/>
                                </div>
                            </tr>)
                            : <div>No Songs </div>)}
        </table>
        </>
    ) :  null;
};


export default PlaylistDetails
