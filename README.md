# Video Tracking API
Using javascript event listeners for the HTML5 video tag, I created a reusable object that could be used to apply video tracking within an ad. Tracking includes video start, restart, and replay, play and pause, mute and unmute, video completion quartiles, and video complete. You can also track more than one video separately.

[Click here](http://www.joebrust.com/projects/video-tracking-api) to view a live demo.

### Usage
Make a call to prSetupVideo and pass the video id along with an instance number.
```
function init(){
	prSetupVideo('myVideo', 1);
}
```

### Special Note
In the demo above, I'm console logging the tracking so it can be viewed in the web developer.