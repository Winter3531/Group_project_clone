import React, { useState, useEffect, useRef } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/";
import { logout } from "../../store/session";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './ProfileButton.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const ulRef = useRef();
  const { closeModal } = useModal();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout());
    await history.push('/collection')
  };

  const createDemo = () => {
    setEmail('demo@aa.io');
    setPassword('password');
    return dispatch(login(email, password)).then(closeModal)
  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
        <i className="fas fa-user-circle" onClick={openMenu} />

      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div>User: {user.username}</div>
            <div>Email: {user.email}</div>
            <div>
              <button className="logout" onClick={handleLogout}>Log Out</button>
            </div>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
            <button className='demoUser' onClick={createDemo}>Demo User</button>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
