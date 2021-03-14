# Arduino-NodeJS-360-Video-Player
In this project, I created a 360 video player (currently playing a demo mp4 file) and a controller with Arduino UNO.

# Requirements:
- Arduino UNO
- ITG/MPU GY-521 Sensor module
- USB-cable for serial connection between the development board and the computer
- Arduino IDE and any other IDE for Arduino
- NodeJS (v12.14.1 tested)
- Typescript (v4.2.3 tested)
- Localhost server for client
- *A cup of coffee and a nice Spotify playlist*

# Build Arduino controller
For making the arduino controller you need the Arduino development board and a ITG/MPU 3-axis Acc. and Gyro. sensor board (I am using GY-521 here). Follow the circuit diagram below to build your circuit.

![Arduino and GY521 Circuit Diagram](gy521_circuit.JPG)

# Build Server and Client script
To build the server-side code, follow these steps:
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

---

For building the client, run the following command in the **www** folder:

```sh
tsc
```
Go though the generate JS files and remove the lines that are surrounded by the *remove comment block*

Finally,

- Start your localhost with the index.html, the NodeJS server and arduino programmed and connected to the serial port.
- Wait for the socket connection to establish.
- Once that is done, you are ready to go.
