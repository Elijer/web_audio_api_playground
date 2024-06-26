class AudioEngine {
  constructor() {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // These buffers are loaded on initiatializationm but the bufferSourceNodes created at playback
    this.oneShotBuffers = {}

    // These buffers are loaded on initiation AND the bufferSourceNodes are created and started on initialization at low gain
    this.loops = {}

    // These are bufferSourceNodes that are created and started at playback
    this.oneShots = {}
  }

  async playOneShot(name, volume){
    let bufferSource = this.audioCtx.createBufferSource();
    bufferSource.buffer = this.oneShotBuffers[name]

    let gainNode = this.audioCtx.createGain();
    gainNode.gain.value = volume

    bufferSource.connect(gainNode).connect(this.audioCtx.destination);
    bufferSource.start()
  }

  async createOneShot(name, url) {
    this.oneShotBuffers[name] = await this.loadAudioFile(url)
  }

  async loadAudioFile(url) {
    const response = await fetch(url);
    const audioData = await response.arrayBuffer();
    return this.audioCtx.decodeAudioData(audioData);
  }

  async createLoop(name, url){
    let bufferSource = this.audioCtx.createBufferSource();
    bufferSource.buffer = await this.loadAudioFile(url)

    let gainNode = this.audioCtx.createGain();
    gainNode.gain.value = .06

    // let delay = this.audioCtx.createDelay(99);
    let biquadFilter = this.audioCtx.createBiquadFilter();
    biquadFilter.type = "lowpass";
    biquadFilter.frequency.value = 100;

    bufferSource.connect(gainNode).connect(biquadFilter).connect(this.audioCtx.destination);
    // bufferSource.connect(gainNode).connect(delay).connect(this.audioCtx.destination);
    bufferSource.loop = true;
    bufferSource.start();
    this.loops[name] = {
      source: bufferSource,
      gain: gainNode
    }
  }

  async activateContext(){
    if (this.audioCtx.state === 'suspended') this.audioCtx.resume();
  }

  // lowpass with 200 leads to bass rushing, 1000 is a slight lowpass
  // Types available: lowpass, lowshelf, highpass, highshelf, bandpass, allpass, notch, peaking
  async biquad(loopName, type, frequency){
    if (!this.loops[loopName]){
      return
    }

    this.loops[loopName].biquadFilter.type = type
    this.loops[loopName].biquadFilter.frequency.value = frequency
  }

  async loopVolume(loopName, volume, additive = false){
    if (!this.loops[loopName]){
      return
    }

    if (additive) volume += this.loops[loopName].gain.gain.value

    const gainNode = this.loops[loopName].gain
    gainNode.gain.value = volume
    console.log(gainNode)
  }
}

const speakers = new AudioEngine();

speakers.activateContext()
speakers.createLoop('cicadas', "sfx/cicadas.wav")
speakers.createOneShot('squeak', 'sfx/squeak1.m4a')

document.addEventListener("keyup", function(event){

  if (event.key === "s") speakers.loopVolume('cicadas', .5, true)

  if (event.key === "j") speakers.playOneShot("squeak", .5)

})