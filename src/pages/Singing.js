import React, { useState, useRef,useEffect } from "react";
import Layout from "../components/Layout";

 const AudioRecorder = () => {
      const [isRecording, setIsRecording] = useState(false);
      const mediaRecorderRef = useRef(null);
      const audioChunksRef = useRef([]);
    
      const startRecording = () => {
        const constraints = { audio: true };

        
        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                const mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.ondataavailable = handleDataAvailable;
                mediaRecorder.onstop = handleStop;
                mediaRecorderRef.current = mediaRecorder;
                setIsRecording(true);
                })
                .catch((error) => {
                    console.error("Error accessing the microphone:", error);
                });
            };
    
      const stopRecording = () => {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
      };
    
      const handleDataAvailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
    
      const handleStop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        // audioBlob을 서버로 업로드하거나 원하는 작업을 수행할 수 있습니다.
        // 여기서는 간단하게 오디오 재생을 위해 URL을 생성합니다.
        const audioUrl = URL.createObjectURL(audioBlob);
        const audioElement = new Audio(audioUrl);
        audioElement.play();
        audioChunksRef.current = [];
      };

      return { isRecording, startRecording, stopRecording };

    };

export default function Singing() {

    const { isRecording, startRecording, stopRecording } = AudioRecorder();

   
    return (
        <Layout>
            <div>나는 싱잉페이지</div>
          {isRecording ? (
            <button onClick={stopRecording}>Stop Recording</button>
          ) : (
            <button onClick={startRecording}>Start Recording</button>
          )}
        </Layout>
      );
    
    

}
