import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allSongsFetch, likeSong, unLikeSong, getSongDetail } from "../../store/song";
import { PlaylistDetailsFetch } from "../../store/playlist";
import './SongLike.css'

const PlaylistSongLike = ({song, playlistId}) => {
    const sessionUser = useSelector(state => state?.session.user);
    const dispatch = useDispatch();

    const handleLikeSong = async (e) => {
        e.preventDefault()
        await dispatch(likeSong(song.id))

        dispatch(PlaylistDetailsFetch(playlistId))
    }

    const handleUnlikeSong = async (e) => {
        e.preventDefault()
        await dispatch(unLikeSong(song.id))

        dispatch(PlaylistDetailsFetch(playlistId))
    }

    console.log(song, "song")
    console.log(playlistId, "playlistId")

    // useEffect(() => {
    //     dispatch(getSongDetail(song.id))
    // }, [dispatch])

    return (
        <div>
            {Object.values(song?.likes).map(like => like?.user_id) == sessionUser.id ?
            <div className="like-input">
            <div
                className="true"
                onClick={handleUnlikeSong} >
                <i className="fas fa-heart"></i>

            </div>
        </div> :
            <div className="like-input">
            <div
                className="false"
                onClick={handleLikeSong} >
                <i className="far fa-heart"></i>

            </div>
        </div>
        }
        </div>
    )
};

export default PlaylistSongLike
