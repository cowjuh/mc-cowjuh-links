import { SignalValue } from "@motion-canvas/core/lib/signals";
import { PossibleVector2 } from "@motion-canvas/core/lib/types";

interface IOFFSET {
  topLeft: SignalValue<PossibleVector2>;
  topRight: SignalValue<PossibleVector2>;
  bottomRight: SignalValue<PossibleVector2>;
  bottomLeft: SignalValue<PossibleVector2>;
}

export const OFFSET: IOFFSET = {
  topLeft: [-1, -1],
  topRight: [1, -1],
  bottomRight: [0, 1],
  bottomLeft: [-1, 1],
};
