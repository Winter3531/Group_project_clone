import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import UserAlbums from "./components/AlbumsCurrent";
import AlbumDetials from "./components/AlbumsDetail";
import UserPlaylists from "./components/Playlists/Playlists"
import PlaylistDetails from "./components/Playlists/PlaylistDetails";
import SongsDisplay from "./components/Songs/Song";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import SideNav from "./components/Sidebar";
import CreateAlbumForm from "./components/AlbumCreate";
import EditAlbumForm from "./components/AlbumEdit";
import SearchResult from "./components/Search";
import Player from "./components/MusicPlayer";
import './App.css'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <div className="whole-page">
        <div className="navi-drawer">
          <Navigation isLoaded={isLoaded} />
          <SideNav isLoaded={isLoaded} />
        </div>
        <div className="pages">
          {isLoaded && (
            <Switch>
              <Route path="/login" >
                <LoginFormPage />
              </Route>
              <Route path="/signup">
                <SignupFormPage />
              </Route>
              <Route path="/collection">
                <ProfilePage />
              </Route>
              <Route exact path='/albums/new'>
                <CreateAlbumForm />
              </Route>
              <Route exact path="/albums/current">
                <UserAlbums />
              </Route>
              <Route path='/albums/:albumId/edit'>
                <EditAlbumForm />
              </Route>
              <Route exact path="/albums/:albumId">
                <AlbumDetials />
              </Route>
              <Route exact path="/playlists/current">
                <UserPlaylists />
              </Route>
              <Route path="/playlists/:playlistId">
                <PlaylistDetails />
              </Route>
              <Route path="/songs">
                <SongsDisplay />
              </Route>
              <Route path="/search">
                <SearchResult />
              </Route>
            </Switch>
          )}
        </div>
      </div>
      <div className="player">
          <Player />
      </div>
    </>
  );
}

export default App;
