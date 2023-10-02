import React, { useState } from "react";
import "./Home.css";

const Home: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [length, setLength] = useState<number>(16);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const generatePassword = () => {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

    let charset = "";
    if (includeUppercase) charset += uppercaseChars;
    if (includeLowercase) charset += lowercaseChars;
    if (includeNumbers) charset += numberChars;
    if (includeSymbols) charset += symbolChars;

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }

    setPassword(generatedPassword);
    setIsCopied(false);
  };

  const copyToClipboard = () => {
    const textarea = document.createElement("textarea");
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    setIsCopied(true);
  };

  return (
    <>
      <div className="container">
        <h2 className="title centerTitle">Password Generator</h2>
        <div className="result">
          <div className="result__title field-title">Generated Password</div>
          <div className="result__info right" onClick={copyToClipboard}>
            {isCopied ? "Copied!" : "Click to copy"}
          </div>
          <div className={`result__info left ${isCopied ? "show" : ""}`}>
            Copied!
          </div>
          <div className="result__viewbox" id="result">
            {password || "CLICK GENERATE"}
          </div>
          <button
            id="copy-btn"
            style={{ "--x": 0, "--y": 0 } as React.CSSProperties}
            onClick={copyToClipboard}
          >
            <i className="far fa-copy"></i>
          </button>
        </div>
        <div className="length range__slider" data-min="4" data-max="32">
          <div className="length__title field-title" data-length={length}>
            length: {length}
          </div>
          <input
            id="slider"
            type="range"
            min={4}
            max={32}
            defaultValue={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
          />
        </div>
        <div className="settings">
          <span className="settings__title field-title">settings</span>
          <div className="setting">
            <input
              type="checkbox"
              id="uppercase"
              defaultChecked={includeUppercase}
              onChange={() => setIncludeUppercase(!includeUppercase)}
            />
            <label htmlFor="uppercase">Include Uppercase</label>
          </div>
          <div className="setting">
            <input
              type="checkbox"
              id="lowercase"
              defaultChecked={includeLowercase}
              onChange={() => setIncludeLowercase(!includeLowercase)}
            />
            <label htmlFor="lowercase">Include Lowercase</label>
          </div>
          <div className="setting">
            <input
              type="checkbox"
              id="number"
              defaultChecked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
            />
            <label htmlFor="number">Include Numbers</label>
          </div>
          <div className="setting">
            <input
              type="checkbox"
              id="symbol"
              defaultChecked={includeSymbols}
              onChange={() => setIncludeSymbols(!includeSymbols)}
            />
            <label htmlFor="symbol">Include Symbols</label>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="btn generate" id="generate" onClick={generatePassword}>
            Generate Password
          </button>
          <br />
          <button
            className="btn p-3 relative generate"
            id="copy"
            onClick={copyToClipboard}
          >
            Copy Password
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
