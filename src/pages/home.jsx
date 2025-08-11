import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PatternFormat } from "react-number-format";
import Loader from "../components/loader";
import mainBg2 from "../assets/img/mainBg-2.webp";
import camIcon from "../assets/icons/cam-icon.svg";
import modalStep from "../assets/icons/modalStep.svg";
import giftIcon from "../assets/icons/gift.svg";
import styles from "./home.module.css";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [pageLoaded, setPageLoaded] = useState(false);

  const totalTime = 30;

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Telefon raqamni tozalash (faqat raqamlar qoldiriladi)
    const cleanedNumber = number.replace(/\D/g, "");

    // Tez feedback
    navigate("/last");
    setNumber("");
    setName("");
    setIsLoading(false);

    // Sheets’ga ma'lumotni sendBeacon bilan yuborish
    const url =
      "https://script.google.com/macros/s/AKfycby-YD2ueEEC8rbzLLHS5x3zUhEg1MIM8jzEjFbOYBeAztQbrklaps5wyDpZCohxkK3j6A/exec";

    const formData = new URLSearchParams();
    formData.append("Name", name);
    formData.append("Email", cleanedNumber); // tozalangan raqam yuboriladi

    navigator.sendBeacon(url, formData);
  };

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

  useEffect(() => {
    const imageList = [mainBg2];

    let loadedCount = 0;
    imageList.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === imageList.length) {
          setPageLoaded(true);
        }
      };
    });
  }, []);

  if (!pageLoaded) return <Loader />;

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.wrapper}>
        <div className={styles.navbar}>
          <div className={styles.navbarHeader}>
            <img src={camIcon} alt="camIcon" />
            <p>Online • 20:00 • 22-Avgust</p>
          </div>
          <h3 className={styles.navbarTitle}>
            Chegirmali narxlarda xonadon sotib olish uchun
          </h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className={styles.navbarButton}
          >
            Bepul taqdimotda qatnashing
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
            <img src={modalStep} alt="modalStep" className={styles.modalStep} />
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
                  disabled={!number || !name || isLoading}
                  onClick={handleSubmit}
                >
                  Davom etish
                </button>
                {isLoading && <div className={styles.loader}></div>}
              </div>
              <div className={styles.gift}>
                <img src={giftIcon} alt="giftIcon" />
                <p>Uy yutib olish imkoniyati</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
