import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('demo@aa.io');
  const [password, setPassword] = useState('password');
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
        history.push('/collection')
    }
  };

  const createDemo = () => {
    return dispatch(login(email, password)).then(closeModal)
  }

  return (
    <div className="login-form-modal">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
        <button className='demoUser' onClick={createDemo}>Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
