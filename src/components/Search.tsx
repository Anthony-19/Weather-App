import Image from "next/image";
import { useEffect, type JSX } from "react";
import styles from "../app/page.module.css";
import { ErrorState } from "./ErrorState";

interface SearchProps {
  city: string;
  setCity: (city: any) => void;
  selectedCity: any;
  setSelectedCity: (city: any) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  cityResults: any;
  setCityResults: (results: any) => void;
  weather: any;
  setWeather: (results: any) => void;
  error: any;
  setError: (error: any) => void;
}

export function Search({
  city,
  setCity,
  selectedCity,
  setSelectedCity,
  isLoading,
  setIsLoading,
  cityResults,
  setCityResults,
  weather,
  setWeather,
  error,
  setError,
}: SearchProps): JSX.Element {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    setCityResults([]);
  };

  // Fetching data when user types
  useEffect(() => {
    if (city.length < 2) {
      setCityResults([]);
      return;
    }
    setIsLoading(true);
    const fetchUserData = async () => {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=5`
      );
      const data = await response.json();
      console.log(data);
      setCityResults(data.results || []);
    };

    fetchUserData();
  }, [city]);

  const searchCities = async () => {
    try {
      if (!city.trim()) return;

      setIsLoading(true);

      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=5`
      );
       if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.reason || "Failed to fetch weather data");
      }

      
       const data = await response.json();
      console.log(data);
      
    
       if (!data.results || data.results.length === 0) {
      setError("No city found");
      setIsLoading(false);
      return;
    }

    setCityResults([]);
      // setCityResults(data.results || []);
       setSelectedCity(data.results[0]); // 
      setIsLoading(false);
      setError(null);
     
     
  
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      setIsLoading(false);
      // console.log("Failed to fetch weather data");
    }
  };

  const selectedCountry = (cityObj: any) => {
    // const selectedText = cityResults.find((item: any) => item.name === city);
    // if (selectedText) {
    setSelectedCity(cityObj);
    console.log("Selected City:", cityObj);
    setError(null);
    setIsLoading(false);
    setCity(`${cityObj.name}, ${cityObj.country}`);
    setCityResults([]);

    // }
  };

  useEffect(() => {
    if (!selectedCity || !selectedCity.latitude || !selectedCity.longitude) {
      return;
    }
    setIsLoading(true);
    try {
      const { latitude, longitude } = selectedCity;
      if (
        typeof latitude !== "number" ||
        typeof longitude !== "number" ||
        latitude < -90 ||
        latitude > 90 ||
        longitude < -180 ||
        longitude > 180
      ) {
        console.error("Invalid coordinates:", latitude, longitude);
        return;
      }
      console.log("Selected City Coordinates:", latitude, longitude);
      const fetchSelectedCityData = async () => {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,precipitation,weathercode&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.reason || "Failed to fetch weather data");
        }
        const data = await response.json();
        setWeather(data);
        setIsLoading(false);
        setError(null);
        console.log("Selected City Data:", data);
      };

      fetchSelectedCityData();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message || "Failed to fetch selected city data");
      }
    }
  }, [selectedCity]);

  return (
    <section className={styles.searchContainer}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          name="search"
          className={styles.searchInput}
          placeholder="Search for a city, e.g., New York"
          value={city}
          onChange={handleInputChange}
        />
        <div className={styles.searchIconContainer}>
          <Image
            src="./assets/images/icon-search.svg"
            width={25}
            height={25}
            alt="searchIcon"
            className={styles.searchIcon}
          />
        </div>
        <section className={styles.searchResults}>
          {cityResults.length > 0 && (
            <div className={styles.searchResultsList}>
              {cityResults.map((result: any, index: number) => (
                // <p key={index} className={styles.searchResultItem} onClick={(e) => selectedCountry(e, result.name)}>{result.name}, {result.country}</p>
                <p
                  key={index}
                  className={styles.searchResultItem}
                  onClick={() => selectedCountry(result)}
                >
                  {result.name}, {result.country}
                </p>
              ))}
            </div>
          )}
        </section>
      </div>
      <button
        type="submit"
        className={styles.searchButton}
        onClick={searchCities}
      >
        Search
      </button>
    </section>
  );
}
