"use client"
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import api from "../api";
import Logo from "../components/logo";
import GetStarted from "../components/get-started";
import PortfolioLink from "../components/portfolio-link";
import ButtonFunction from "../components/button-function";
import ButtonLink from "../components/button-link";

export default function Home() {
  const [username, setUsername] = useState<string>();

  useEffect(() => {
    const getUsername = async () => {
      const c = await Cookies.get("username");
      setUsername(c);
    }
    getUsername();
  }, []);

  const router = useRouter();
  const modalRef = useRef<HTMLDialogElement>(null);

  const showModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        `${api.share}${username}`
      );
      alert("Copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy: ", error);
      alert("Failed to copy text.");
    }
  }

  const handleLogout = async () => {
    try {
      await axios.post(api.connect.logout, {}, { withCredentials: true });
      Cookies.remove("username");
      Cookies.remove("token");
      router.push("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <main className="page">
      <div className="page-container-wider">
        <Logo />
        <div className="my-5">
          <ButtonFunction
            text="Tutorial: How to Use"
            icon="fi-ss-guide-alt"
            click={showModal}
            classes="col-span-2 mx-auto"
            alt={true}
          />
        </div>
        <div className="grid grid-cols-2 gap-3 my-5">
          <ButtonLink
            link="/profile/messages"
            text="View Messages"
            icon="fi-sr-comment-alt-dots"
            classes="col-span-2"
          />
          <ButtonFunction
            text="Copy Link"
            icon="fi-sr-copy-alt"
            click={copyToClipboard}
          />
          <ButtonFunction
            text="Logout"
            icon="fi-sr-power"
            click={handleLogout}
          />
        </div>
        <h3 className="text-center text-white opacity-30 font-bold tracking-widest">
          Share Your Link
        </h3>
        <div className="flex items-center justify-center gap-x-5 mt-5 mb-8 text-3xl ">
          <Link
            href={`https://api.whatsapp.com/send?text=${api.pre} ${api.share}${username}`}
            className="text-green-700 transition-all"
          >
            <i className="flex items-center fi fi-brands-whatsapp"></i>
          </Link>
          <Link
            href={`https://telegram.me/share/url?url=${api.share}&text=${api.pre}`}
            className="text-cyan-600 transition-all"
          >
            <i className="flex items-center fi fi-brands-telegram"></i>
          </Link>
          <Link
            href={`https://twitter.com/share?url=${api.share}${username}&text=${api.pre}`}
            className="text-zinc-400 transition-all"
          >
            <i className="flex items-center fi fi-brands-twitter-alt"></i>
          </Link>
        </div>
        <PortfolioLink />
      </div>
      <GetStarted dataRef={modalRef} />
    </main>
  );
}
