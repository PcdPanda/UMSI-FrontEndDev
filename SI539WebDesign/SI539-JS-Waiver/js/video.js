var video = document.getElementById("player1");
var slider = document.getElementById("slider");
var volume = document.getElementById("volume");
var mute_bottom = document.getElementById("mute")
var speed = 1;
var orig = true;
video.loop = true;
// slider.stype.color = blue;

window.addEventListener("load", function() {
	console.log("Good job opening the window")
});

document.querySelector("#play").addEventListener("click", function() {
	console.log("Play the video");
	volume.innerText = `${video.volume * 100}%`;
	video.play();
});

document.querySelector("#pause").addEventListener("click", function(){
	console.log("Pause the video");
	video.pause();
});

document.querySelector("#slower").addEventListener("click", function() {
	speed = Math.max(0.0625, speed * 0.95)
	video.playbackRate = speed;
	console.log(`Slow down the video with new speed = ${speed}, the speed min limit is 0.0625`);
});

document.querySelector("#faster").addEventListener("click", function(){
	speed = Math.min(8, speed / 0.95)
	video.playbackRate = speed;
	console.log(`Speed up the video with new speed = ${speed}, the speed max limit is 8`);
});

document.querySelector("#skip").addEventListener("click", function() {
	console.log("Advance the video for 15s");
	console.log(`Original location is ${video.currentTime}`)
	if (isNaN(video.duration)){
		console.log("The video metadata has not been loaded")
	}
	else{
		if(video.currentTime + 15 > video.duration){
			video.currentTime = 0
			console.log(`Going back to the beginning`);
		}
		else video.currentTime += 15;
	}
	console.log(`New location is ${video.currentTime}`);
});

slider.addEventListener("input", function(){
	volume.innerText = `${this.value}%`;
	video.volume = this.value / 100;
	console.log(`Change volume to ${video.volume}`);
})

document.querySelector("#mute").addEventListener("click", function(){
	if(!video.muted){
		video.muted = true;
		console.log("mute video");
		mute_bottom.innerText = "Unmute";
	}
	else{
		video.muted = false;
		console.log("Unmute video")
		mute_bottom.innerText = "Mute";
	}
});

document.querySelector("#vintage").addEventListener("click", function(){
	if(orig){
		orig = !orig;
		console.log("Change to old school style");
		video.classList.add("oldSchool");
	}
});

document.querySelector("#orig").addEventListener("click", function(){
	if(!orig){
		orig = !orig;
		console.log("Change to origin style");
		video.classList.remove("oldSchool");
	}
});
