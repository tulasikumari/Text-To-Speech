// import React, { useEffect, useRef, useState } from "react";
// import countries from "../data";
// import NavBar from "./navbar";

// const Translate = () => {
//   const fromTextRef = useRef(null);
//   const toTextRef = useRef(null);
//   const exchangeIconRef = useRef(null);
//   const selectFromRef = useRef(null);
//   const selectToRef = useRef(null);
//   const translateBtnRef = useRef(null);
//   const iconsRef = useRef([]);
//   const [charCount, setCharCount] = useState(0);
//   const [savedTranslations, setSavedTranslations] = useState(
//     JSON.parse(localStorage.getItem("translations")) || []
//   );
//   const charLimit = 200;

//   useEffect(() => {
//     const selectTag = [selectFromRef.current, selectToRef.current];
//     selectTag.forEach((tag, id) => {
//       for (let country_code in countries) {
//         let selected =
//           id === 0
//             ? country_code === "en-GB"
//               ? "selected"
//               : ""
//             : country_code === "hi-IN"
//             ? "selected"
//             : "";
//         let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
//         tag.insertAdjacentHTML("beforeend", option);
//       }
//     });

//     exchangeIconRef.current.addEventListener("click", () => {
//       const fromText = fromTextRef.current.value;
//       const toText = toTextRef.current.value;
//       const fromLang = selectFromRef.current.value;
//       const toLang = selectToRef.current.value;

//       fromTextRef.current.value = toText;
//       toTextRef.current.value = fromText;
//       selectFromRef.current.value = toLang;
//       selectToRef.current.value = fromLang;
//     });

//     translateBtnRef.current.addEventListener("click", () => {
//       const text = fromTextRef.current.value.trim();
//       const translateFrom = selectFromRef.current.value;
//       const translateTo = selectToRef.current.value;

//       if (!text) return;
//       toTextRef.current.setAttribute("placeholder", "Translating...");
      
//       const apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
//       fetch(apiUrl)
//         .then((res) => res.json())
//         .then((data) => {
//           const translatedText = data.responseData.translatedText;
//           toTextRef.current.value = translatedText;
//           toTextRef.current.setAttribute("placeholder", "Translation");

//           // Save the translation
//           saveTranslation(text, translatedText, translateFrom, translateTo);
//         })
//         .catch((error) => {
//           console.error("Error translating text:", error);
//           toTextRef.current.setAttribute("placeholder", "Translation failed");
//         });
//     });

//     iconsRef.current.forEach((icon) => {
//       icon.addEventListener("click", ({ target }) => {
//         if (!fromTextRef.current.value || !toTextRef.current.value) return;
//         if (target.classList.contains("fa-copy")) {
//           if (target.id === "from") {
//             navigator.clipboard.writeText(fromTextRef.current.value);
//           } else {
//             navigator.clipboard.writeText(toTextRef.current.value);
//           }
//         } else {
//           let utterance;
//           if (target.id === "from") {
//             utterance = new SpeechSynthesisUtterance(fromTextRef.current.value);
//             utterance.lang = selectFromRef.current.value;
//           } else {
//             utterance = new SpeechSynthesisUtterance(toTextRef.current.value);
//             utterance.lang = selectToRef.current.value;
//           }
//           speechSynthesis.speak(utterance);
//         }
//       });
//     });
//   }, []);

//   const saveTranslation = (text, translation, fromLang, toLang) => {
//     const newTranslation = {
//       text,
//       translation,
//       fromLang,
//       toLang,
//       date: new Date().toLocaleString(),
//     };

//     const updatedTranslations = [newTranslation, ...savedTranslations];
//     localStorage.setItem("translations", JSON.stringify(updatedTranslations));
//     setSavedTranslations(updatedTranslations);
//   };

