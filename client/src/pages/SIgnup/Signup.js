import React, { useState } from "react";
import { useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.scss";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (error) {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <main className="signup">
      <section className="signup__heading-container">
        <h2 className="signup__heading">SIGN UP</h2>
        {error}
      </section>
      <section className="signup__action-container">
        <form className="signup__form" onSubmit={handleSubmit}>
          <div className="signup__action">
            <label className="signup__label">Email</label>
            <input
              className="signup__input"
              type="email"
              ref={emailRef}
              required
            />
          </div>
          <div className="signup__action">
            <label className="signup__label">Password</label>
            <input
              className="signup__input"
              type="password"
              ref={passwordRef}
              required
            />
          </div>
          <div className="signup__action">
            <label className="signup__label">Confirm Password</label>
            <input
              className="signup__input"
              type="password"
              ref={passwordConfirmRef}
              required
            />
          </div>
          <button className="signup__button" disabled={loading} type="submit">
            Sign Up
          </button>
        </form>
      </section>
      <section className="signup__redirect-container">
        <p className="signup__redirect">
          Already have an account? <Link to="/login">Log in</Link>{" "}
        </p>
      </section>
    </main>
  );
}
