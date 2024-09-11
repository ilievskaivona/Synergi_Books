import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import React from "react";

import { PiListBullets, PiListNumbers } from "react-icons/pi";

import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";
import { IconButton } from "@mui/material";

import multiLevel from "../images/icons/u_list-ui-alt.svg";

function ListToolbarPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();

  const onClick = (tag: "ol" | "ul", listStyle: any): void => {
    if (tag === "ol") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, listStyle);
    } else if (tag === "ul") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, listStyle);
    }
  };

  return (
    <>
      <IconButton
        disableRipple
        onClick={() => onClick("ul", undefined)}
        sx={{
          fontSize: "20px",
          color: "#101828",
          border: "1px solid #D0D5DD",
          borderRadius: "2px",
          padding: "4px 6px",
          marginRight: "5px",
        }}
      >
        <PiListBullets />
      </IconButton>
      <IconButton
        disableRipple
        onClick={() => onClick("ol", undefined)}
        sx={{
          fontSize: "20px",
          color: "#101828",
          border: "1px solid #D0D5DD",
          borderRadius: "2px",
          padding: "4px 6px",
          marginRight: "5px",
        }}
      >
        <PiListNumbers />
      </IconButton>
      <IconButton
        disableRipple
        onClick={() => onClick("ul", "multiLevel")}
        sx={{
          fontSize: "20px",
          color: "#101828",
          border: "1px solid #D0D5DD",
          borderRadius: "2px",
          padding: "6px 8px",
          marginRight: "5px",
        }}
      >
        <img src={multiLevel} alt="tab" />
      </IconButton>
    </>
  );
}

export default ListToolbarPlugin;
