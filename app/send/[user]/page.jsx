"use client"
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import api from "@/app/api";
import Logo from "@/app/components/logo";

export default function Home({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const [username] = useState(resolvedParams.user);
  const [message, setMessage] = useState("");

  // Redirect to Homepage if user does not exist
  // Hence cannot receive message
  useEffect(() => {
    const checkExists = async () => {
      const exists = await axios.post(api.user.verify, { username });
      if (exists.data !== 'Successful') {
        router.push("/send/");
      }
    };
    checkExists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = () => {
    axios
      .post(`${api.send.message}${username}`, { message })
      .then((res) => {
        if(res.data === "sent"){
          router.push(`/send/success?username=${username}`);
        }
      })
      .catch((error) => {
        console.log("An Error Occurred", error);
      });
  };

  return (
    <main className="page">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="page-container-wider"
      >
        <Logo />
        <p className="connect-subtitle">Leave an anonymous message</p>
        <div className="connect-label-container">
          <textarea
            className="connect-textarea"
            placeholder={`Send an anonymous message to ${username}`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button className="connect-submit">Send Message</button>
        <p className="connect-footer">Developed by Anthony Saah</p>
      </form>
    </main>
  );
}
