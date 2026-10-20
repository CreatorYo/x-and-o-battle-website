import { Fragment, type CSSProperties } from "react";

export function revealIndex(i: number) {
  return { "--i": i } as CSSProperties;
}

export function BlurWords({ text, offset = 0 }: { text: string; offset?: number }) {
  const words = text.split(" ");

  return words.map((word, i) => (
    <Fragment key={i}>
      <span className="reveal-word" style={revealIndex(offset + i)}>
        {word}
      </span>
      {i < words.length - 1 && " "}
    </Fragment>
  ));
}
