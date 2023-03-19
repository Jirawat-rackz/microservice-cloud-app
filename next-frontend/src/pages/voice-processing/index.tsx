import React from 'react';
import { useState, useRef, SetStateAction } from 'react';
import AudioRecorder from '@/components/audio-recorder';

function playAud() {
  const audioFileInput = document.getElementById('audioFileInput') as any;
  const audioPlayer = document.getElementById('audioPlayer') as any;

  audioFileInput?.addEventListener('change', function () {
    const file = audioFileInput.files[0];
    audioPlayer.src = URL.createObjectURL(file);
  });
}

const App = () => {
  let [recordOption, setRecordOption] = useState('video');
  const toggleRecordOption = (type: SetStateAction<string>) => {
    return () => {
      setRecordOption(type);
    };
  };

  return (
    <div>
      <style jsx global>
        {`
          h1 {
            font-weight: 700;
          }
          p {
            margin-bottom: 10px;
          }
          .button-flex {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
          }
          .audio-controls,
          .video-controls {
            margin-bottom: 20px;
          }
          .audio-player,
          .video-player {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .audio-player,
          .video-player,
          .recorded-player {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .live-player {
            height: 200px;
            width: 400px;
            border: 1px solid #646cff;
            margin-bottom: 30px;
          }
          .recorded-player video {
            height: 400px;
            width: 800px;
          }
          #aurec {
            float: left;
          }
          .card {
            border: 1px solid #ddd;
            background: #f4f4f4;
            padding: 20px;
            margin-bottom: 10px;
          }
          #header {
            font-size: 30px;
            margin-bottom: 15px;
            background: #333;
            color: #fff;
            padding: 10px;
            text-align: center;
          }
        `}
      </style>
      <header id="header">AI Recorder</header>
      <div className="button-flex"></div>
      <article className="card">
        <TextForm></TextForm>
      </article>
      <section id="aurec" className="card">
        {<AudioRecorder />}
      </section>
      <section id="auup" className="card">
        <div>
          <h2>Upload Audio File</h2>
          <input
            type="file"
            id="audioFileInput"
            accept=".wav"
            onInput={playAud}
            onChange={playAud}
          />
        </div>
        <div>
          <audio controls id="audioPlayer" src="audio/mpeg"></audio>
        </div>
      </section>
    </div>
  );
};

function TextForm() {
  const [inputText, setInputText] = useState('');

  function handleChange(event: any) {
    setInputText(event.target.value);
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    console.log('Submitted text: ', inputText);
    // Here you can do something with the submitted text
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter some text:
        <input type="text" value={inputText} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
      <p>Input text: {inputText}</p>
    </form>
  );
}

export default App;
