# Video From the ESP32-CAM

This project was created for the course [CNIT 133I IoT and XR](https://www.coursicle.com/ccsf/courses/CNIT/133I/) taught by [Professor Da Silva](https://cdasilva.info/) at [CCSF](https://www.ccsf.edu/).  The project consist of both hardware and software.  The hardware consist of:

1. ESP32-CAM (AI Thinker)
2. Arudino Uno

Software consist of:

1. Frontend web app made in React
2. [ESP32 Camera Web Server](https://github.com/easytarget/esp32-cam-webserver) by [Easytarget](https://github.com/easytarget)

## Presentation and Demo

<iframe width="560" height="315" src="https://www.youtube.com/embed/wtY6prGZSow" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Resources

1. Github page for the ESP32 Camera Webserver by Easytarget.  I like how he made an easy to use API. [https://github.com/easytarget/esp32-cam-webserver](https://github.com/easytarget/esp32-cam-webserver)

2. Good introduction on the ESP32 Cam on Youtube from Dronebot Workshop.  His Wifi Manager video and other videos are also quite good.  [https://www.youtube.com/watch?v=xPlN_Tk3VLQ&t=2090s](https://www.youtube.com/watch?v=xPlN_Tk3VLQ&t=2090s)

3. Pretty good introduction to ESP32-Cam that shows off it’s face-recognition capability.  This one uses the web camera server code from Espressif, the company behind the ESP32, but the face recognition is limited to 320x240 and the stream is in MJEG, so I didn’t use it.[https://randomnerdtutorials.com/esp32-cam-video-streaming-face-recognition-arduino-ide/](https://randomnerdtutorials.com/esp32-cam-video-streaming-face-recognition-arduino-ide/)

4. [Reveal.js](https://revealjs.com/).  This is a great HTML presentation framework, and my presentation was partially made using it.  I was planning use it for my entire presentation, but ran in to a limitation when I wasn't able to use my video as a background image.  During testing it worked with a short 5MB mp4 but it didn't work for a 13MB mp4.