//   return (
//     <>
//       <NavBar />
//       <div className="main-container">
//         <div className="content">
//           <h1 className="title">Connect Beyond Borders</h1>
//           <h4 className="subtitle">
//             From words to worlds: Explore in any language!
//             <br />
//           </h4>
//           <button className="cta-button">Click Here!</button>
//         </div>
//         <div className="container">
//           <div className="wrapper">
//             <div className="text-input">
//               <textarea
//                 spellCheck="false"
//                 className="from-text"
//                 placeholder="Enter text"
//                 ref={fromTextRef}
//                 onChange={(e) => setCharCount(e.target.value.length)}
//               ></textarea>
//               <p
//                 className={`char-counter ${
//                   charCount > charLimit ? "limit-exceeded" : ""
//                 }`}
//               >
//                 {charCount}/{charLimit} characters
//               </p>
//               <textarea
//                 spellCheck="false"
//                 readOnly
//                 disabled
//                 className="to-text"
//                 placeholder="Translation"
//                 ref={toTextRef}
//               ></textarea>
//             </div>
//             <ul className="controls">
//               <li className="row from">
//                 <div className="icons" ref={(el) => iconsRef.current.push(el)}>
//                   <i id="from" className="fas fa-volume-up"></i>
//                   <i id="from" className="fas fa-copy"></i>
//                 </div>
//                 <select ref={selectFromRef}></select>
//               </li>
//               <li className="exchange">
//                 <i className="fas fa-exchange-alt" ref={exchangeIconRef}></i>
//               </li>
//               <li className="row to">
//                 <select ref={selectToRef}></select>
//                 <div className="icons" ref={(el) => iconsRef.current.push(el)}>
//                   <i id="to" className="fas fa-volume-up"></i>
//                   <i id="to" className="fas fa-copy"></i>
//                 </div>
//               </li>
//             </ul>
//           </div>
//           <button ref={translateBtnRef} className="translate-btn">
//             Translate Text
//           </button>
//         </div>
//         {savedTranslations.length > 0 && (
//           <div className="saved-translations">
//             {/* <h3>Saved Translations</h3> */}
//             <ul>
//               {/* {savedTranslations.map((translation, index) => (
//                 <li key={index}>
//                   <strong>{translation.text}</strong> ({translation.fromLang} to {translation.toLang}) <br />
//                   {translation.translation} <br />
//                   <small>{translation.date}</small>
//                 </li>
//               ))} */}
//             </ul>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Translate;





// import React, { useEffect, useRef, useState } from "react";

// import NavBar from "./navbar";

// const fromLanguage = {
//   "en-GB": "English",
// };

// const toLanguages = {
//   "hi-IN": "Hindi",
//   "es-ES": "Spanish",
//   "de-DE": "German",
//   "ne-NP": "Nepali",
//   "bn-IN": "Bengali",
//   "ja-JP": "Japanese",
//   "fr-FR": "French",
//   "bho-IN": "Bhojpuri",
// };

