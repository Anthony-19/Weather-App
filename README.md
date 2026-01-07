# 🌦️ Weather Forecast App

A modern weather forecast application built with **Next.js** that allows users to search for cities and view **current weather**, **daily forecasts**, and **hourly forecasts**, with support for **unit conversions** (temperature, wind speed, and precipitation).

---

## 🚀 Features

* 🌍 Search weather by city and country
* ☀️ Current weather conditions with icons
* 📅 7-day daily forecast
* ⏰ Hourly forecast by selected day
* 🌡️ Temperature unit toggle (°C / °F)
* 🌬️ Wind speed unit toggle (km/h / mph)
* 🌧️ Precipitation unit toggle (mm / inches)
* 🔄 Dynamic unit conversion without refetching data
* ⏳ Loading states for better UX

---

## 🛠️ Tech Stack

* **Next.js** (App Router)
* **React** (Client Components)
* **TypeScript**
* **CSS Modules**
* **Open-Meteo API** (weather data)

---

## 🔄 Unit Conversions

The app handles unit conversion on the client side:

* **Celsius → Fahrenheit**
  `(°C × 9/5) + 32`

* **km/h → mph**
  `km/h × 0.621371`

* **mm → inches**
  `mm ÷ 25.4`



## 🌐 API Used

This project uses the **Open-Meteo API**, which provides free weather data without requiring an API key.

---

## 📌 Future Improvements

* Add geolocation-based weather detection
* Improve accessibility (ARIA support)
* Add dark mode
* Cache weather responses for performance
* Add error handling for invalid city searches



Feel free to fork, modify, and improve this project 🚀
