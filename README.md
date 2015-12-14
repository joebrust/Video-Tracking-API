# Video Tracking API
Using javascript event listeners for the HTML5 video tag, I created a reusable object that could be used to apply video tracking within an ad. Tracking includes video start, restart, and replay, play and pause, mute and unmute, video completion quartiles, and video complete. You can also track more than one video separately.

### Usage
Make the following call and pass the video id along with an instance number.
```
function init(){
	prSetupVideo('myVideo', 1);
}
```