// const dictionary = {
//   // dictionary entries...
//   "My name is Tulasi": {
//     "hi-IN": "मेरा नाम तुलसी है",
//     "ne-NP": "मेरो नाम तुलसी हो",
//     "es-ES": "Me llamo Tulasi",
//     "de-DE": "Mein Name ist Tulasi",
//     "bn-IN": "আমার নাম তুলসী",
//     "ja-JP": "私の名前はツラシです",
//     "fr-FR": "Je m'appelle Tulasi",
//     "bho-IN": "हमार नाव तुलसी बा",
//   },
//   hi: {
//     "hi-IN": "नमस्ते",
//     "ne-NP": "नमस्ते",
//     "es-ES": "Hola",
//     "de-DE": "Hallo",
//     "bn-IN": "হাই",
//     "ja-JP": "こんにちは",
//     "fr-FR": "Salut",
//     "bho-IN": "नमस्ते",
//   },
//   hello: {
//     "hi-IN": "नमस्ते",
//     "ne-NP": "नमस्ते",
//     "es-ES": "Hola",
//     "de-DE": "Hallo",
//     "bn-IN": "হ্যালো",
//     "ja-JP": "こんにちは",
//     "fr-FR": "Bonjour",
//     "bho-IN": "नमस्ते",
//   },
//   bye: {
//     "hi-IN": "अलविदा",
//     "ne-NP": "बिदाइ",
//     "es-ES": "Adiós",
//     "de-DE": "Tschüss",
//     "bn-IN": "বিদায়",
//     "ja-JP": "さようなら",
//     "fr-FR": "Au revoir",
//     "bho-IN": "अलविदा",
//   },
//   try: {
//     "hi-IN": "कोशिश",
//     "ne-NP": "प्रयास",
//     "es-ES": "Intentar",
//     "de-DE": "Versuchen",
//     "bn-IN": "চেষ্টা করা",
//     "ja-JP": "試す",
//     "fr-FR": "Essayer",
//     "bho-IN": "कोसिस",
//   },
//   my: {
//     "hi-IN": "मेरा",
//     "ne-NP": "मेरो",
//     "es-ES": "Mi",
//     "de-DE": "Mein",
//     "bn-IN": "আমার",
//     "ja-JP": "私の",
//     "fr-FR": "Mon",
//     "bho-IN": "हमार",
//   },
//   name: {
//     "hi-IN": "नाम",
//     "ne-NP": "नाम",
//     "es-ES": "Nombre",
//     "de-DE": "Name",
//     "bn-IN": "নাম",
//     "ja-JP": "名前",
//     "fr-FR": "Nom",
//     "bho-IN": "नांव",
//   },
//   is: {
//     "hi-IN": "है",
//     "ne-NP": "हो",
//     "es-ES": "Es",
//     "de-DE": "Ist",
//     "bn-IN": "হয়",
//     "ja-JP": "です",
//     "fr-FR": "Est",
//     "bho-IN": "बा",
//   },
//   tulasi: {
//     "hi-IN": "तुलसी",
//     "ne-NP": "तुलसी",
//     "es-ES": "Tulasi",
//     "de-DE": "Tulasi",
//     "bn-IN": "তুলসী",
//     "ja-JP": "ツラシ",
//     "fr-FR": "Tulasi",
//     "bho-IN": "तुलसी",
//   },
//   coventry: {
//     "hi-IN": "कोवेंट्री",
//     "ne-NP": "कोवेन्ट्री",
//     "es-ES": "Coventry",
//     "de-DE": "Coventry",
//     "bn-IN": "কভেন্ট্রি",
//     "ja-JP": "コベントリー",
//     "fr-FR": "Coventry",
//     "bho-IN": "कोवेन्ट्री",
//   },
//   "good morning": {
//     "hi-IN": "सुप्रभात",
//     "ne-NP": "शुभ प्रभात",
//     "es-ES": "Buenos días",
//     "de-DE": "Guten Morgen",
//     "bn-IN": "সুপ্রভাত",
//     "ja-JP": "おはようございます",
//     "fr-FR": "Bonjour",
//     "bho-IN": "सुप्रभात",
//   },
//   "good day": {
//     "hi-IN": "aapka din shubh ho",
//     "ne-NP": "शुभ दिन",
//     "es-ES": "Buenas tardes",
//     "de-DE": "Guten Tag",
//     "bn-IN": "শুভ অপরাহ্ন",
//     "ja-JP": "こんにちは",
//     "fr-FR": "Bon après-midi",
//     "bho-IN": "aapnan din subh ho",
//   },

