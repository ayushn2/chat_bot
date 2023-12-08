import TextToSpeech from "@/components/TextToSpeech"
import GPT from "@/components/GPT";
import Chat from "@/components/Chat";
import BotCanvas from "@/components/BotCanvas";
import IsPlayingProvider from "./context/isPlayingContext";
export default function Home() {
  
  return (
    <div className="h-screen">
      <IsPlayingProvider>
      <BotCanvas/>
      <Chat/>
      </IsPlayingProvider>
      
    </div>
  )
}
