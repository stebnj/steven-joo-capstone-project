import React, { useState } from "react";
import { useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/dashboard");
    } catch (error) {
      setError("Failed to sign in");
    }
    setLoading(false);
  }

  return (
    <main className="login">
      <section className="login__heading-container">
        <h2 className="login__heading">Log In</h2>
        <p className="login__error">{error}</p>
      </section>
      <section className="login__actions">
        <form className="login__form" onSubmit={handleSubmit}>
          <div className="login__content">
            <label className="login__label">Email</label>
            <input className="login__input" type="email" ref={emailRef} required />
          </div>
          <div className="login__content">
            <label className="login__label">Password</label>
            <input className="login__input"  type="password" ref={passwordRef} required />
          </div>
          <button className="login__button"  disabled={loading} type="submit">
            Log In
          </button>
        </form>
      </section>
      <section className="login__redirect">
        <section className="login__forgot-container">
            <Link className="login__link" to="/forgot-password">Forgot Password?</Link>
        </section>
        <section className="login__signup-container">
            <p className="login__signup">
            Don't have an account?<Link className="login__link" to="/signup"> Sign up</Link>{" "}
            </p>
        </section>
      </section>
    </main>
  );
}
