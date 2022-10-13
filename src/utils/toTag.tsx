import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";

const toLink = (text: string) => {
  return (
    <Link
      key={text}
      to={"/tag/" + text.slice(1)}
      className={clsx("post__tag", "hover-underlined")}
    >
      <strong>{text}</strong>
    </Link>
  );
};

const toTag = (text: string) => {
  const regexp = /#\w+/g;
  const matchedText = Array.from(text.matchAll(regexp));

  let newText = text;
  let lastMatchIndex = 0;
  const elems: Array<React.ReactNode> = [];

  matchedText.forEach((matchedWord) => {
    const linkContent = matchedWord[0];
    const matchIndex = matchedWord.index;

    if (matchIndex !== undefined) {
      elems.push(
        newText.slice(lastMatchIndex, matchIndex), // starts from next tag's "#"
        toLink(linkContent)
      );

      lastMatchIndex = matchIndex + linkContent.length;
      newText = newText.slice(lastMatchIndex + 1);
    }
  });

  elems.push(newText); // last substring

  return elems.length === 0 ? text : elems;
};

export default toTag;
