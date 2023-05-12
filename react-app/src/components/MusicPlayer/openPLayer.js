
import React from 'react';
import { useDispatch } from 'react-redux';

import { currentTracksFetch } from '../../store/playerState';


const OpenPlayer = ({
    type,
    typeId
}) => {
    const dispatch = useDispatch();

    const onClick = (e) => {
        e.preventDefault();
        dispatch(currentTracksFetch(type, typeId));
    }

    return (
        <button onClick={onClick}> <i className="fas fa-play-circle"></i> </button>
    )
}

export default OpenPlayer
