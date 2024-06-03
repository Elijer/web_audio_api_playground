class AudioEngine {
  constructor() {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  armAudio(){

    // load some sound
    const audioElement = document.querySelector('audio');
    const track = this.audioCtx.createMediaElementSource(audioElement);

    const playButton = document.querySelector('.tape-controls-play');

    let soundPlaying = false
    let makePlay = false

    document.addEventListener('keydown', (event) => {

      if (event.key === "f"){
      //       // check if context is in suspended state (autoplay policy)
        if (this.audioCtx.state === 'suspended') {
          this.audioCtx.resume();
        }
        
        if (soundPlaying === false) {
          audioElement.play();
          soundPlaying = true;
        // if track is playing pause it
        } else if (soundPlaying === true) {
          audioElement.pause();
          soundPlaying = false;
        }
      }
    })


    // if track ends
    audioElement.addEventListener('ended', () => {
      playButton.dataset.playing = 'false';
      playButton.setAttribute( "aria-checked", "false" );
    }, false);

    track.connect(this.audioCtx.destination);
  }

}

const speakers = new AudioEngine();
speakers.armAudio();


// // load some sound
// const audioElement = document.querySelector('audio');
// const track = audioCtx.createMediaElementSource(audioElement);

// const playButton = document.querySelector('.tape-controls-play');

// let soundPlaying = false
// let makePlay = false

// document.addEventListener('keydown', (event) => {

//   if (event.key === "f"){
//   //       // check if context is in suspended state (autoplay policy)
//     if (audioCtx.state === 'suspended') {
//       audioCtx.resume();
//     }
    
//     if (soundPlaying === false) {
//       audioElement.play();
//       soundPlaying = true;
//     // if track is playing pause it
//     } else if (soundPlaying === true) {
//       audioElement.pause();
//       soundPlaying = false;
//     }
//   }
// })


// // if track ends
// audioElement.addEventListener('ended', () => {
// 	playButton.dataset.playing = 'false';
// 	playButton.setAttribute( "aria-checked", "false" );
// }, false);

// volume
// let gainValue = .01
// let direction = 1
// const gainNode = audioCtx.createGain();

// setInterval(() => {
//   console.log(gainValue)
//   if (gainValue >= 10){
//     direction = -1;
//   } else if (gainValue <= 0){
//     direction = 1
//   }

//   gainNode.gain.value = gainValue

//   gainValue += direction * .01
// }, 2000)

// panning
// const pannerOptions = {pan: 0};
// const panner = new StereoPannerNode(audioCtx, pannerOptions);

// const pannerControl = document.querySelector('[data-action="panner"]');
// pannerControl.addEventListener('input', function() {
// 	panner.pan.value = this.value;	
// }, false);

// connect our graph
// track.connect(gainNode).connect(panner).connect(audioCtx.destination);
// track.connect(audioCtx.destination);

// const powerButton = document.querySelector('.control-power');

// powerButton.addEventListener('click', function() {
// 	if (this.dataset.power === 'on') {
// 		audioCtx.suspend();
// 		this.dataset.power = 'off';
// 	} else if (this.dataset.power === 'off') {
// 		audioCtx.resume();
// 		this.dataset.power = 'on';
// 	}
// 	this.setAttribute( "aria-checked", state ? "false" : "true" );
// 	console.log(audioCtx.state);
// }, false);

// Track credit: Outfoxing the Fox by Kevin MacLeod under Creative Commons 




