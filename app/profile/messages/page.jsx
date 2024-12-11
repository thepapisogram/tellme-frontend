"use client"
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import api from "@/app/api";
import axios from "axios";
import { toJpeg } from "html-to-image";
import clsx from "clsx";
import Logo from "@/app/components/logo";


export default function Home() {

  const [username] = useState(Cookies.get('username'));
  const [messages, setMessages] = useState([]);
  const [snapShow, setSnapShow] = useState(false);
  const [snapText, setSnapText] = useState('');
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
    const interval = setInterval(fetchMessages, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, [username]);

  const clearMessages = () => {
    setLoading(true)
    axios.put(`${api.user.clearMessages}${username}`)
    .then((res) => {
      if(res.staus === 200){
        setLoading(false);
        setMessages([]); // clear messages from state
      }
    })
    .catch((err) => {
      console.log('An Error Occurred', err);
    });
  }

  const snapAndShare = async (message) => {
    setSnapShow(true);
    setSnapText(message);
    const element = document.getElementById("preview");

    setTimeout(async () => {
      try {
      
      const dataUrl = await toJpeg(element, { quality: 1, pixelRatio: 3 });

      const response = await fetch(dataUrl);
      const blob = await response.blob();
      
      if (navigator.share) {
        await navigator.share({
          files: [
            new File([blob], "screenshot.jpeg", {
              type: "image/jpeg",
            }),
          ],
        });
        setSnapShow(false);
        console.log("Shared successfully!");
      } else {
        setSnapShow(false);
        console.error("Web Share API is not supported on this browser.");
      }
    } catch (error) {
      setSnapShow(false);
      console.error("Error generating or sharing the image:", error);
    }
    },100)
  };

  return (
    <>
    <div
      className={clsx(
        "items-center absolute top-0 left-0 w-full h-full bg-zinc-900 -z-10 p-10",
        {
          "flex": snapShow,
          "hidden": !snapShow
        }
      )}
      id="preview"
    >
      <div className="text-center w-full">
        <div className="mb-5">
          <Logo />
        </div>
        <i className="antialiased flex items-center justify-end text-4xl text-orange-900 fi fi-sr-quote-right"></i>
        <p className="antialiased text-orange-500 drop-shadow-md w-full text-2xl my-5">{snapText}</p>
        <i className="antialiased flex items-center justify-end text-4xl text-orange-900 rotate-180 fi fi-sr-quote-right"></i>
      </div>
    </div>
    <main className="page z-10" id="test">
      <div className="message-page">
        <div className="mb-4">
          <Logo />
          {messages.length > 0 && !loading && (
            <p className="text-center drop-shadow-sm mt-2 text-white tracking-widest dark:opacity-50">
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
              <div key={index}>
                <div id={`message-${index}`} className="message">
                  <p className="message-time">{message.date}</p>
                  <p className="message-text">{message.message}</p>
                  <div className="absolute bottom-2 right-3 flex items-center justify-end rounded-full p-2">
                    <button
                      onClick={() => snapAndShare(`${message.message}`)}
                      className="message-btn"
                    >
                      <i className="flex items-center fi fi-sr-share"></i>
                    </button>
                  </div>
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
    </>
  );
}
