import { makeScene2D } from "@motion-canvas/2d/lib/scenes";
import { Circle, Rect, Txt } from "@motion-canvas/2d/lib/components";
import { makeRef } from "@motion-canvas/core/lib/utils";
import { all, waitFor, waitUntil } from "@motion-canvas/core/lib/flow";
import { OFFSET } from "../utils/constants";
import { SignalGenerator } from "@motion-canvas/core/lib/signals";

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
  const timestampRefs: Rect[] = [];
  const iconRefs: Rect[] = [];
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
            fill={"#000000"}
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
                    fill={"#171717"}
                    width={THUMBNAIL_WIDTH}
                    height={THUMBNAIL_HEIGHT}
                    padding={10}
                    justifyContent={"end"}
                    alignItems={"end"}
                    offset={OFFSET.topLeft}
                    opacity={10}
                    stroke={"#ffffff40"}
                    lineWidth={6}
                    ref={makeRef(thumbnailRefs, i + rowIndex * NUM_COLUMNS)}
                  >
                    <Rect
                      fill={"#000000"}
                      paddingBottom={5}
                      paddingTop={5}
                      paddingLeft={10}
                      paddingRight={10}
                      radius={10}
                      opacity={0}
                      ref={makeRef(timestampRefs, i + rowIndex * NUM_COLUMNS)}
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
                    <Circle
                      x={0}
                      width={70}
                      height={70}
                      fill={"#ffffff"}
                      lineWidth={2}
                      opacity={0}
                      ref={makeRef(iconRefs, i + rowIndex * NUM_COLUMNS)}
                    />
                    <Txt
                      fill={"#ffffff"}
                      fontSize={30}
                      opacity={0}
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

  const fadeInTimeStamps = () => {
    const obj: SignalGenerator<number, number>[] = [];
    timestampRefs.forEach((timestamp) => {
      obj.push(timestamp.opacity(100, 0.7));
    });
    return obj;
  };

  const fadeInIcon = () => {
    const obj: SignalGenerator<number, number>[] = [];
    iconRefs.forEach((icon) => {
      obj.push(icon.opacity(100, 2));
    });
    return obj;
  };

  const fadeInText = () => {
    const obj: SignalGenerator<number, number>[] = [];
    textRefs.forEach((text) => {
      obj.push(text.opacity(100, 1));
    });
    return obj;
  };

  const animateThumbnails = () => {
    const obj = [];
    for (let i = 0; i < videoRefs.length; i++) {
      obj.push(videoRefs[i].position.y(0, 1));
    }

    return obj;
  };

  const clearerThumbnails = () => {
    const obj = [];
    for (let i = 0; i < thumbnailRefs.length; i++) {
      obj.push(thumbnailRefs[i].fill("#303030", 2));
      obj.push(thumbnailRefs[i].lineWidth(0, 2));
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
    }

    return obj;
  };

  const colorThumbnails = (fill: string) => {
    const obj = [];
    for (let i = 0; i < thumbnailRefs.length; i++) {
      obj.push(thumbnailRefs[i].fill(fill, i * 0.3));
    }

    return obj;
  };

  const scaleSingleThumbnail = () => {
    const obj = [];
    obj.push(videoRefs[NUM_COLUMNS].scale(1.1, 1));
    obj.push(thumbnailRefs[NUM_COLUMNS].fill("#2e6fd9", 1));
    return obj;
  };
  yield* waitUntil("initialize");
  yield* all(...animateThumbnails());
  yield* waitUntil("fadeInClearerVideo");
  yield* all(...clearerThumbnails());
  yield* waitUntil("fadeInTimestamps");
  yield* all(...fadeInTimeStamps());
  yield* waitUntil("fadeInText");
  yield* all(...fadeInText());
  yield* waitUntil("fadeInIcons");
  yield* all(...fadeInIcon());
  yield* waitUntil("hugeSingleThumbnail");
  yield* all(...scaleSingleThumbnail());
  yield* waitUntil("scaleAllThumbnails");
  yield* all(...scaleThumbnails());
  yield* waitUntil("changeColor");
  yield* all(...colorThumbnails("#FF8A91"));
  yield* all(...colorThumbnails("#FFCC17"));
  yield* waitUntil("fadeThumbnailsOut");
  yield* all(...fadeOutThumbnails());
  yield* waitUntil("audioEnd");
});