//   seeyou: {
//     "hi-IN": "फिर मिलेंगे",
//     "ne-NP": "फेरि भेटौंला",
//     "es-ES": "Hasta luego",
//     "de-DE": "Auf Wiedersehen",
//     "bn-IN": "আবার দেখা হবে",
//     "ja-JP": "またね",
//     "fr-FR": "À bientôt",
//     "bho-IN": "फिर मिलब",
//   },
//   more: {
//     "hi-IN": "अधिक",
//     "ne-NP": "अझै",
//     "es-ES": "Más",
//     "de-DE": "Mehr",
//     "bn-IN": "আরও",
//     "ja-JP": "もっと",
//     "fr-FR": "Plus",
//     "bho-IN": "अधिक",
//   },
//   love: {
//     "hi-IN": "प्यार",
//     "ne-NP": "माया",
//     "es-ES": "Amor",
//     "de-DE": "Liebe",
//     "bn-IN": "ভালবাসা",
//     "ja-JP": "愛",
//     "fr-FR": "Amour",
//     "bho-IN": "प्यार",
//   },
//   apple: {
//     "hi-IN": "सेब",
//     "ne-NP": "स्याउ",
//     "es-ES": "Manzana",
//     "de-DE": "Apfel",
//     "bn-IN": "আপেল",
//     "ja-JP": "りんご",
//     "fr-FR": "Pomme",
//     "bho-IN": "सेब",
//   },
//   ball: {
//     "hi-IN": "गेंद",
//     "ne-NP": "बल",
//     "es-ES": "Pelota",
//     "de-DE": "Ball",
//     "bn-IN": "বল",
//     "ja-JP": "ボール",
//     "fr-FR": "Balle",
//     "bho-IN": "गेंद",
//   },
//   cat: {
//     "hi-IN": "बिल्ली",
//     "ne-NP": "बिरालो",
//     "es-ES": "Gato",
//     "de-DE": "Katze",
//     "bn-IN": "বিড়াল",
//     "ja-JP": "猫",
//     "fr-FR": "Chat",
//     "bho-IN": "बिल्ली",
//   },
//   dog: {
//     "hi-IN": "कुत्ता",
//     "ne-NP": "कुकुर",
//     "es-ES": "Perro",
//     "de-DE": "Hund",
//     "bn-IN": "কুকুর",
//     "ja-JP": "犬",
//     "fr-FR": "Chien",
//     "bho-IN": "कुत्ता",
//   },
//   discipline: {
//     "hi-IN": "अनुशासन",
//     "ne-NP": "अनुशासन",
//     "es-ES": "Disciplina",
//     "de-DE": "Disziplin",
//     "bn-IN": "শৃঙ্খলা",
//     "ja-JP": "規律",
//     "fr-FR": "Discipline",
//     "bho-IN": "अनुशासन",
//   },
//   manner: {
//     "hi-IN": "तरीका",
//     "ne-NP": "तरीका",
//     "es-ES": "Manera",
//     "de-DE": "Art",
//     "bn-IN": "পদ্ধতি",
//     "ja-JP": "方法",
//     "fr-FR": "Manière",
//     "bho-IN": "तरीका",
//   },
//   obedient: {
//     "hi-IN": "आज्ञाकारी",
//     "ne-NP": "आज्ञाकारी",
//     "es-ES": "Obediente",
//     "de-DE": "Gehorsam",
//     "bn-IN": "অনুগত",
//     "ja-JP": "従順な",
//     "fr-FR": "Obéissant",
//     "bho-IN": "आज्ञाकारी",
//   },
//   mannerless: {
//     "hi-IN": "असभ्य",
//     "ne-NP": "असभ्य",
//     "es-ES": "Mal educado",
//     "de-DE": "Unhöflich",
//     "bn-IN": "অসভ্য",
//     "ja-JP": "無礼な",
//     "fr-FR": "Grossier",
//     "bho-IN": "असभ्य",
//   },
//   absent: {
//     "hi-IN": "अनुपस्थित",
//     "ne-NP": "अनुपस्थित",
//     "es-ES": "Ausente",
//     "de-DE": "Abwesend",
//     "bn-IN": "অনুপস্থিত",
//     "ja-JP": "不在",
//     "fr-FR": "Absent",
//     "bho-IN": "अनुपस्थित",
//   },
//   present: {
//     "hi-IN": "उपस्थित",
//     "ne-NP": "उपस्थित",
//     "es-ES": "Presente",
//     "de-DE": "Anwesend",
//     "bn-IN": "উপস্থিত",
//     "ja-JP": "存在する",
//     "fr-FR": "Présent",
//     "bho-IN": "उपस्थित",
//   },
// };

