import React, { useState } from "react";
import { useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./UpdateProfile.scss";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <main className="update">
      <section className="update__heading-container">
        <h2 className="update__heading">Update Profile</h2>
        <p className="update__error">{error}</p>
      </section>
      <section className="update__action-container">
        <form className="update__form" onSubmit={handleSubmit}>
          <div className="update__action">
            <label className="update__label">Email</label>
            <input className="update__input"
              type="email"
              ref={emailRef}
              required
              defaultValue={currentUser.email}
            />
          </div>
          <div className="update__action">
            <label className="update__label">Password</label>
            <input
              type="password" className="update__input"
              ref={passwordRef}
              placeholder="Leave blank to keep the same"
            />
          </div>
          <div className="update__action">
            <label className="update__label">Confirm Password</label>
            <input className="update__input"
              type="password"
              ref={passwordConfirmRef}
              placeholder="Leave blank to keep the same"
            />
          </div>
          <button className="update__button" disabled={loading} type="submit">
            Update
          </button>
        </form>
      </section>
      <section className="update__redirect">
        <p className="update__text">
          <Link className="update__link" to="/dashboard">Cancel</Link>{" "}
        </p>
      </section>
    </main>
  );
}
