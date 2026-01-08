"use client";
import { Mate } from "next/font/google";
import styles from "../app/page.module.css";
import Image from "next/image";
import type { JSX } from "react";
import { useState } from "react";
import { City } from "@/types/setCity";

interface WeatherProps {
  weather: any;
  setWeather: (results: any) => void;
  selectedCity: City | null;
  setSelectedCity: (city: City | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  selectDegree: string;
  setSelectDegree: (degree: string) => void;
  selectMeter: string;
  setSelectMeter: (meter: string) => void;
  selectPresciption: string;
  setSelectPresciption: (prescription: string) => void;
}
export function Weather({
  weather,
  setWeather,
  selectedCity,
  setSelectedCity,
  isLoading,
  setIsLoading,
  selectDegree,
  setSelectDegree,
  selectMeter,
  setSelectMeter,
  selectPresciption,
  setSelectPresciption,
}: WeatherProps): JSX.Element {
  const getWeatherIcon = (code: number): string => {
    if (code === 0) return "/assets/images/icon-sunny.webp"; // Clear sky
    else if (code === 1 || code === 2 || code === 3)
      return "/assets/images/icon-partly-cloudy.webp"; //Partly cloudy
    else if (code === 45 || code === 48)
      return "/assets/images/icon-fog.webp"; // Fog
    else if (code === 51 || code === 53 || code === 55)
      return "/assets/images/icon-drizzle.webp"; // Drizzle
    else if (code === 61 || code === 63 || code === 65)
      return "/assets/images/icon-rain.webp"; // Rain
    else if (code === 71 || code === 73 || code === 75)
      return "/assets/images/icon-snow.webp"; // Snow
    else if (code === 95 || code === 96 || code === 99)
      return "/assets/images/icon-storm.webp"; // Thunderstorm
    else return "/assets/images/icon-partly-cloudy.webp"; // Default icon
  };

  const [dropDown, setDropDown] = useState(false);

  const handleDropdown = (): void => {
    setDropDown((prev:boolean) => !prev);
  };

  const [selectDayIndex, setSelectDayIndex] = useState<number>(0);
  const [selectDateLabel, setSelectDateLabel] = useState<string | null>(null);

  const selectHourlyDate = (index: number, date: string): void => {
    setSelectDayIndex(index);
    setSelectDateLabel(
      new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
      })
    );
    setDropDown(false);
  };
  // if (!weather) return null;

  // const mph = weather.current?.wind_speed_10m * 0.621371;

  //     const currentHour = new Date(weather?.current?.time).getHours();
  // const next12Hours = weather?.hourly?.time.slice(currentHour, currentHour + 12);
  return (
    <section className={styles.weatherContainer}>
      <div className={styles.weatherOverviewContainer}>
        {isLoading ? (
          <section className={styles.loaderWeatherSection}>
            <div className={styles.loader}>
              <Image
                src="/assets/images/icon-loading.svg"
                width={90}
                height={90}
                alt="loaderIcon"
                className={styles.loaderIcon}
              />
            </div>
            <p>loading...</p>
          </section>
        ) : (
          <section className={styles.currentWeatherSection}>
            <div className={styles.locationInfo}>
              <h4>
                {selectedCity ? `${selectedCity.name}, ${selectedCity.country}` : "Berlin, Germany"}
              </h4>
              <p>
                {new Date(weather?.current?.time).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className={styles.currentTemp}>
              <Image
                src={getWeatherIcon(weather?.current?.weathercode)}
                width={100}
                height={100}
                alt="sunnyIcon"
                className={styles.sunnyIcon}
              />
              <h1>{Math.round(weather?.current?.temperature_2m) || 68}°</h1>
            </div>
          </section>
        )}

        <section className={styles.weatherDetailsSection}>
          <div className={styles.feelsLikeContainer}>
            <p>Feels Like</p>
            {isLoading ? (
              <h5>-</h5>
            ) : (
              <h5>
                {selectDegree === "fahrenheit"
                  ? Math.round(
                      weather?.current?.apparent_temperature * 1.8 + 32
                    ) || 65
                  : Math.round(weather?.current?.apparent_temperature)}
                °
              </h5>
            )}
          </div>
          {/* <div className={styles.humidityContainer}> */}
          <div className={styles.feelsLikeContainer}>
            <p>Humidity</p>
            {isLoading ? (
              <h5>-</h5>
            ) : (
              <h5>{weather?.current?.relative_humidity_2m || 65}%</h5>
            )}
          </div>
          {/* <div className={styles.windContainer}> */}
          <div className={styles.feelsLikeContainer}>
            <p>Wind</p>
            {isLoading ? (
              <h5>-</h5>
            ) : (
              <h5>
                {selectMeter === "mph"
                  ? Math.round(weather?.current?.wind_speed_10m * 0.621371)
                  : weather?.current?.wind_speed_10m}{" "}
                {selectMeter === "mph"
                  ? "mph"
                  : weather?.current_units?.wind_speed_10m}
              </h5>
            )}
          </div>
          {/* <div className={styles.precipitationContainer}> */}
          <div className={styles.feelsLikeContainer}>
            <p>Precipitation</p>
            {isLoading ? (
              <h5>-</h5>
            ) : (
              <h5>
                {selectPresciption === "in"
                  ? Math.round(
                      weather?.current?.precipitation * 0.0393701
                    ).toFixed(2)
                  : Math.round(weather?.current?.precipitation).toFixed(2)}{" "}
                {selectPresciption === "in"
                  ? "in"
                  : weather?.current_units?.precipitation}
              </h5>
            )}
          </div>
        </section>

        <section className={styles.dailyForecastContainer}>
          <h4>Daily Forecast</h4>
          <section className={styles.dailyForecastList}>
            {isLoading
              ? Array(7)
                  .fill(0)
                  .map((_, index: number) => (
                    <div className={styles.dailyForecastItem} key={index}></div>
                  ))
              : weather?.daily?.time.map((date: string, index: number) => (
                  <div className={styles.dailyForecastItem} key={index}>
                    <p>
                      {new Date(date).toLocaleDateString("en-US", {
                        weekday: "short",
                      })}
                    </p>
                    <Image
                      src={getWeatherIcon(weather?.daily?.weathercode[index])}
                      width={50}
                      height={50}
                      alt="sunnyIcon"
                      className={styles.weatherImages}
                    />
                    <div className={styles.tempRange}>
                      <p>
                        {Math.round(weather?.daily?.temperature_2m_max[index])}°
                      </p>
                      <p>
                        {Math.round(weather?.daily?.temperature_2m_min[index])}°
                      </p>
                    </div>
                  </div>
                ))}
          </section>
        </section>
      </div>

      <div className={styles.hourlyContainer}>
        <section className={styles.hourlyHeader}>
          <h3>Hourly Forecast</h3>
          <div className={styles.hourlyDateSelector} onClick={handleDropdown}>
            {isLoading ? (
              <p>-</p>
            ) : (
              <p>
                {selectDateLabel ??
                  new Date(weather?.current?.time).toLocaleDateString("en-US", {
                    weekday: "long",
                  })}
              </p>
            )}
            <Image
              src="/assets/images/icon-dropdown.svg"
              width={15}
              height={15}
              alt="dropDown"
              className={styles.dropDownIcon}
            />

            <section className={styles.daysOfWeekContainer}>
              <div
                className={`${styles.daysOfWeek}${
                  dropDown ? ` ${styles.active}` : ""
                }`}
              >
                {weather?.daily?.time?.map((date: string, index: number) => (
                  <p key={index} onClick={() => selectHourlyDate(index, date)}>
                    {new Date(date).toLocaleDateString("en-US", {
                      weekday: "long",
                    })}
                  </p>
                ))}
                {/* <p>Monday</p>
                <p>Tuesday</p>
                <p>Wednesday</p>
                <p>Thursday</p>
                <p>Friday</p>
                <p>Saturday</p>
                <p>Sunday</p> */}
              </div>
            </section>
          </div>
        </section>

        <section className={styles.hourlyList}>
          {isLoading
            ? Array(12)
                .fill(0)
                .map((_, index: number) => (
                  <section className={styles.hourlyItem} key={index}></section>
                ))
            : weather?.hourly?.time &&
              (() => {
                // // Find current time index in hourly array
                // const nowIndex = weather.hourly.time.findIndex(
                //   (t: string) =>
                //     new Date(t).getTime() >=
                //     new Date(weather.current.time).getTime()
                // );

                // // Slice next 12 hours
                // const next12Hours = weather.hourly.time.slice(
                //   nowIndex,
                //   nowIndex + 12
                // );
                const nowIndx = weather.hourly.time.findIndex(
                  (t: string) =>
                    new Date(t).getTime() >=
                    new Date(weather.current.time).getTime()
                );
                const start = nowIndx + selectDayIndex * 24;
                const end = start + 12;

                const hours = weather.hourly.time.slice(start, end);
                const temps = weather.hourly.temperature_2m.slice(start, end);
                const codes = weather.hourly.weathercode.slice(start, end);

                return hours.map((time: string, index: number) => (
                  <section className={styles.hourlyItem} key={time}>
                    <div className={styles.hourlyTime}>
                      <Image
                        src={getWeatherIcon(codes[index])}
                        width={30}
                        height={30}
                        alt="weatherIcon"
                        className={styles.hourlyWeatherIcon}
                      />
                      <p>
                        {new Date(time).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          hour12: true,
                          timeZone: weather.timezone,
                        })}
                      </p>
                    </div>
                    <p className={styles.hourlyTemp}>
                      {Math.round(temps[index])}°
                    </p>
                  </section>
                  // <section className={styles.hourlyItem} key={time}>
                  //   <div className={styles.hourlyTime}>
                  //     <Image
                  //       src={getWeatherIcon(
                  //         weather.hourly.weathercode[nowIndex + index]
                  //       )}
                  //       width={30}
                  //       height={30}
                  //       alt="weatherIcon"
                  //       className={styles.hourlyWeatherIcon}
                  //     />
                  //     <p>
                  //       {new Date(time).toLocaleTimeString("en-US", {
                  //         hour: "numeric",
                  //         hour12: true,
                  //         timeZone: weather.timezone, // ensures correct AM/PM
                  //       })}
                  //     </p>
                  //   </div>
                  //   <p className={styles.hourlyTemp}>
                  //     {Math.round(
                  //       weather.hourly.temperature_2m[nowIndex + index]
                  //     )}
                  //     °
                  //   </p>
                  // </section>
                ));
              })()}
        </section>

        {/* <section className={styles.hourlyList}>
          
              {next12Hours.slice(currentHour,currentHour + 12).map((time: any, index: any) => (
              <section className={styles.hourlyItem} key={time}>
                <div className={styles.hourlyTime}>
                  <Image
                    src={getWeatherIcon(weather?.hourly?.weathercode[index])}
                    width={30}
                    height={30}
                    alt="sunnyIcon"
                    className={styles.hourlyWeatherIcon}
                  />
                  <p>{new Date(time).toLocaleTimeString("en-US", { hour: "numeric", hour12: true, timeZone: weather?.timezone })}</p>
                </div>
                <p className={styles.hourlyTemp}>{Math.round(weather?.hourly?.temperature_2m[index])}°</p>
              </section>))}

             
            </section> */}
      </div>
    </section>
  );
}
