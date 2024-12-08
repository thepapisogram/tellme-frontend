"use client"
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import Logo from "./components/logo";
import GetStarted from "./components/get-started";

export default function Home() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const authToken = Cookies.get("username");
    if (authToken !== undefined) setIsLoggedIn(true);
  }, []);

  const modalRef = useRef<HTMLDialogElement>(null);
  const showModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  return (
    <main className="page">
      <div className="page-container-wider">
        <div>
          <Logo />
          <p className="connect-subtitle">Anonymous Messaging & Feedback</p>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-8">
          <button onClick={showModal} className="page-btn">
            <i className="flex items-center fi fi-rs-guide-alt"></i>
            Get Started
          </button>
          {isLoggedIn ? (
            <Link href="/profile/" className="page-btn">
              <i className="flex items-center fi fi-sr-user-skill-gear"></i>
              View Profile
            </Link>
          ) : (
            <Link href="/connect/login" className="page-btn">
              <i className="flex items-center fi fi-rr-user-add"></i>
              Join Tell Me
            </Link>
          )}
        </div>
        <div>
          <Link
            href="https://anthonysaah.netlify.app/"
            className="connect-footer"
          >
            Developed by Anthony Saah
          </Link>
        </div>
      </div>

      <GetStarted dataRef={modalRef} />
    </main>
  );
}
