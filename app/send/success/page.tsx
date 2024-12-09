"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";
import Logo from "@/app/components/logo";

export default function Home() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const authToken = Cookies.get("username");
    if(authToken !== undefined) setIsLoggedIn(true);
  }, []);

  const router = useRouter();
  const username = Cookies.get('temp');

  if(!username){
      setTimeout(() => router.push('/send'), 500);
  }


  return (
    <main className="page">
      <div className="page-container-wider">
        <div>
          <Logo />
          <p className="connect-subtitle">Message sent anonymously</p>
        </div>
        <div className="grid grid-cols-2 gap-3 my-3">
          <Link href={`/send/${username}`} className="page-btn">
            Send Again
          </Link>
          {isLoggedIn ? (
            <Link href="/profile" className="page-btn">
              View Profile
            </Link>
          ) : (
            <Link href="/connect/login" className="page-btn">
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
    </main>
  );
}
