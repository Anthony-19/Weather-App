'use client';
import Image from "next/image";
import styles from "./page.module.css";
import { Header } from "@/components/Header";
import { Search } from "@/components/Search";
import { Weather } from "@/components/Weather";
import {useState, useEffect} from "react";
import { ErrorState } from "@/components/ErrorState";

export default function Home() {
  const [city, setCity] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<any>([]);
  const [cityResults, setCityResults] = useState<any>([]);
  const [weather, setWeather] = useState<any>(null);
  const  [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [selectDegree, setSelectDegree] = useState<string>("celsius");
  const [selectMeter, setSelectMeter] = useState<string>("kilo");
  const [selectPresciption, setSelectPrescription] = useState<string>("mm");

  useEffect(() => {
    setIsLoading(true);
  }, []);

  
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header  
          selectDegree={selectDegree}
          setSelectDegree={setSelectDegree}
          selectMeter={selectMeter}
          setSelectMeter={setSelectMeter}
          selectPresciption={selectPresciption}
          setSelectPresciption={setSelectPrescription}
        />
       {error ? <ErrorState error={error} setError={setError}/> :
       <>
       <h1 className={styles.title}>How's the sky looking today?</h1>
        <Search 
        city={city}
        setCity={setCity}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        cityResults={cityResults}
        setCityResults={setCityResults}
        weather={weather}
        setWeather={setWeather}
        error={error}
         setError={setError}
        />
        <Weather 
           weather={weather}
        setWeather={setWeather}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
          isLoading={isLoading}
         setIsLoading={setIsLoading}
          selectDegree={selectDegree}
          setSelectDegree={setSelectDegree}
          selectMeter={selectMeter}
          setSelectMeter={setSelectMeter}
          selectPresciption={selectPresciption}
          setSelectPresciption={setSelectPrescription}
        />
        </>
         }
      </main>
    </div>
  );
}
