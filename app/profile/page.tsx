"use client"
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import api from "../api";
import Logo from "../components/logo";
import GetStarted from "../components/get-started";

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
  }

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
      router.push("/"); // Redirect to homepage after logout
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <main className="page">
      <div className="page-container-wider">
        <Logo />
        <div className="grid grid-cols-2 gap-3 mt-8">
          <button onClick={showModal} className="page-btn">
            <i className="flex items-center fi fi-rs-guide-alt"></i>
            Get Started
          </button>
          <Link href="/profile/messages" className="page-btn">
            <i className="flex items-center fi fi-rr-comment-alt"></i>
            Messages
          </Link>
          <button onClick={copyToClipboard} className="page-btn">
            <i className="flex items-center fi fi-tr-copy-alt"></i>
            Copy Link
          </button>
          <button onClick={handleLogout} className="page-btn">
            <i className="flex items-center fi fi-br-power"></i>
            Logout
          </button>
        </div>
        <h3 className="text-center text-orange-600 dark:font-bold tracking-widest mt-8">
          Share on other social media
        </h3>
        <div className="flex items-center justify-center gap-x-5 mt-5 mb-8 text-3xl ">
          {/* <Link
            href={`https://www.facebook.com/share_channel/?u=${api.share}${username}`}
            className="text-blue-600 transition-all"
          >
            <i className="flex items-center fi fi-brands-facebook"></i>
          </Link> */}
          <Link
            href={`https://api.whatsapp.com/send?text=${api.pre} ${api.share}${username}`}
            className="text-green-700 transition-all"
          >
            <i className="flex items-center fi fi-brands-whatsapp"></i>
          </Link>
          {/* <Link href="#" className="text-red-600 transition-all">
            <i className="flex items-center fi fi-brands-instagram"></i>
          </Link> */}
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
        <p className="connect-footer">Developed by Anthony Saah</p>
      </div>
      <GetStarted dataRef={modalRef} />
    </main>
  );
}
