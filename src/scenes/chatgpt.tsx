import { makeScene2D } from "@motion-canvas/2d/lib/scenes";
import { Icon, Rect, Txt } from "@motion-canvas/2d/lib/components";
import { createRef, makeRef } from "@motion-canvas/core/lib/utils";
import { all, waitFor } from "@motion-canvas/core/lib/flow";
import { CodeBlock, insert } from "@motion-canvas/2d/lib/components/CodeBlock";
import { OFFSET } from "../utils/constants";

const youtubeVideos = [
  {
    title: "Reels/Tiktok",
    text: "I can make animation videos to market your music, product, etc.",
  },
  {
    title: "Partnerships/Collabs",
    text: "I have a media kit :) Please reach out for it as I am open...",
  },
  {
    title: "Illustration",
    text: "Let me know your ideas for illustration commissions! I typically...",
  },
  {
    title: "Photography",
    text: "Have an idea you want someone to bring to life? I’m your gal B)",
  },
];

const toCodeBlockStr = (object: any) => {
  const json = JSON.stringify(object, null, "\t");
  return json.replace(/"([^"]+)":/g, "$1:");
};

export default makeScene2D(function* (view) {
  const codeBlockRef = createRef<CodeBlock>();
  const FONT_SIZE = 30;
  view.add(
    <>
      <Rect layout direction={"row"} gap={40} offset={OFFSET.topLeft} x={-1920 / 2} y={-1080 / 2}>
        <CodeBlock
          offset={OFFSET.topLeft}
          y={0}
          language="ts"
          code={() =>
            `
            {title: 5 minute makeup routine},
            {title: get ready with me for school}
          `
          }
          textWrap
          fontSize={FONT_SIZE}
          height={"100%"}
          ref={codeBlockRef}
        ></CodeBlock>
        {/* <CodeBlock
          x={0}
          offset={OFFSET.topLeft}
          y={0}
          height={"100%"}
          fill={"#000000"}
          textWrap
          fontSize={FONT_SIZE}
          language="diff"
          code={() =>
            `
             Reels/Tiktok:
             I can make animation videos to market your music, product, etc.

             Partnerships/Collabs:
             I have a media kit :) Please reach out for it as I am open...

             Illustration:
             Let me know your ideas for illustration commissions! I typically...

             Photography:
             Have an idea you want someone to bring to life? I’m your gal B)
          `
          }
        ></CodeBlock> */}
        <Rect layout direction={"column"}>
          {youtubeVideos.map((section, i) => {
            return (
              <Rect layout direction={"column"} marginBottom={40} fontFamily={"Inter, sans-serif"}>
                <Txt fill={"#000000"} fontSize={FONT_SIZE}>
                  {section.title}
                </Txt>
                <Txt fill={"#000000"} fontSize={FONT_SIZE}>
                  {section.text}
                </Txt>
              </Rect>
            );
          })}
        </Rect>
      </Rect>
    </>
  );

  yield* all(
    codeBlockRef().edit(2)`
    {
      title: 5 minute makeup routine,
      ${insert(`thumbnail: "./5minute.png",`)}
    },
    {
      title: get ready w me for school,
      ${insert(`thumbnail: "./grwm.png",`)}
    }
    `
  );

  yield* all(
    codeBlockRef().edit(2)`
    {
      title: 5 minute makeup routine,
      thumbnail: "./5minute.png",
      ${insert(`description: a simple tutorial`)}
    },
    {
      title: get ready w me for school,
      thumbnail: "./grwm.png",
      ${insert(`description: the most chaotic day ever`)}
    }
    `
  );
});

const myWebsiteContent = [
  {
    title: "Reels/Tiktok:",
    description: "I can make animation videos to market your music, product, etc.",
  },
  {
    title: "Partnerships/Collabs",
    description: "I have a media kit :) Please reach out for it as I am open...",
  },
  {
    title: "Illustration",
    description: "Let me know your ideas for illustration commissions! I typically...",
  },
  {
    title: "Photography",
    description: "Have an idea you want someone to bring to life? I’m your gal B)",
  },
];
