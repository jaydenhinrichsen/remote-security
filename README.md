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

The android phone uses a conventional SIM card to connect to the internet, which has the side effect placing the android phone behind a Carrier Grade NAT(CGNAT). This means that the phone can **NOT** receive inbound connections. Therefore, in order to communicate with the phone in any useful way, a persistent connection must be established between the remote server and the android phone. Additionally, the connection **MUST** be opened by the android phone first. 

The solution to the above problem is a "control" or "command" connection(called a "control-interface" in this application). The control-interface lets the remote server(droplet) communicate and send/receive commands from the android phone.

However, we face yet another problem. The droplet is not *actually* inside of the android's Local Area Network(LAN), it can only send/receive data from the android. This means that if we want to send commands to the cameras(like start an RTSP stream), we must tell the android to send the command to the camera and then have the android send us the result(a stream of data). This architecture is the same for sending/receiving data to/from the nodeMCU.

This can be seen in the gifs below.

![](droplet-conn-demo.gif)

![](android-conn-demo.gif)

![](app-livefeed-demo.gif)
