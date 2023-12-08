"use client"

import React from 'react'
import { useState,useClient } from 'react';
import axios from 'axios';

const DEVELOPER_ACCESS_TOKEN = "uK_fQvP_RWd0TwSksWI35Zj0EVS1wI_h"//save this as an environment
const API_KEY= "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"

const GPT = () => {
    const [userText,setUserText] = useState("")
    const [isLoading,setIsLoading] = useState(false)
    const [called,setCalled] = useState(false)
    const [response, setResponse] = useState('');

    const callOpenAIAPI = async () => {
        if (!called) {
            console.log("Calling Open AI API");
    
            const APIBody = {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "user",
                        content: "Hello", // Pass the user's input here
                    },
                ],
                temperature: 0.5,
                max_tokens: 256,
            };
    
            try {
                const response = await fetch("https://api.openai.com/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${API_KEY}`,
                    },
                    body: JSON.stringify(APIBody),
                });
    
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                } else {
                    console.error("Request failed with status:", response.status);
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }
    
        setCalled(true);
    };
    

    const Chatbot = () => {

      
        const callChatbotAPI = () => {
          try {
            const response =  axios.get('https://api.chatbot.com/v2/stories', {
              headers: {
                Authorization: `Bearer ${DEVELOPER_ACCESS_TOKEN}`,
              },
              params: {
                message: userText,
              },
            });
      
            // Handle the response data
            setResponse(response);
      
          } catch (error) {
            // Handle any errors
            console.error('An error occurred:', error);
          }
          console.log(response)
        }
       
    }

console.log(userText)
    
  return (
    <div>
      <form className="absolute top-[500px] transform translate-x-1/2 space-x-2 pt-3">
        
        <input
        value={userText}
        className="bg-transparent w-[510px] border border-[#b00c3f]/80 outline-none rounded-lg placeholder:text-[#b00c3f] p-2 text-[#b00c3f]"
        placeholder="What do you want to know"
        onChange={(e)=>setUserText(e.target.value)}
        />

        <button 
        type="button"
        onClick={callOpenAIAPI}
        disabled={isLoading}
        className="text-[#b00c3f] p-2 border-[#b00c3f] rounded-lg disabled:text-blue-100 disabled:cursor-not-allowed disabled:bg-gray-500
        hover:scale-110 hover:text-black hover:bg-[#b00c3f] duration-300 transition-all">
            {isLoading?"thinking...":"Ask"}
            
        </button>

      </form>
    </div>
  )
}

export default GPT
