import React from "react";
import { CustomButton } from "./CustomButton";
import style from "./LandingPage.module.css";

export default function LandingPage() {
  function handleHome() {
    window.location.href = "/home";
  }
  return (
    <div className={style.background}>
      <div className={style.showcase}>
        <h1>Bienvenido a Food Api</h1>
        <CustomButton text="Ir a la Página Principal" onClick={handleHome} />
      </div>
    </div>
  );
}
