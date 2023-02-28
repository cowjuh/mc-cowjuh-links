import { makeScene2D } from "@motion-canvas/2d/lib/scenes";
import { Circle, Rect, Txt } from "@motion-canvas/2d/lib/components";
import { makeRef } from "@motion-canvas/core/lib/utils";
import { all, waitFor } from "@motion-canvas/core/lib/flow";
import { OFFSET } from "../utils/constants";

const row1 = [
  "The Science of Sleep: How to Get Better Rest",
  "Exploring the Hidden Gems of Tokyo",
  "Baking the Perfect Croissant: Tips and Tricks",
  "How to Build a Sustainable Wardrobe on a Budget",
];
const row2 = [
  "Uncovering the Mysteries of the Bermuda Triangle",
  "5 Minute Makeup Tutorial for a Natural Look",
  "Mastering the Art of Calligraphy",
  "Creating a Capsule Skincare Routine for Glowing Skin",
];
const thumbnailContent = [row1, row2];

export default makeScene2D(function* (view) {
  const videoRefs: Rect[] = [];
  const rowRefs: Rect[] = [];
  const thumbnailRefs: Rect[] = [];
  const textRefs: Txt[] = [];
  const NUM_COLUMNS = row1.length;
  const GAP = 75;
  const THUMBNAIL_WIDTH = (1920 - (NUM_COLUMNS - 1) * GAP) / NUM_COLUMNS - 11;
  const THUMBNAIL_HEIGHT = THUMBNAIL_WIDTH * (720 / 1280);
  const ROW_ORIGIN_X = -1920 / 2;
  const ROW_ORIGIN_Y = -1080 / 2;

  view.add(
    <>
      {thumbnailContent.map((row, rowIndex) => {
        return (
          <Rect
            fill={"#ffffff"}
            x={ROW_ORIGIN_X}
            y={ROW_ORIGIN_Y * rowIndex}
            offset={OFFSET.topLeft}
            ref={makeRef(rowRefs, rowIndex)}
          >
            {row.map((text, i) => {
              const x = THUMBNAIL_WIDTH * i + GAP * i;
              return (
                <Rect
                  layout
                  direction={"column"}
                  offset={OFFSET.topLeft}
                  x={x}
                  y={ROW_ORIGIN_Y * rowIndex + 1920 + i * 150}
                  gap={20}
                  fontFamily={"Inter, sans-serif"}
                  ref={makeRef(videoRefs, i + rowIndex * NUM_COLUMNS)}
                  width={THUMBNAIL_WIDTH}
                >
                  <Rect
                    layout
                    radius={10}
                    fill={"#303030"}
                    width={THUMBNAIL_WIDTH}
                    height={THUMBNAIL_HEIGHT}
                    padding={10}
                    justifyContent={"end"}
                    alignItems={"end"}
                    offset={OFFSET.topLeft}
                    ref={makeRef(thumbnailRefs, i + rowIndex * NUM_COLUMNS)}
                  >
                    <Rect
                      fill={"#000000"}
                      paddingBottom={5}
                      paddingTop={5}
                      paddingLeft={10}
                      paddingRight={10}
                      radius={10}
                    >
                      <Txt fill={"#ffffff"} fontSize={30}>
                        3:00
                      </Txt>
                    </Rect>
                  </Rect>
                  <Rect
                    layout
                    direction={"row"}
                    gap={20}
                    alignItems={"center"}
                    width={THUMBNAIL_WIDTH}
                    wrap={"wrap"}
                    textWrap
                    clip
                  >
                    <Circle x={0} width={70} height={70} fill={"#ffffff"} />
                    <Txt
                      fill={"#ffffff"}
                      fontSize={30}
                      fontWeight={600}
                      width={THUMBNAIL_WIDTH - 70 - 20}
                      textWrap={true}
                      ref={makeRef(textRefs, i + rowIndex * NUM_COLUMNS)}
                    >
                      {text.length > 32 ? text.substring(0, 32) + "..." : text}
                    </Txt>
                  </Rect>
                </Rect>
              );
            })}
          </Rect>
        );
      })}
    </>
  );

  const animateThumbnails = () => {
    const obj = [];
    for (let i = 0; i < videoRefs.length; i++) {
      obj.push(videoRefs[i].position.y(0, 1));
    }

    return obj;
  };

  const fadeOutThumbnails = () => {
    const obj = [];
    for (let i = 0; i < videoRefs.length; i++) {
      obj.push(videoRefs[i].position.y(ROW_ORIGIN_Y + 1200 + i * 200, 1.5));
    }

    return obj;
  };

  const scaleThumbnails = () => {
    const obj = [];
    for (let i = 0; i < thumbnailRefs.length; i++) {
      obj.push(videoRefs[i].scale(1.1, 1));
      obj.push(thumbnailRefs[i].fill("#2e6fd9", 1));
      obj.push(textRefs[i].fill("#2e6fd9", 1));
    }

    return obj;
  };

  const scaleSingleThumbnail = () => {
    const obj = [];
    obj.push(videoRefs[NUM_COLUMNS].scale(1.1, 1).to(1, 1));
    obj.push(thumbnailRefs[NUM_COLUMNS].fill("#2e6fd9", 1).to("#303030", 1));
    obj.push(textRefs[NUM_COLUMNS].fill("#2e6fd9", 1).to("#ffffff", 1));
    return obj;
  };

  yield* all(...animateThumbnails());
  yield* all(...scaleSingleThumbnail());
  yield* all(...scaleThumbnails());
  yield* waitFor(1);
  yield* all(...fadeOutThumbnails());
});
