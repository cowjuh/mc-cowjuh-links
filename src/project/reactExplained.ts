import { makeProject } from "@motion-canvas/core";

import reactExplained from "../scenes/reactExplained?scene";
import reactExplainedIntro from "../scenes/reactExplainedIntro?scene";
import audio from "../audio/reactExplained.mp3";

export default makeProject({
  scenes: [reactExplainedIntro, reactExplained],
  audio: audio,
});
