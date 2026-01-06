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

## 📁 Project Structure

```
app/
 ├── components/
 │    ├── Header.tsx
 │    ├── Weather.tsx
 │    └── ErrorState.tsx
 ├── page.tsx
 ├── page.module.css
utils/
 └── conversions.ts
public/
 └── assets/images/
```

---

## 🔄 Unit Conversions

The app handles unit conversion on the client side:

* **Celsius → Fahrenheit**
  `(°C × 9/5) + 32`

* **km/h → mph**
  `km/h × 0.621371`

* **mm → inches**
  `mm ÷ 25.4`

These conversions are centralized in a utility file for clean and reusable code.

---

## 📦 Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/weather-app.git
```

2. Navigate to the project folder:

```bash
cd weather-app
```




## 🌐 API Used

This project uses the **Open-Meteo API**, which provides free weather data without requiring an API key.

---

## 📌 Future Improvements

* Add geolocation-based weather detection
* Improve accessibility (ARIA support)
* Add dark mode
* Cache weather responses for performance
* Add error handling for invalid city searches

---


## 📄 License

This project is open-source and available under the **MIT License**.

---

Feel free to fork, modify, and improve this project 🚀
