"use client";

import React, { useEffect, useState, useRef } from "react";
import { Plus, MessageSquare, ChevronDown, CircleX } from "lucide-react";
import Image from "next/image";
import bot from "../public/images/bank.jpg";
import { IoSend } from "react-icons/io5";
import { CiFaceSmile } from "react-icons/ci";
import { IoIosAttach } from "react-icons/io";
import { useChat } from "ai/react";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";


export default function ChatBot() {
  // const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  let {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading: chatEndpointIsLoading,
  } = useChat({
    api: "../api/chat/retrieval_agents",
    headers: {
      "x-api-key": "sk-lf-84217faa-4041-8de5-69dd3cb09f7b",
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }

   
  }, [messages]);
  
  if (!chatEndpointIsLoading && messages.length !== 0) {
    localStorage.setItem("messages", JSON.stringify(messages));
    
  }

  // console.log(messages);

  const sendCustomMessage = (message: string) => {
    handleInputChange({
      target: { value: message, name: "input" },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const formatResponse = (responseToFormat: string) => {
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/g;
    const boldRegex = /\*\*([^*]+)\*\*/g;
  
    const formattedText = responseToFormat.split("\n").map((part, index) => {
      const elements = [];
      let lastIndex = 0;
  
      // Process links first
      part.replace(linkRegex, (match, text, url, offset) => {
        // Push the text before the link
        if (offset > lastIndex) {
          elements.push(part.substring(lastIndex, offset));
        }
        // Push the link as an anchor element
        elements.push(<a key={url} href={url} target="_blank" rel="noopener noreferrer" className="text-[#D92228]">{text}</a>);
        lastIndex = offset + match.length;
        return match; // Return the match to satisfy the replace function
      });
  
      // Handle remaining text after processing links
      if (lastIndex < part.length) {
        part = part.substring(lastIndex);
        lastIndex = 0;
  
        // Process bold text within the remaining part
        part.replace(boldRegex, (match, boldText, offset) => {
          if (offset > lastIndex) {
            elements.push(part.substring(lastIndex, offset));
          }
          elements.push(<strong key={index + boldText}>{boldText}</strong>);
          lastIndex = offset + match.length;
          return match;
        });
  
        // Push any remaining text after the last bold text
        if (lastIndex < part.length) {
          elements.push(part.substring(lastIndex));
        }
      }
  
      return <p key={index} className="mb-1">{elements}</p>;
    });
  
    return formattedText;
  };

  return (
    <div>
      <div className="fixed  bg-slate-100 rounded-2xl h-full w-full shadow-2xl ">
        <div className="flex justify-between items-center bg-white text-black rounded-t-2xl p-3 w-full shadow-4xl">
          <div className="flex items-center">
            <div className="relative w-16 h-16 overflow-hidden rounded-full">
              <Image src={bot} alt="bot icon" layout="fill" objectFit="cover" />
            </div>
            <div className="ml-3">
              <p className="text-lg font-bold">Chat with Naya</p>
              <p className="text-sm">Naya is an AI-assistant</p>
            </div>
          </div>
          {/* <button
            onClick={() => setActive(!active)}
            className="text-black hover:text-gray-800 focus:outline-none"
          >
            {open ? <CircleX size={24} /> : <ChevronDown size={24} />}
          </button> */}
        </div>

        {open && (
          <div className="p-3 bg-[#D92228] absolute">
            <p className="text-white text-[.79rem] text-center">
              Thank you for contacting Naya. Your privacy, security, and data
              are important to us and will only be used for the purpose of
              providing better service to you. Please be assured that we will
              keep your personal information in strict confidence.
            </p>
          </div>
        )}

        {messages && messages.length > 0 ? (
          <div
            className="w-full h-[72%] bg-slate-100 p-4 flex flex-col gap-5 overflow-y-auto scrollbar"
            ref={chatContainerRef}
          >
            <div className="bg-white w-fit px-4 py-3 text-black text-sm rounded-3xl">
              <button onClick={() => sendCustomMessage("How can I help you?")}>
                How can I help you?
              </button>
            </div>
            {messages.map((message, idx) => (
              <div
                key={idx}
                className={`w-fit px-4 py-2 text-black text-sm rounded-3xl ${
                  message.role === "user"
                    ? "self-end bg-[#D92228] text-white"
                    : "bg-white text-black"
                }`}
              >
                {formatResponse(message.content)}
              </div>
            ))}
          </div>
        ) : (
          <div
            className="w-full h-[72%] bg-slate-100 p-4 flex flex-col gap-5 overflow-y-auto scrollbar items-center justify-center"
            ref={chatContainerRef}
          >
            <div className="bg-white border border-[#D92228] w-fit px-4 py-3 text-black text-sm rounded-3xl  ">
              <button
                onClick={() =>
                  sendCustomMessage("⁠What services does Sterling Bank offer?")
                }
              >
                ⁠What services does Sterling Bank offer?
              </button>
            </div>
            <div className="bg-white border border-[#D92228] w-fit px-4 py-3 text-black text-sm rounded-3xl  ">
              <button
                onClick={() =>
                  sendCustomMessage(
                    "⁠How can I open an account with Sterling Bank?",
                  )
                }
              >
                ⁠How can I open an account with Sterling Bank?
              </button>
            </div>
            <div className="bg-white border border-[#D92228] w-fit px-4 py-3 text-black text-sm rounded-3xl  ">
              <button
                onClick={() =>
                  sendCustomMessage(
                    "How do I apply for a loan at Sterling Bank?",
                  )
                }
              >
                How do I apply for a loan at Sterling Bank?
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center absolute rounded-b-2xl bottom-0.5 left-0 right-0 bg-white p-4">
          <form
            className="w-full h-8 flex items-center"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              value={input}
              autoComplete="off"
              onChange={handleInputChange}
              className="w-[90%] text-black outline-none bg-transparent text-sm"
              placeholder="Send a message...."
            />

            <button
              disabled={chatEndpointIsLoading}
              className="bg-[#D92228] w-12 h-12 text-white flex items-center justify-center rounded-full disabled:opacity-50"
            >
              <IoSend />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
