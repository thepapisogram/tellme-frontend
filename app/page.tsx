"use client"
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import Logo from "./components/logo";
import GetStarted from "./components/get-started";
import PortfolioLink from "./components/portfolio-link";
import ButtonLink from "./components/button-link";

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
          <p className="page-orange-txt mt-2">Anonymous Messaging & Feedback</p>
        </div>
        <div className="grid grid-cols-2 gap-3 my-5">
          <button onClick={showModal} className="page-btn">
            <i className="flex items-center fi fi-ss-guide-alt"></i>
            How to use
          </button>
          {isLoggedIn ? (
            <ButtonLink text="My Profile" link="/profile" icon="fi-ss-user" />
          ) : (
            <ButtonLink
              text="Sign Up"
              link="/connect/signup"
              icon="fi-sr-user-add"
            />
          )}
        </div>
        <PortfolioLink />
      </div>

      <GetStarted dataRef={modalRef} />
    </main>
  );
}
