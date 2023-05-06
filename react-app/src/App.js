import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import UserAlbums from "./components/AlbumsCurrent";
import AlbumDetials from "./components/AlbumsDetail";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import CreateAlbumForm from "./components/AlbumCreate";
import EditAlbumForm from "./components/AlbumEdit";

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
          <Route exact path='/albums/new'>
            <CreateAlbumForm />
          </Route>
          <Route exact path="/albums/current">
            <UserAlbums />
          </Route>
          <Route path='/albums/:albumId/edit'>
            <EditAlbumForm />
          </Route>
          <Route path="/albums/:albumId">
            <AlbumDetials />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
