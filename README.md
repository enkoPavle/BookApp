# Book App React Native Expo Project

Welcome to my React Native Expo project! This application is designed for browsing books in a user-friendly interface with Firebase Remote Config integration.

## About the Project

This project is built using **React Native** and **Expo**, providing a cross-platform mobile experience for **iOS** and **Android**. It features smooth scrolling, categorized book lists, and dynamic content loading from Firebase Remote Config.

## Features

- **Splash Screen**: Displays an infinite progress bar with a **2-second delay**, then navigates to the **Main screen**.
- **Main Screen**:
  - Displays books grouped by **genres**.
  - Supports **both vertical and horizontal scrolling**.
  - Tapping on a book opens the **Details screen**.
  - **Top banner slides**:
    - Loaded from Firebase Remote Config (`json_data` → `top_banner_slides`).
    - Auto-scrolls **every 3 seconds**.
    - Supports **infinite horizontal scrolling** with an indicator.
    - Clicking on a banner opens the **Details screen** for the selected book.
- **Details Screen**:
  - Features a **horizontal snap-scrolling carousel** for books in the header.
  - Book details update dynamically based on the selected book.

### Setup

1. **Clone the repository**:

```bash
git clone https://github.com/enkoPavle/BookApp
```

2. **Navigate to the project folder and install dependencies**:

```bash
cd book-app
npm install
```

### Running the App

#### Android:
```bash
npx expo run:android       
```

#### iOS:
```bash
npx expo run:ios       
```

Enjoy using the **Book App**! 🚀

