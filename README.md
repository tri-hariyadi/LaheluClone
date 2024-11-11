# Lahelu Clone
This is a clone home page Application `Lahelu` with new [**React Native**](https://reactnative.dev) new architecture project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

### Download App
#### https://drive.google.com/file/d/17y-lZvkBbJCwy4aoPFOWHtv8pDMMnU1-/view?usp=sharing

# Features made in this application
* **Splash Screen**
* **Navigation :** Consists of top tabs (Home, Fresh, Trending), sidebar ("Meme lain", "Jelajah", etc), and bottom tabs (5 buttons below). And implement blank pages for all the routes other than the home page.
* **Virtualized infinite scroll :** The home page consists of a virtualized infinite scroll containing posts (with simulation of post fetching). This post is either an image or a video, both of which have a fixed aspect ratio to prevent layout shifts when loading media.
* **Video Content :** Videos should be autoplayed once entering the viewport, they also have a pause/play button, mute button, and slider to control the timeline.
* **Pinch Gesture :** Could zoom in the image/video through pinching motion. Behaviour similar to Instagram's posts.
* **Post** : Each post has a user avatar, user username, create date, hashtags, and some necessary buttons.

# Project Structure
* The `asset` folder is used to store assets such as icons and images.
* The `components` folder is used to store small components and their use is global.
* The `navigations` folder is used to store the setup or configuration of the application navigation system.
* The `parts` folder is used to store larger components whose use is more specific to a screen or page in the application.
* The `screens` folder is used to combine several components in the `parts` folder and perform some global logic which will later be used in the setup in navigation.
* The `styles` folder is used to store dimension and color variables and also stores several helpers that can be used for styling components.
* The `types` folder is used to store the types used for data transfer from the API.
* The `utils` folder is used to store utilities that can be useful, such as date time format, custom hooks, ErrorUtils for error handling, etc.
* This project uses eslint and prettier for better code please check in **.eslintrc.js** **.prettierrc.js**
* Minimum SDK used in this project : `SDK 24 = API Level 24` `Android Version = 7.0 Nougat`

