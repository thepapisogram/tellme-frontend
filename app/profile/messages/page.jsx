"use client"
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import api from "@/app/api";
import axios from "axios";
import Logo from "@/app/components/logo";


export default function Home() {

  const [username] = useState(Cookies.get('username'));
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.get(`${api.user.messages}${username}`);
      if(response.status === 200){
        setLoading(false);
        setMessages(response.data);
      }
    }
    fetchMessages();
    setInterval(fetchMessages, 5000); // refresh every 5s
  }, [username]);

  const clearMessages = () => {
    setLoading(true)
    axios.put(`${api.user.clearMessages}${username}`)
    .then((res) => {
      if(res.staus === 200){
        setLoading(false);
      }
    })
    .catch((err) => {
      console.log('An Error Occurred', err);
    });
  }

  return (
    <main className="page">
      <div className="message-page">
        <div className="mb-4">
          <Logo />
          {messages.length > 0 && !loading && (
            <p className="text-center drop-shadow-sm text-zinc-400 tracking-wide dark:opacity-50">
              @{username} | {messages.length} Messages
            </p>
          )}
        </div>
        {loading && (
          <div className="flex flex-col items-center justify-center my-10">
            <span className="loading text-orange-700 loading-ring loading-lg"></span>
          </div>
        )}
        <div className="messages-container">
          {messages.length > 0 &&
            !loading &&
            messages.map((message, index) => (
              <div className="flex items-center" key={index}>
                <div key={index} className="message">
                  <p className="message-time">{message.date}</p>
                  <p className="message-text">{message.message}</p>
                </div>
              </div>
            ))}
          {messages.length <= 0 && !loading && (
            <div className="flex flex-col md:col-span-full items-center justify-center text-orange-600 opacity-50 text-center p-10">
              <i className="flex items-center text-5xl fi fi-sr-star-comment-alt"></i>
              <span className="md:text-lg mt-2">No Messages Available</span>
            </div>
          )}
        </div>
        <div className="message-bar">
          <Link className="message-option" href="/profile">
            View Profile
          </Link>
          <button onClick={clearMessages} className="message-option">
            Clear Messages
          </button>
        </div>
      </div>
    </main>
  );
}
