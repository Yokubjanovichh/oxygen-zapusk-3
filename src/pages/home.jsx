import React, { useState, useEffect } from "react";
import { PatternFormat } from "react-number-format";
// import { useNavigate } from "react-router-dom";
import mainBg2 from "../assets/img/mainBg-2.webp";
import camIcon from "../assets/icons/cam-icon.svg";
import titile from "../assets/img/titile.webp";
import styles from "./home.module.css";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const totalTime = 30;

  // const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   const url =
  //     "https://script.google.com/macros/s/AKfycbzmesk4Jfiu1K_ZOCJkvzFuJp5ICBSA0OrSKhlU6UyvWxUG7AM9zNH1aYHSPAMGqWE6/exec";
  //   fetch(url, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //     body: `Name=${name}&Email=${number}`,
  //   })
  //     .then((res) => res.text())
  //     .then((data) => {
  //       setIsLoading(false);
  //       navigate("/last");
  //       setNumber("");
  //       setName("");
  //     })
  //     .catch((error) => console.log(error));
  // };

  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (sec) => {
    const minutes = String(Math.floor(sec / 60)).padStart(2, "0");
    const seconds = String(sec % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const progressWidth = Math.max((timeLeft / totalTime) * 179, 50);

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.wrapper}>
        <div className={styles.navbar}>
          <div className={styles.navbarHeader}>
            <img src={camIcon} alt="camIcon" />
            <p>Online • 20:00 • 22-Avgust</p>
          </div>
          <img className={styles.navbarTitle} src={titile} alt="titile" />
          <button
            onClick={() => setIsModalOpen(true)}
            className={styles.navbarButton}
          >
            qatnashish
          </button>
          <p className={styles.navbarDesc}>
            22-avgust, soat 20:00 da Telegram kanalda jonli efir, qolib ketmang
          </p>
        </div>
        <div className={styles.buildings}>
          <img className={styles.bodyMainBG} src={mainBg2} alt="mainBg2" />
          <div className={styles.footer}>
            <p>
              Eng asosiysi, chegirma narxlar faqat online taqdimotda
              qatnashganlarga beriladi!
            </p>

            <div className={styles.timer}>
              <div
                className={styles.interval}
                style={{
                  width: `${progressWidth}px`,
                  transition: "width 1s linear",
                }}
              ></div>
              <p className={styles.time}>{formatTime(timeLeft)}</p>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            {/* <img src={modalStep} alt="modalStep" className={styles.modalStep} /> */}
            <p className={styles.information}>ma'lumotlaringizni qoldiring!</p>
            <div className={styles.form}>
              <div className={styles.inputs}>
                <input
                  type="text"
                  placeholder="Ismingiz"
                  name="name"
                  value={name || ""}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <PatternFormat
                  format="+998 ## ### ## ##"
                  allowEmptyFormatting
                  name="number"
                  mask=" "
                  value={number || ""}
                  onChange={(e) => setNumber(e.target.value)}
                  required
                  className={styles.contactInputPhone}
                  autoComplete="off"
                  placeholder="Telefon raqamingiz"
                />
              </div>
              <div className={styles.submit}>
                <button
                  className={number && name ? styles.activeButton : ""}
                  disabled={!number || !name}
                  // onClick={handleSubmit}
                >
                  Davom etish
                </button>
                {isLoading && <div className={styles.loader}></div>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
