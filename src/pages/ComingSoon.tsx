import React from "react";
import { Link } from "react-router-dom";
import lumioLogo from "@/assets/Lumio,png-Picsart-BackgroundRemover.png";

export default function ComingSoon() {
  const styles = {
    page: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #2ecc71, #1f7a4d)",
      color: "#fff",
      fontFamily: "Poppins, sans-serif",
    },
    card: {
      textAlign: "center",
      background: "rgba(0, 0, 0, 0.25)",
      padding: "40px 60px",
      borderRadius: "25px",
      backdropFilter: "blur(10px)",
      boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
    },
    logo: {
      width: "120px",
      marginBottom: "15px",
      cursor: "pointer",
    },
    cat: {
      fontSize: "70px",
      marginBottom: "15px",
    },
    title: {
      fontSize: "38px",
      fontWeight: "700",
      marginBottom: "8px",
    },
    text: {
      opacity: 0.9,
      fontSize: "18px",
    },
    loader: {
      margin: "25px auto 0",
      width: "80px",
      height: "80px",
      border: "6px solid rgba(255,255,255,.4)",
      borderTopColor: "#fff",
      borderRadius: "50%",
      animation: "spin 1.3s linear infinite",
    },
    "@keyframes spin": `
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `,
  };

  return (
    <>
      <style>{styles["@keyframes spin"]}</style>
      <div style={styles.page}>
        <div style={styles.card}>
          {/* Clickable logo */}
          <Link to="/">
            <img src={lumioLogo} alt="Lumio" style={styles.logo} />
          </Link>

          <div style={styles.cat}>🐱</div>
          <h1 style={styles.title}>Something Cool is Coming</h1>
          <p style={styles.text}>Relax… our purr-fect website is almost ready 😸</p>
          <div style={styles.loader}></div>
        </div>
      </div>
    </>
  );
}
