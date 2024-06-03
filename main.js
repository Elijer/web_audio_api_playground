import * as Tone from "tone";

//create a synth and connect it to the main output (your speakers)
const synth = new Tone.Synth().toDestination();

// const keys = ['qwertyuiopasdfghjklzxcvbnm']
// const notes = ['ABCDEFG']
// const octaves = ['123456']
//play a middle 'C' for the duration of an 8th note
// synth.triggerAttackRelease("C4", "8n");

// Add an event listener for the 'keydown' event
document.addEventListener('keydown', function(event) {

  if (event.key === 'a') {
    // synth.triggerAttackRelease("C4", "8n");
    const now = Tone.now();
    synth.triggerAttack("C4", now);
// wait one second before triggering the release
    synth.triggerRelease(now + 1);
  } else if (event.key === 's') {
    synth.triggerAttackRelease("C5", "8n");
  } else if (event.key === 'd'){
    synth.triggerAttackRelease("A3", "8n");
  }
});
