import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import UserAlbums from "./components/AlbumsCurrent";
import AlbumDetials from "./components/AlbumsDetail";
import UserPlaylists from "./components/Playlists/Playlists"
import PlaylistDetails from "./components/Playlists/PlaylistDetails";
import CreatePlaylist from "./components/Playlists/CreatePlaylistModal";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/albums/current">
            <UserAlbums />
          </Route>
          <Route path="/albums/:albumId">
            <AlbumDetials />
          </Route>
          <Route exact path="/playlists/current">
            <UserPlaylists />
          </Route>
          <Route path="/playlists/:playlistId">
            <PlaylistDetails />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
