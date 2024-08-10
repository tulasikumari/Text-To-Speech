import React, { useEffect, useRef, useState } from "react";
import countries from "../data";
import NavBar from "./navbar";

const toLanguages = {
  "en-GB": "English",
  "hi-IN": "Hindi",
  "es-ES": "Spanish",
  "de-DE": "German",
  "ne-NP": "Nepali",
  "bn-IN": "Bengali",
  "ja-JP": "Japanese",
  "fr-FR": "French",
  "bho-IN": "Bhojpuri",
};
const Translate = () => {
  const fromTextRef = useRef(null);
  const toTextRef = useRef(null);
  const exchangeIconRef = useRef(null);
  const selectFromRef = useRef(null);
  const selectToRef = useRef(null);
  const translateBtnRef = useRef(null);
  const iconsRef = useRef([]);
  const [charCount, setCharCount] = useState(0);
  const [savedTranslations, setSavedTranslations] = useState(
    JSON.parse(localStorage.getItem("translations")) || []
  );
  const charLimit = 200;

  useEffect(() => {
    const selectTag = [selectFromRef.current, selectToRef.current];
    selectTag.forEach((tag, id) => {
      for (let country_code in countries) {
        let selected =
          id === 0
            ? country_code === "en-GB"
              ? "selected"
              : ""
            : country_code === "hi-IN"
            ? "selected"
            : "";
        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
      }
    });

    const handleExchangeClick = () => {
      const fromText = fromTextRef.current.value;
      const toText = toTextRef.current.value;
      const fromLang = selectFromRef.current.value;
      const toLang = selectToRef.current.value;

      fromTextRef.current.value = toText;
      toTextRef.current.value = fromText;
      selectFromRef.current.value = toLang;
      selectToRef.current.value = fromLang;
    };

    const handleTranslateClick = () => {
      const text = fromTextRef.current.value.trim();
      const translateFrom = selectFromRef.current.value;
      const translateTo = selectToRef.current.value;

      if (!text) return;
      toTextRef.current.setAttribute("placeholder", "Translating...");

      const apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          const translatedText = data.responseData.translatedText;
          toTextRef.current.value = translatedText;
          toTextRef.current.setAttribute("placeholder", "Translation");

          // Save the translation
          saveTranslation(text, translatedText, translateFrom, translateTo);
        })
        .catch((error) => {
          console.error("Error translating text:", error);
          toTextRef.current.setAttribute("placeholder", "Translation failed");
        });
    };

    const handleIconClick = ({ target }) => {
      if (!fromTextRef.current.value || !toTextRef.current.value) return;
      if (target.classList.contains("fa-copy")) {
        if (target.id === "from") {
          navigator.clipboard.writeText(fromTextRef.current.value);
        } else {
          navigator.clipboard.writeText(toTextRef.current.value);
        }
      } else {
        let utterance;
        if (target.id === "from") {
          utterance = new SpeechSynthesisUtterance(fromTextRef.current.value);
          utterance.lang = selectFromRef.current.value;
        } else {
          utterance = new SpeechSynthesisUtterance(toTextRef.current.value);
          utterance.lang = selectToRef.current.value;
        }
        speechSynthesis.speak(utterance);
      }
    };

    const exchangeIcon = exchangeIconRef.current;
    const translateBtn = translateBtnRef.current;
    const iconElements = iconsRef.current;

    if (exchangeIcon) {
      exchangeIcon.addEventListener("click", handleExchangeClick);
    }

    if (translateBtn) {
      translateBtn.addEventListener("click", handleTranslateClick);
    }

    iconElements.forEach((icon) => {
      icon.addEventListener("click", handleIconClick);
    });

    return () => {
      if (exchangeIcon) {
        exchangeIcon.removeEventListener("click", handleExchangeClick);
      }

      if (translateBtn) {
        translateBtn.removeEventListener("click", handleTranslateClick);
      }

      iconElements.forEach((icon) => {
        icon.removeEventListener("click", handleIconClick);
      });
    };
  }, [savedTranslations]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        fromTextRef.current.value = content;
        setCharCount(content.length);
      };
      reader.readAsText(file);
    }
  };

  const saveTranslation = (text, translation, fromLang, toLang) => {
    const newTranslation = {
      text,
      translation,
      fromLang: toLanguages[fromLang] || fromLang, // Save full language name for fromLang
      toLang: toLanguages[toLang] || toLang, // Save full language name for toLang
      date: new Date().toLocaleString(),
    };

    const updatedTranslations = [newTranslation, ...savedTranslations];
    localStorage.setItem("translations", JSON.stringify(updatedTranslations));
    setSavedTranslations(updatedTranslations);
  };

  return (
    <>
      <NavBar />
      <div className="main-container">
        <div className="content">
          <h1 className="title">Connect Beyond Borders</h1>
          <h4 className="subtitle">
            From words to worlds: Explore in any language!
            <br />
          </h4>
          <button className="cta-button">Click Here!</button>
        </div>
        <div className="container">
          <div className="wrapper">
            <div className="text-input">
              <textarea
                spellCheck="false"
                className="from-text"
                placeholder="Enter text"
                ref={fromTextRef}
                onChange={(e) => setCharCount(e.target.value.length)}
              ></textarea>
              <p
                className={`char-counter ${
                  charCount > charLimit ? "limit-exceeded" : ""
                }`}
              >
                {charCount}/{charLimit} characters
              </p>
              <textarea
                spellCheck="false"
                readOnly
                disabled
                className="to-text"
                placeholder="Translation"
                ref={toTextRef}
              ></textarea>
            </div>
            <ul className="controls">
              <li className="row from">
                <div
                  className="icons"
                  ref={(el) => {
                    if (el) iconsRef.current.push(el);
                  }}
                >
                  <i id="from" className="fas fa-volume-up"></i>
                  <i id="from" className="fas fa-copy"></i>
                </div>
                <select ref={selectFromRef}></select>
              </li>
              <li className="exchange">
                <i className="fas fa-exchange-alt" ref={exchangeIconRef}></i>
              </li>
              <li className="row to">
                <select ref={selectToRef}></select>
                <div
                  className="icons"
                  ref={(el) => {
                    if (el) iconsRef.current.push(el);
                  }}
                >
                  <i id="to" className="fas fa-volume-up"></i>
                  <i id="to" className="fas fa-copy"></i>
                </div>
              </li>
            </ul>
          </div>
          <button ref={translateBtnRef} className="translate-btn">
            Translate Text
          </button>
          <input
            type="file"
            accept=".txt"
            onChange={handleFileUpload}
            className="file-upload"
          />
        </div>

      </div>
    </>
  );
};

export default Translate;