# Rick and Morty APP

This app takes data from the Rick and Morty API, displays a list of characters, allows users to add characters to their favorites, and allows users to filter characters based on their choices using the MultiSelect component.

## Description

The Rick and Morty Character Explorer is a React Native application designed to showcase how to fetch and display data from an external API while incorporating modern features and a user-friendly interface.

Key Features:
Fetching Data: Fetch character data from the Rick and Morty API, including details like name, status, species, and origin.

Character List: Display a list of characters in a visually appealing layout, with support for infinite scrolling and responsive design.

Favorites Management:
Users can add characters to a favorites list for quick access.
A dedicated "Favorites" screen displays the selected characters, allowing users to remove them if desired.

Filtering Characters: Use the MultipleSelect component to filter characters based on user-selected criteria, such as name or status.

Smooth User Experience:
Incorporate animations for interactive elements using react-native-reanimated. Activity indicators while data is being fetched to enhance the perceived performance.

This application not only demonstrates API integration but also highlights state management with tools like Zustand for managing selected characters and favorites, ensuring a seamless experience across components.






## Features

- **React Native**: Mobile application development framework.
- **Expo**: A platform for making universal React applications.
- **Navigation**: Implemented using `@react-navigation` and its various packages.
- **State Management**: Using `@tanstack/react-query` for server-state synchronization.
- **Favorites Management**: Users can add and remove characters to/from a favorites list . A dedicated "Favorites" screen displays the saved characters for easy access.
- **Styling**: Styled with `nativewind` and `tailwindcss`.
- **API Integration**: Axios is used for making API requests.
- **Reanimated Animations**: Smooth animations using `react-native-reanimated`.
- **Zustand**:A small, fast, and scalable bearbones state management solution. Zustand has a comfy API based on hooks. It isn't boilerplatey or opinionated, but has enough convention to be explicit and flux-like

## Installation

To set up the project locally, follow these steps:


 **Install dependencies:**

```bash
npm install
```

```bash
yarn install
```

```bash
bun install
```

3. **Running the Project:**

## Android

```bash
bunx or npx expo run:android
```

```bash
bunx or npx expo start
```

## iOS

```bash
npm run start
bunx or npx expo run:ios
```

```bash
bunx or npx expo start
```

## Web

```bash
bunx or npx expo run:web
```

```bash
bunx or npx expo start
```