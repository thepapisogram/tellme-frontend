"use client"
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import api from "@/app/api";
import axios from "axios";
import Logo from "@/app/components/logo";

export default function Home() {

  const [username] = useState(Cookies.get('username'));
  const [messages, setMessages] = useState<Array<any>>([]);
  
  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.get(`${api.user.messages}${username}`);
      if(response.status === 200){
        setMessages(response.data);
      }
    }
    setInterval(fetchMessages, 3000); // refresh every 3s
  }, [username]);

  return (
    <main className="page">
      <div className="page-container-widest">
        <div className="mb-4">
          <Logo />
          {messages.length > 0 && (
            <p className="text-center drop-shadow-sm text-zinc-400 tracking-wide dark:opacity-50">
              @{username} | {messages.length} Messages
            </p>
          )}
        </div>
        <div className="messages-container">
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <div className="flex items-center" key={index}>
                <div key={index} className="message">
                  <p className="message-time">{message.date}</p>
                  <p className="message-text">{message.message}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col md:col-span-full items-center justify-center text-orange-600 opacity-50 text-center p-10">
              <i className="flex items-center text-5xl fi fi-sr-star-comment-alt"></i>
              <span className="md:text-lg mt-2">No Messages Available</span>
            </div>
          )}
        </div>
        <Link className="connect-option" href="/profile">
          Go to Home
        </Link>
      </div>
    </main>
  );
}
