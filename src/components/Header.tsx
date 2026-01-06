'use client';
import styles from "../app/page.module.css";
import Image from "next/image";
import type { JSX } from "react";
import { useState } from "react";
export function Header({
  selectDegree,
  setSelectDegree,
  selectMeter,
  setSelectMeter,
  selectPresciption,
  setSelectPresciption
} : any): JSX.Element {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  
  const selectDegrees = (option:any) => {
    setSelectDegree(option)
  }

  const selectUnit = (option:any) => {
    setSelectMeter(option)
  }

  const selectPrescp = (option:any) => {
    setSelectPresciption(option)
  } 


  return (
    <section className={styles.header}>
      <div className={styles.headerLogoContainer}>
        <Image
          src="./assets/images/logo.svg"
          width={200}
          height={60}
          alt="headerLogo"
          className={styles.headerLogo}
        />


        <div className={styles.units}>
          <Image
            src="./assets/images/icon-units.svg"
            width={15}
            height={15}
            alt="settings"
            className={styles.settings}
             
          />

          <p className={styles.unitText}>Units</p>
          
          <Image
            src="./assets/images/icon-dropdown.svg"
            width={15}
            height={15}
            alt="dropdown"
            className={styles.dropdown}
            onClick={handleDropdown}
          />
          
        </div>

        
        <section className={`${styles.unitOptionsContainer} ${isDropdownOpen ? styles.active : ''}`}>
            <div className={styles.unitOption}>
              <h3>Switch to Imperial</h3>
              <section className={styles.optionDetails}>
                <p>Temperature</p>
                <div className={styles.optionIcons}>
                  <h4 onClick={() => selectDegrees("celsius")}>Celsius (°C)</h4>
                  {/* <h4 onClick={() => selectDegrees("celsius")}>Celsius (°C)</h4> */}
                  {selectDegree === "celsius" && 
                  <Image
                    src="./assets/images/icon-checkmark.svg"
                    width={15}
                    height={15}
                    alt="dropdown"
                    className={styles.checkMark}
                  />}
                </div>
                <div className={styles.optionIcons}>
                  <h4 onClick={(e) => selectDegrees("fahrenheit")}>Fahrenheit (°F)</h4>
                  {/* <h4 onClick={() => selectDegrees("farenheit")}>Farenheit (°F)</h4> */}
                  {selectDegree === "fahrenheit" && 
                  <Image
                    src="./assets/images/icon-checkmark.svg"
                    width={15}
                    height={15}
                    alt="dropdown"
                    className={styles.checkMark}
                  />}
                </div>

                <hr />
              </section>

              <section className={styles.optionDetails}>
                <p>wind speed</p>
                <div className={styles.optionIcons}>
                  <h4 onClick={(e) => selectUnit("kilo")}>km/h</h4>
                  {selectMeter === "kilo" && <Image
                    src="./assets/images/icon-checkmark.svg"
                    width={15}
                    height={15}
                    alt="dropdown"
                    className={styles.checkMark}
                  />}
                </div>

                 <div className={styles.optionIcons}>
                  <h4  onClick={(e) => selectUnit("mph")}>mph</h4>
                  {selectMeter === "mph" && <Image
                    src="./assets/images/icon-checkmark.svg"
                    width={15}
                    height={15}
                    alt="dropdown"
                    className={styles.checkMark}
                  />}
                </div>

                <hr />
              </section>

              <section className={styles.optionDetails}>
                <p>prescipitation</p>
                <div className={styles.optionIcons}>
                  <h4 onClick={(e) => selectPrescp("mm")}>Millimiters(mm)</h4>
                 {selectPresciption === "mm" && <Image
                    src="./assets/images/icon-checkmark.svg"
                    width={15}
                    height={15}
                    alt="dropdown"
                    className={styles.checkMark}
                  />}
                </div>

                 <div className={styles.optionIcons}>
                  <h4 onClick={(e) => selectPrescp("in")}>Inches(in)</h4>
                  {selectPresciption === "in" && <Image
                    src="./assets/images/icon-checkmark.svg"
                    width={15}
                    height={15}
                    alt="dropdown"
                    className={styles.checkMark}
                  />}
                </div>

              
              </section>
            </div>
          </section>
      </div>
    </section>
  );
}