// const Translate = () => {
//   const fromTextRef = useRef(null);
//   const toTextRef = useRef(null);
//   const exchangeIconRef = useRef(null);
//   const selectFromRef = useRef(null);
//   const selectToRef = useRef(null);
//   const translateBtnRef = useRef(null);
//   const iconsRef = useRef([]);
//   const [charCount, setCharCount] = useState(0);
//   const [savedTranslations, setSavedTranslations] = useState(
//     JSON.parse(localStorage.getItem("translations")) || []
//   );
//   const charLimit = 200; // Set your character limit here

//   useEffect(() => {
//     const fromText = fromTextRef.current;
//     const toText = toTextRef.current;
//     const exchangeIcon = exchangeIconRef.current;
//     const selectFrom = selectFromRef.current;
//     const selectTo = selectToRef.current;
//     const translateBtn = translateBtnRef.current;

//     const populateSelectOptions = (select, languages, defaultLang) => {
//       select.innerHTML = "";
//       for (let langCode in languages) {
//         let selected = langCode === defaultLang ? "selected" : "";
//         let option = `<option ${selected} value="${langCode}">${languages[langCode]}</option>`;
//         select.insertAdjacentHTML("beforeend", option);
//       }
//     };

//     populateSelectOptions(selectFrom, fromLanguage, "en-GB");
//     populateSelectOptions(selectTo, toLanguages, "hi-IN");

//     if (exchangeIcon) {
//       exchangeIcon.addEventListener("click", () => {
//         let tempText = fromText.value;
//         let tempLang = selectFrom.value;
//         fromText.value = toText.value;
//         toText.value = tempText;
//         selectFrom.value = selectTo.value;
//         selectTo.value = tempLang;
//       });
//     }

//     if (fromText) {
//       fromText.addEventListener("keyup", () => {
//         setCharCount(fromText.value.length);
//         if (!fromText.value) {
//           toText.value = "";
//         }
//       });
//     }

//     if (translateBtn) {
//       translateBtn.addEventListener("click", () => {
//         let text = fromText.value.trim();
//         let translateFrom = selectFrom.value;
//         let translateTo = selectTo.value;
//         if (!text) return;
//         toText.setAttribute("placeholder", "Translating...");

//         if (dictionary[text] && dictionary[text][translateTo]) {
//           toText.value = dictionary[text][translateTo];
//           saveTranslation(text, dictionary[text][translateTo], translateFrom, translateTo);
//         } else {
//           toText.value = "Translation not available";
//         }

//         toText.setAttribute("placeholder", "Translation");
//       });
//     }

//     iconsRef.current.forEach((icon) => {
//       if (icon) {
//         icon.addEventListener("click", ({ target }) => {
//           if (!fromText.value || !toText.value) return;
//           if (target.classList.contains("fa-copy")) {
//             if (target.id === "from") {
//               navigator.clipboard.writeText(fromText.value);
//             } else {
//               navigator.clipboard.writeText(toText.value);
//             }
//           } else {
//             let utterance;
//             if (target.id === "from") {
//               utterance = new SpeechSynthesisUtterance(fromText.value);
//               utterance.lang = selectFrom.value;
//             } else {
//               utterance = new SpeechSynthesisUtterance(toText.value);
//               utterance.lang = selectTo.value;
//             }
//             speechSynthesis.speak(utterance);
//           }
//         });
//       }
//     });
//   }, []);

//   const saveTranslation = (text, translation, fromLang, toLang) => {
//     const newTranslation = {
//         text,
//         translation,
//         fromLang,
//         toLang,
//         date: new Date().toLocaleString(),
//     };

//     // Retrieve existing translations from local storage or initialize an empty array
//     const savedTranslations = JSON.parse(localStorage.getItem("translations")) || [];

//     // Add the new translation to the array
//     const updatedTranslations = [newTranslation, ...savedTranslations];
    
