# remote-security

A remote security app using an android phone.

## Objectives
1) Turn on/off an alarm siren. 
2) Turn on/off a set of lights.
3) View a security camera's stream. 
4) View previously recorded motion events. 
5) Receive push notifications when motion is detected.
6) View the system status(cameras, voltage of the system, etc).
7) Package all these features into a single app.

## Challenges
In short, the challenges can be boiled down to 3 things.
1) No wired power.
2) No wired internet connection.
3) Abysmal camera API documentation and support.

## The End Result
An old android phone running a Node.js server(via Termux) is used to connect to a set of Reolink cameras , as well as a ESP8266 nodeMCU wifi controller. 

**An important thing to note**

The android phone uses a conventional SIM card to connect to the internet, which has the side effect placing the android phone behind a Carrier Grade NAT(CGNAT). This means that the phone can **NOT** receive inbound connections. Therefore, in order to communicate with the phone in any useful way, a persistent connection must be established between the remote server and the android phone. 



## Why?
The primary reason 



![](droplet-conn-demo.gif)
![](android-conn-demo.gif)
![](app-livefeed-demo.gif)
