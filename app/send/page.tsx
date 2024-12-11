"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Logo from "../components/logo";
import api from "../api";
import Res from "../components/res";
import Loader from "../components/loader";

export default function Home() {
  const router = useRouter();
  const [res, setRes] = useState<string>('Search recipient username');
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');

  const proceed = () => {
    setLoading(true);
    axios.post(api.user.verify, { username })
    .then((response: { status: number; data: string; }) => {
      if(response.status === 200 && response.data === "Successful"){
        router.push(`/send/${username}`);
      }else{
        setLoading(false);
        setRes(response.data);
      }
    })
    .catch((error:unknown) => {
      setLoading(false);
      console.log('An Error Occurred', error);
    })
    // if(username !== '') router.push(`/send/${username}`);
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
        {/* <p className="connect-subtitle">Provide recipient username</p> */}
        <Res show={!loading} res={res} />
        <Loader show={loading} />
        <div className="connect-label-container">
          <label className="connect-label">
            <i className="connect-input-icon fi fi-sr-user"></i>
            <input
              type="text"
              className="connect-input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLocaleLowerCase().split(' ').join(''))}
              disabled={loading}
              required
            />
          </label>
        </div>
        <button disabled={loading} className="connect-submit">Continue</button>
        <p className="connect-footer">Developed by Anthony Saah</p>
      </form>
    </main>
  );
}
