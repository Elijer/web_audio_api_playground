class AudioEngine {
  constructor() {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.loops = {}
  }

  async loadAudioFile(url) {
    const response = await fetch(url);
    const audioData = await response.arrayBuffer();
    return this.audioCtx.decodeAudioData(audioData);
  }

  async createLoop(name, url){
    let bufferSource = this.audioCtx.createBufferSource();
    bufferSource.buffer = await this.loadAudioFile(url)
    bufferSource.connect(this.audioCtx.destination);
    bufferSource.loop = true;
    bufferSource.start();
    this.loops[name] = bufferSource
  }

  async activate(){
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

}

const speakers = new AudioEngine();

document.addEventListener("keyup", function(event){
  if (event.key === "f"){
    speakers.activate()
    speakers.createLoop('cicadas', "sfx/cicadas.wav")
  }
})