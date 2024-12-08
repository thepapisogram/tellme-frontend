"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Cookies from 'js-cookie';
import api from "@/app/api";
import Image from "next/image";
import Logo from "@/app/components/logo";

export default function Home() {

  const router = useRouter();
  const [res, setRes] = useState<string>("Connect to your account");
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const login = async () => {
    try {
      const response = await axios.post(
        api.connect.login,
        { username, password },
        { withCredentials: true } // Ensures cookies are included
      );
      setRes(response.data);
      if (response.data === "Successfully Logged In") {
        Cookies.set("username", username, { expires: 30 }); // expires after 30 days
        setTimeout(() => router.push("/profile"), 1000); // Redirect to profile on success
      }
    } catch (error) {
      console.log("An Error Occurred", error);
    }
  }

  return (
    <main className="page">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
        className="page-container"
      >
        <Logo />
        <p className="connect-subtitle">{res}</p>
        <div className="connect-label-container">
          <label className="connect-label">
            <i className="connect-input-icon fi fi-rr-user"></i>
            <input
              type="text"
              className="connect-input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label className="connect-label">
            <i className="connect-input-icon fi fi-rr-lock"></i>
            <input
              type="password"
              className="connect-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button className="connect-submit">Log In</button>
        <Link className="connect-option" href="/connect/signup">
          Sign Up Instead?
        </Link>
        <p className="connect-footer">
          Developed by Anthony Saah
        </p>
      </form>
    </main>
  );
}
