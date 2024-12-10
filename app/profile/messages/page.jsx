"use client"
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import api from "@/app/api";
import axios from "axios";
// import domtoimage from 'dom-to-image'
import { toPng } from "html-to-image";
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
    const interval = setInterval(fetchMessages, 5000); // refresh every 5s
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
      // Generate the image as a PNG
      const dataUrl = await toPng(element, { quality: 1, pixelRatio: 3 });

      // Convert the data URL to a Blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();

      // Use the Web Share API to share the image
      if (navigator.share) {
        await navigator.share({
          files: [
            new File([blob], "screenshot.png", {
              type: "image/png",
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

  // Below is if using dom-to-image
  // const snapAndShare = async (message) => {
  //   setSnapText(message);
  //   setSnapShow(true);
  //   console.log("about to share");
  //   const element = document.getElementById(`preview`);

  //   if (!element) {
  //     console.error("Element with ID 'preview' not found.");
  //     setSnapShow(false);
  //     return;
  //   }

  //   try {
  //     // Get the original dimensions of the element
  //     const { width, height } = element.getBoundingClientRect();

  //     const options = {
  //       width: width, // Use the original width
  //       height: height, // Use the original height
  //       scale: 1, // Set scale to 1 to avoid resizing
  //     };

  //     // Convert the element to an image
  //     const dataURL = await domtoimage.toPng(element, options);

  //     // Convert the dataURL to a blob for sharing
  //     const response = await fetch(dataURL);
  //     const blob = await response.blob();

  //     // Share the image using the Web Share API
  //     if (navigator.share) {
  //       await navigator.share({
  //         files: [
  //           new File([blob], "screenshot.png", {
  //             type: "image/png",
  //           }),
  //         ]
  //       });
  //       setSnapShow(false);
  //       console.log("Shared successfully!");
  //     } else {
  //       setSnapShow(false);
  //       console.error("Web Share API not supported.");
  //     }
  //   } catch (error) {
  //     setSnapShow(false);
  //     console.error("Error capturing or sharing screenshot:", error);
  //   }
  // };

  return (
    <main className="page" id="test">
      <div
        className={clsx(
          "items-center fixed top-0 left-0 w-full h-full bg-zinc-900 z-10 p-10",
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
                      <i className="flex items-center fi fi-ss-share"></i>
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
  );
}