//     // Update local storage with the new list of translations
//     localStorage.setItem("translations", JSON.stringify(updatedTranslations));

//     // Filter translations based on the selected `toLang`
//     const filteredTranslations = updatedTranslations.filter(translation => translation.toLang === toLang);

//     // Update the state with filtered translations
//     setSavedTranslations(filteredTranslations);
// };


//   return (
//     <>
//       <NavBar />
//       <div className="main-container">
//         <div className="content">
//           <h1 className="title">Connect Beyond Borders</h1>
//           <h4 className="subtitle">
//             From words to worlds: Explore in any language!
//             <br />
//           </h4>
//           <button className="cta-button">Click Here!</button>
//         </div>
//         <div className="container">
//           <div className="wrapper">
//             <div className="text-input">
//               <textarea
//                 spellCheck="false"
//                 className="from-text"
//                 placeholder="Enter text"
//                 ref={fromTextRef}
//               ></textarea>
//               <p
//                 className={`char-counter ${
//                   charCount > charLimit ? "limit-exceeded" : ""
//                 }`}
//               >
//                 {charCount}/{charLimit} characters
//               </p>
//               <textarea
//                 spellCheck="false"
//                 readOnly
//                 disabled
//                 className="to-text"
//                 placeholder="Translation"
//                 ref={toTextRef}
//               ></textarea>
//             </div>
//             <ul className="controls">
//               <li className="row from">
//                 <div className="icons" ref={(el) => iconsRef.current.push(el)}>
//                   <i id="from" className="fas fa-volume-up"></i>
//                   <i id="from" className="fas fa-copy"></i>
//                 </div>
//                 <select ref={selectFromRef}></select>
//               </li>
//               <li className="exchange">
//                 <i className="fas fa-exchange-alt" ref={exchangeIconRef}></i>
//               </li>
//               <li className="row to">
//                 <select ref={selectToRef}></select>
//                 <div className="icons" ref={(el) => iconsRef.current.push(el)}>
//                   <i id="to" className="fas fa-volume-up"></i>
//                   <i id="to" className="fas fa-copy"></i>
//                 </div>
//               </li>
//             </ul>
//           </div>
//           <button ref={translateBtnRef} className="translate-btn">
//             Translate Text
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Translate;



// const SavedTranslations = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterLanguage, setFilterLanguage] = useState("");

//   const savedTranslations =
//     JSON.parse(localStorage.getItem("translations")) || [];
//   const navigate = useNavigate();

//   const handleBack = () => {
//     navigate("/");
//   };

//   const filteredTranslations = savedTranslations.filter((item) => {
//     const matchesSearch =
//       item.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.translation.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesLanguage =
//       filterLanguage === "" || item.toLang === filterLanguage;

//     return matchesSearch && matchesLanguage;
//   });

//   return (
//     <div style={styles.mainContainer}>
//       <h1 style={styles.title}>History</h1>
//       <div style={styles.filters}>
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           style={styles.searchInput}
//         />
//         <select
//           value={filterLanguage}
//           onChange={(e) => setFilterLanguage(e.target.value)}
//           style={styles.filterSelect}
//         >
//           <option value="">All Languages</option>
//           {Object.values(toLanguages).map((language, index) => (
//             <option key={index} value={language}>
//               {language}
//             </option>
//           ))}
//         </select>
//       </div>
//       {filteredTranslations.length > 0 ? (
//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th style={styles.th}>Text</th>
//               <th style={styles.th}>Translated</th>
//               <th style={styles.th}>Date</th>
//               <th style={styles.th}>Time</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredTranslations.map((item, index) => (
//               <tr key={index}>
//                 <td style={styles.td}>{item.text}</td>
//                 <td style={styles.td}>{item.translation}</td>
//                 <td style={styles.td}>{item.date.split(",")[0]}</td>
//                 <td style={styles.td}>{item.date.split(",")[1]}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p style={styles.noTranslations}>No saved translations.</p>
//       )}
//     </div>
//   );
// };

// export default savedTranslations;