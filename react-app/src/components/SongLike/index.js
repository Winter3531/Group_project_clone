import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { allSongsFetch, likeSong, unLikeSong, getSongDetail } from "../../store/song";
import './SongLike.css'
import { getAlbumDetail } from "../../store/album";

const SongLike = ({song, albumId}) => {
    const sessionUser = useSelector(state => state?.session.user);
    const dispatch = useDispatch();
    const history = useHistory()

    const handleLikeSong = async (e) => {
        e.preventDefault()
        await dispatch(likeSong(song.id))
        await dispatch(getSongDetail(song.id))
    }

    const handleUnlikeSong = async (e) => {
        e.preventDefault()
        await dispatch(unLikeSong(song.id))
        await dispatch(getSongDetail(song.id))
    }

    useEffect(() => {
        dispatch(getSongDetail(song.id))
    }, [dispatch])

    return (
        <div>{Object.values(song.likes).map((like) => like.user_id) == sessionUser.id ?
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
        }</div>
    )
};

export default SongLike
