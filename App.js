import React, { useState } from 'react';
import './App.css';

const OCR_ENDPOINT = process.env.REACT_APP_OCR_ENDPOINT || 'http://localhost:5000/ocr';

function App() {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append('image', image);
    const res = await fetch(OCR_ENDPOINT, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    setText(data.text || 'Nessun testo trovato.');
  };

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <header>
        <h1>RisparmioSmart</h1>
        <button onClick={() => setDarkMode(!darkMode)}>🌓</button>
      </header>
      <main>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={handleUpload}>Analizza Volantino</button>
        <textarea readOnly value={text}></textarea>
      </main>
    </div>
  );
}

export default App;