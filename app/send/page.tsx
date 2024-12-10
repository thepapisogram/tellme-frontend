"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "../components/logo";

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState<string>('');

  const proceed = () => {
    if(username !== '') router.push(`/send/${username}`);
  }

  return (
    <main className="page">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          proceed();
        }}
        className="page-container"
      >
        <Logo />
        <p className="connect-subtitle">Provide recipient username</p>
        <div className="connect-label-container">
          <label className="connect-label">
            <i className="connect-input-icon fi fi-rr-user"></i>
            <input
              type="text"
              className="connect-input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLocaleLowerCase().split(' ').join(''))}
              required
            />
          </label>
        </div>
        <button className="connect-submit">Continue</button>
        <p className="connect-footer">Developed by Anthony Saah</p>
      </form>
    </main>
  );
}
