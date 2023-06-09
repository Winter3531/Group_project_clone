import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss' Use SASS

export default function Player() {
    const dispatch = useDispatch();
    const playlist = useSelector(state=>state.player?.songs)
    const sessionUser = useSelector(state=>state.session?.user)
    const [currentTrack, setTrackIndex] = useState(0)

    useEffect(() => {
        setTrackIndex(0)
    },[dispatch, playlist])

    const handleClickNext = () => {
        // console.log(currentTrack, "NEXT")
        setTrackIndex((currentTrack) =>
            currentTrack < playlist.length - 1 ? currentTrack + 1 : 0
          );
      };

    const handleClickPrev = () => {
        setTrackIndex((currentTrack) =>
            currentTrack > 0 ? currentTrack - 1 : 0
        )
    }

    const handleEnd = () => {
        // console.log(currentTrack, "END")
        setTrackIndex((currentTrack) =>
            currentTrack < playlist.length - 1 ? currentTrack + 1 : 0
          );
    }

    return (
        <>
            {playlist && sessionUser &&
                <AudioPlayer
                volume="0.1"
                src={playlist[currentTrack]?.song_src}
                showSkipControls
                onClickNext={handleClickNext}
                onClickPrevious={handleClickPrev}
                onEnded={handleEnd}
                // Try other props!
                autoPlay={true}
                />
            }
        </>
    )
}
