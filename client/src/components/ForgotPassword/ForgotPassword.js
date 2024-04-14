import React, { useState } from "react";
import { useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./ForgotPassword.scss";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);

      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch (error) {
      setError("Failed reset password");
    }
    setLoading(false);
  }

  return (
    <main className="password">
      <section className="password__heading-container">
        <h2 className="password__heading">Password Reset</h2>
        {error}
        <section className="password__message">{message}</section>
      </section>
      <section className="password__body">
        <section className="password__content">
          <form className="password__form" onSubmit={handleSubmit}>
            <div className="password__action">
              <label className="password__label">Email</label>
              <input className="password__input" type="email" ref={emailRef} required />
            </div>
            <button className="password__button" disabled={loading} type="submit">
              Reset Password
            </button>
          </form>
        </section>
        <section className="password__redirect-login">
          <Link className="password__link" to="/login">Login</Link>
        </section>
      </section>
      <section className="password__redirect-signup">
        <p className="password__text">
          Don't have an account?<Link className="password__link" to="/signup">Sign up</Link>{" "}
        </p>
      </section>
    </main>
  );
}
