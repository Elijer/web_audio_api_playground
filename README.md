https://tonejs.github.io/
[Web Audio API](https://webaudioapi.com/book/Web_Audio_API_Boris_Smus_html/ch01.html#:~:text=The%20Web%20Audio%20API%20is%20built%20around%20the%20concept%20of,destination%20(often%20your%20speakers).)
[MDN Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[Cool talk about web audio api](https://www.youtube.com/watch?v=uasGsHf7UYA)



# The Web Audio API
A) Sources - these can be computed by Oscillators, or loaded from audio files.
B) Outputs - thesemix or modify the streams from sound simples into different streams. A simple example is adding gain.
C) Destination - this sends sounds to speakers or headphones.

The Process
1) Create an audio context
2) Create a source, or sources
3) Create effect nodes
4) Choose destination
5) Connect the nodes to the effects, and the effects to the destination


Concept
Apparently this is all based on something called an "Audio Graph" - this is sort of a spatial structure made of nodes.
- Allows for modular routing
- Basic audio operations performed with audio nodes
- These are linked together to form an audio routing graph
SO
Input nodes, modification nodes, output nodes. (This language is just another flavor of the three step explanation above it seems like)

Note
The Web Audio API also allows us to control how audio is spatialized.
- Panning model
- Distance-induced attenuation (induced by a moving source, OR listener)


User Interaction Best Practices
- [Autoplay guide for media and Web Audio APIs](https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide)

[Here is a tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API)
[Tutorial Sourcode](https://github.com/mdn/webaudio-examples/tree/main/audio-basics)