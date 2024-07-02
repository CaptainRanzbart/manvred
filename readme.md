![MANV RED Logo](./MANV/src/icons/icon-128.webp)

# MANV RED

MANV RED is an interactive training application for doctors to simulate and train for a Mass Casualty Incident (MCI) scenario. The app supports multi-user operations and is built using Ionic, making it accessible on browsers, iOS, and Android devices. On mobile devices, examinations can be easily initiated by scanning a QR code.

## Table of Contents

- [Getting Started](#getting-started)
- [Running the Application](#running-the-application)
- [Building the Project](#building-the-project)

## Getting Started

## File Structure
This file structure illustrates important directories of the manv(red) app.

    .
    ├── andoird                         # Files to build the Andoird app
    ├── ios                             # Files to build the ios app
    ├── src                             # Application Environment
    │   ├── app                         # Application Code
    │   │   ├── components              # Pre built components
    │   │   ├── pages                   # Pages
    │   │   ├── shared                  # Shared logic
    │   │   ├── app-routing.module.ts   # Main routing module
    │   │   ├── app.component.html      # Ionic starting Point / Router outlet
    │   │   ├── app.component.scss      # Global styling
    │   │   ├── app.component.ts        # TS of starting point
    │   │   ├── app.module.ts           # Base Module
    │   ├── assets                      # Assets like icons and other images
    │   ├── envirnoment                 # Settings for prod and build envirnoment
    │   ├── icons                       # Scaled Icons
    │   ├── theme                       # Variables for Ionic Theme + Global styling
    │   ├── www                         # Manifest
    │   ├── index.html                  # Bootstrap HTML
    │   ├── global.scss                 # Bootstrap SCSS
    │   ├── main.ts                     # Bootstrap TS
    └── www                             # Pre Built for web

Follow these instructions to set up the project on your local machine.

### Prerequisites

Ensure you have the following installed:

- Node.js (latest version recommended)
- NPM (latest version recommended)
- Ionic CLI (latest version recommended)
- Angular CLI (latest version recommended)

Additionally, the project uses the Directus SDK, which requires at least version 16.

### Installation

1. **Clone the repository:**
```
git clone https://github.com/yourusernameyour-repo-name.git
cd your-repo-name
```
2. **Install dependencies:**
```
npm install
```

## Running the Application

To start the development server, run:
```
ionic serve
```

This will open the application in your default browser. Any changes you make to the code will automatically reload the application.

## Building the Project

### Web
Build web assets and prepare your app for any platform targets

```
ionic build
```

### Android
Using the android capacitor.
For a debugging build:

```
ionic capacitor add android
ionic capacitor copy android
cd android
./gradlew assembleDebug
```
### IOS
Using the ios capacitor.
```
npx capacitor add ios
npx capacitor add ios
```
Open the App in XCode
```
npx cap open ios
```
---