import { makeScene2D } from "@motion-canvas/2d/lib/scenes";
import { Circle, Img, Rect, Txt } from "@motion-canvas/2d/lib/components";
import { createRef } from "@motion-canvas/core/lib/utils";
import { all, waitUntil } from "@motion-canvas/core/lib/flow";

export default makeScene2D(function* (view) {
  const rectRef = createRef<Img>();
  const componentizeRef = createRef<Txt>();
  const NUDGE_AMT = 100;

  view.add(
    <Rect y={1080} layout direction={"column"} justifyContent={"start"} gap={NUDGE_AMT} ref={rectRef}>
      <Img
        width={300}
        src={"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"}
      />
      <Txt opacity={0} y={NUDGE_AMT} fontFamily={"Inter, sans-serif"} fill={"#ffffff"} ref={componentizeRef}>
        "Componentize"
      </Txt>
    </Rect>
  );

  yield* waitUntil("cueReact");
  yield* all(rectRef().position.y(0, 1));
  yield* waitUntil("componentize");
  yield* all(componentizeRef().opacity(100, 1));
  yield* waitUntil("endIntro");
  yield* all(rectRef().position.y(1080, 1));
});
