class AudioEngine {
  constructor() {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  async loadAudioFile(url) {
    const response = await fetch(url);
    const audioData = await response.arrayBuffer();
    return this.audioCtx.decodeAudioData(audioData);
  }

  async armAudio(){
    const audioBuffer = await this.loadAudioFile('sfx/cicadas.wav')
    let bufferSource
    let soundPlaying = false

    document.addEventListener('keydown', (event) => {

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      if (event.key === "f"){

        // If the AudioContext is in the suspended state, resume it

        
        // If playback is not already playing, start playback from the beginning
        if (!soundPlaying) {
          // Re-create the BufferSourceNode instance
          bufferSource = this.audioCtx.createBufferSource();
          bufferSource.buffer = audioBuffer;
          bufferSource.connect(this.audioCtx.destination);
          bufferSource.start();
          soundPlaying = true;
        } else {
          // If playback is already playing, stop playback
          bufferSource.stop();
          soundPlaying = false;
        }
      }
    })
  }

}

const speakers = new AudioEngine();
speakers.armAudio();