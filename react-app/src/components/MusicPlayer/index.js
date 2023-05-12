import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { currentTracksFetch } from '../../store/playerState';

// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss' Use SASS

export default function Player() {
    const playlist = useSelector(state=>state.player?.songs)
    const [currentTrack, setTrackIndex] = useState(0)

    const handleClickNext = () => {
        // console.log('click next', currentTrack)
        setTrackIndex((currentTrack) =>
              currentTrack < playlist.length - 1 ? currentTrack + 1 : 0
          );
      };

    const handleClickPrev = () => {
        // console.log('click last', currentTrack)
        setTrackIndex((currentTrack) =>
            currentTrack > 0 ? currentTrack - 1 : 0
        )

    }

    const handleEnd = () => {
        // console.log('end', currentTrack)
        setTrackIndex((currentTrack) =>
              currentTrack < playlist.length - 1 ? currentTrack + 1 : 0
          );
    }

    return (
        <>
            {playlist &&
                <AudioPlayer
                volume="0.1"
                src={playlist[currentTrack].song_src}
                showSkipControls
                onClickNext={handleClickNext}
                onClickPrevious={handleClickPrev}
                onEnded={handleEnd}
                // Try other props!
                />
            }
        </>
    )
}
