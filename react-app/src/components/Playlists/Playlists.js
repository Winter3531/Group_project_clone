import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { currentUserPlaylists } from '../../store/playlist'

const UserPlaylists = () => {
    const dispatch = useDispatch();
    const playlists = useSelector(state=>state.playlists)

    useEffect(() => {
        dispatch(currentUserPlaylists())
    }, [dispatch])

    return (
        <>
        {Object.values(playlists).map(playlist =>
            <div key={playlist.id}>
                <div>{playlist.id}</div>
                <div>{playlist.playlist_name}</div>
            </div>
        )}
        </>
    )
}

export default UserPlaylists
