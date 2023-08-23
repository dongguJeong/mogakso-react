import React, { useState, useEffect, useRef } from 'react';

function Singing() {
  const [recording, setRecording] = useState(false);
  const [clips, setClips] = useState([]);
  const [count, setCount] = useState(1);
  const [chunks, setChunks] = useState([]);

  const mediaRecorderRef = useRef(null);

  useEffect(() => {
    if (navigator.mediaDevices.getUserMedia) {
      const constraint = { audio: true };

      const onSuccess = (stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            setChunks((prev) => [...prev, e.data]);
          }
        };
      };

      const onError = (err) => {
        console.log("오류 발생: " + err);
      };

      navigator.mediaDevices.getUserMedia(constraint).then(onSuccess, onError);
    } else {
      console.log("getUserMedia를 지원하지 않는 브라우저입니다");
    }
  }, []);

  const handleStartRecording = () => {
    setChunks([]); // Reset chunks
    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  const saveClip = () => {
    const clipName = `${count}번 클립`;
    setCount((prev) => prev + 1);
    const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
    setChunks([]);
    const audioURL = window.URL.createObjectURL(blob);
    setClips((prev) => [...prev, { clipName, audioURL }]);
  };

  useEffect(() => {
    if (chunks.length > 0) {
      saveClip();
    }
  }, [chunks]);

  return (
    <div>
      <span>녹음 클립들</span>
      <button onClick={handleStartRecording} disabled={recording}>
        녹음시작
      </button>
      <button onClick={handleStopRecording} disabled={!recording}>
        녹음종료
      </button>

      <section>
        {clips.map((clip, i) => (
          <div key={i}>
            <h1>{clip.clipName}</h1>
            <audio controls src={clip.audioURL}></audio>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Singing;
