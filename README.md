# Frontend Mentor - Weather app solution

This is a solution to the [Weather app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- Search for weather information by entering a location in the search bar
- View current weather conditions including temperature, weather icon, and location details
- See additional weather metrics like "feels like" temperature, humidity percentage, wind speed, and precipitation amounts
- Browse a 7-day weather forecast with daily high/low temperatures and weather icons
- View an hourly forecast showing temperature changes throughout the day
- Switch between different days of the week using the day selector in the hourly forecast section
- Toggle between Imperial and Metric measurement units via the units dropdown 
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./preview.jpg)

*A preview of the completed desktop design.*

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- Modern CSS including:
  - CSS Custom Properties
  - Flexbox
  - CSS Grid
- Vanilla JavaScript for all logic, including:
  - Async/Await for API calls
  - DOM manipulation
  - State management
- Responsive, mobile-first workflow

### What I learned

This project was a great exercise in combining front-end fundamentals to build a complete, data-driven application. A key part of the process was structuring the HTML semantically, which made it much easier to style with a complex CSS Grid layout for the main dashboard. 

On the JavaScript side, the biggest challenge was managing the flow of asynchronous data. This involved fetching from two separate APIs (one for geocoding, one for weather data) and chaining them together. Implementing features like a debounced search and state management for units required careful organization of the code.

```js
// Example of the debounced search handler
searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(handleSearchInput, 300); // Debounce API calls
});
```

## Author

- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- Coded by - Jazp #0400

## Acknowledgments

This project was completed with the assistance of Gemini, an AI pair programmer, who helped scaffold the code, implement features, and debug issues throughout the development process.