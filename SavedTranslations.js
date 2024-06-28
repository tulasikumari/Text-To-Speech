import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons";

const toLanguages = {
  "am-ET": "Amharic",
  "ar-SA": "Arabic",
  "be-BY": "Bielarus",
  "bem-ZM": "Bemba",
  "bi-VU": "Bislama",
  "bjs-BB": "Bajan",
  "bn-IN": "Bengali",
  "bo-CN": "Tibetan",
  "br-FR": "Breton",
  "bs-BA": "Bosnian",
  "ca-ES": "Catalan",
  "cop-EG": "Coptic",
  "cs-CZ": "Czech",
  "cy-GB": "Welsh",
  "da-DK": "Danish",
  "dz-BT": "Dzongkha",
  "de-DE": "German",
  "dv-MV": "Maldivian",
  "el-GR": "Greek",
  "en-GB": "English",
  "es-ES": "Spanish",
  "et-EE": "Estonian",
  "eu-ES": "Basque",
  "fa-IR": "Persian",
  "fi-FI": "Finnish",
  "fn-FNG": "Fanagalo",
  "fo-FO": "Faroese",
  "fr-FR": "French",
  "gl-ES": "Galician",
  "gu-IN": "Gujarati",
  "ha-NE": "Hausa",
  "he-IL": "Hebrew",
  "hi-IN": "Hindi",
  "hr-HR": "Croatian",
  "hu-HU": "Hungarian",
  "id-ID": "Indonesian",
  "is-IS": "Icelandic",
  "it-IT": "Italian",
  "ja-JP": "Japanese",
  "kk-KZ": "Kazakh",
  "km-KM": "Khmer",
  "kn-IN": "Kannada",
  "ko-KR": "Korean",
  "ku-TR": "Kurdish",
  "ky-KG": "Kyrgyz",
  "la-VA": "Latin",
  "lo-LA": "Lao",
  "lv-LV": "Latvian",
  "men-SL": "Mende",
  "mg-MG": "Malagasy",
  "mi-NZ": "Maori",
  "ms-MY": "Malay",
  "mt-MT": "Maltese",
  "my-MM": "Burmese",
  "ne-NP": "Nepali",
  "niu-NU": "Niuean",
  "nl-NL": "Dutch",
  "no-NO": "Norwegian",
  "ny-MW": "Nyanja",
  "ur-PK": "Pakistani",
  "pau-PW": "Palauan",
  "pa-IN": "Panjabi",
  "ps-PK": "Pashto",
  "pis-SB": "Pijin",
  "pl-PL": "Polish",
  "pt-PT": "Portuguese",
  "rn-BI": "Kirundi",
  "ro-RO": "Romanian",
  "ru-RU": "Russian",
  "sg-CF": "Sango",
  "si-LK": "Sinhala",
  "sk-SK": "Slovak",
  "sm-WS": "Samoan",
  "sn-ZW": "Shona",
  "so-SO": "Somali",
  "sq-AL": "Albanian",
  "sr-RS": "Serbian",
  "sv-SE": "Swedish",
  "sw-SZ": "Swahili",
  "ta-LK": "Tamil",
  "te-IN": "Telugu",
  "tet-TL": "Tetum",
  "tg-TJ": "Tajik",
  "th-TH": "Thai",
  "ti-TI": "Tigrinya",
  "tk-TM": "Turkmen",
  "tl-PH": "Tagalog",
  "tn-BW": "Tswana",
  "to-TO": "Tongan",
  "tr-TR": "Turkish",
  "uk-UA": "Ukrainian",
  "uz-UZ": "Uzbek",
  "vi-VN": "Vietnamese",
  "wo-SN": "Wolof",
  "xh-ZA": "Xhosa",
  "yi-YD": "Yiddish",
  "zu-ZA": "Zulu",

};

const SavedTranslations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("");
  const [filterDateRange, setFilterDateRange] = useState({
    start: "",
    end: "",
  });

  const savedTranslations =
    JSON.parse(localStorage.getItem("translations")) || [];
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const handleDelete = (indexToDelete) => {
    const updatedTranslations = savedTranslations.filter(
      (_, index) => index !== indexToDelete
    );
    localStorage.setItem("translations", JSON.stringify(updatedTranslations));
    window.location.reload(); // Refresh the page to update the table
  };

  const filteredTranslations = savedTranslations.filter((item) => {
    const matchesSearch =
      item.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.translation.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLanguage =
      filterLanguage === "" || toLanguages[item.toLang] === filterLanguage;

    const matchesDate =
      (!filterDateRange.start ||
        new Date(item.date) >= new Date(filterDateRange.start)) &&
      (!filterDateRange.end ||
        new Date(item.date) <= new Date(filterDateRange.end));

    return matchesSearch && matchesLanguage && matchesDate;
  });

  return (
    <div style={styles.mainContainer}>
      <button style={styles.backButton} onClick={handleBack}>
        <FontAwesomeIcon icon={faArrowLeft} style={styles.icon} />
        Back
      </button>
      <h1 style={styles.title}>History</h1>
      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
        <select
          value={filterLanguage}
          onChange={(e) => setFilterLanguage(e.target.value)}
          style={styles.filterSelect}
        >
          <option value="">All Languages</option>
          {Object.values(toLanguages).map((language, index) => (
            <option key={index} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>
      {filteredTranslations.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Text</th>
              <th style={styles.th}>Translated</th>
              <th style={styles.th}>From Language - To Language</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Time</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTranslations.map((item, index) => (
              <tr key={index}>
                <td style={styles.td}>{item.text}</td>
                <td style={styles.td}>{item.translation}</td>
                <td style={styles.td}>
                  <strong>{toLanguages[item.fromLang]}</strong> &rarr;{" "}
                  <strong>{toLanguages[item.toLang]}</strong>
                </td>
                <td style={styles.td}>{item.date.split(",")[0]}</td>
                <td style={styles.td}>{item.date.split(",")[1]}</td>
                <td style={styles.td}>
                  <button
                    style={styles.deleteButton}
                    onClick={() => handleDelete(index)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={styles.noTranslations}>No saved translations.</p>
      )}
    </div>
  );
};

const styles = {
  mainContainer: {
    paddingTop: "4rem", // Adjust this based on Navbar height
    padding: "2rem",
    maxWidth: "800px",
    margin: "0 auto",
  },
  backButton: {
    backgroundColor: "black",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    cursor: "pointer",
    marginBottom: "1.5rem",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginRight: "0.5rem",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1rem",
    textAlign: "center",
  },
  filters: {
    marginBottom: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  searchInput: {
    padding: "0.5rem",
    fontSize: "1rem",
    width: "100%",
  },
  filterSelect: {
    padding: "0.5rem",
    fontSize: "1rem",
    width: "100%",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "1rem",
  },
  th: {
    backgroundColor: "#f8f8f8",
    padding: "0.75rem",
    border: "1px solid #ddd",
    textAlign: "left",
  },
  td: {
    padding: "0.75rem",
    border: "1px solid #ddd",
  },
  deleteButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "red",
    cursor: "pointer",
    fontSize: "1.2rem",
  },
  noTranslations: {
    textAlign: "center",
    color: "#888",
    marginTop: "2rem",
    fontSize: "1.2rem",
  },
};

export default SavedTranslations;
