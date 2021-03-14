# Arduino-NodeJS-360-Video-Player
In this project, I created a 360 video player (currently playing a demo mp4 file) and a controller with Arduino UNO.

# Requirements:
- Arduino UNO
- GY-521 Sensor module
- USB-cable for serial connection between the development board and the computer
- Arduino IDE and any other IDE for Arduino
- NodeJS (v12.14.1 tested)
- Typescript (v4.2.3 tested)
- Localhost server for client
- *A cup of coffee and a nice Spotify playlist*

# Build
TO build the server-side code, follow these steps:
- Download the repository and head to the **server** folder.
- In the terminal type the following command to **install node modules**:
  
  ```sh
  npm install
  ```
  
- Once the modules are installed we are ready to build and start our servers.
- To **build** the TS files into JS, run the following command

  ```sh
  npm run-script build
  ```

- To **start the server**, run the following command:

  ```sh
  npm run-script start
  ```
 
>> ***Note:*** The start command automatically builds the TS files as well, so you cant skip the build step and directly run the start command.

