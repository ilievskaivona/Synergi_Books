import React from "react";
import { IconButton } from "@mui/material";
import indentIcon from "../images/icons/indent-left.svg";
import outdentIcon from "../images/icons/outdent.svg";
import quoteIcon from "../images/icons/quotes.svg";
import {
  $getSelection,
  $isRangeSelection,
  INDENT_CONTENT_COMMAND,
  LexicalEditor,
  OUTDENT_CONTENT_COMMAND,
} from "lexical";
import {
  useLexicalComposerContext,
  LexicalComposerContextType,
} from "@lexical/react/LexicalComposerContext";
import { $createQuoteNode } from "@lexical/rich-text";
import { $wrapNodes } from "@lexical/selection";

const IndentOutdentToolbarPlugin: React.FC = () => {
  const [editor]: [LexicalEditor, LexicalComposerContextType] =
    useLexicalComposerContext();

  const handleIndent = (): void => {
    editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
  };

  const handleOutdent = (): void => {
    editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
  };

  const handleQuote = (): void => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        $wrapNodes(selection, () => $createQuoteNode());
      }
    });
  };

  return (
    <div>
      <IconButton
        disableRipple
        onClick={handleIndent}
        sx={{
          fontSize: "20px",
          color: "#101828",
          border: "1px solid #D0D5DD",
          borderRadius: "2px",
          padding: "6px 8px",
          marginRight: "5px",
        }}
      >
        <img src={indentIcon} alt="indent" />
      </IconButton>
      <IconButton
        disableRipple
        onClick={handleOutdent}
        sx={{
          fontSize: "20px",
          color: "#101828",
          border: "1px solid #D0D5DD",
          borderRadius: "2px",
          padding: "6px 8px",
          marginRight: "5px",
        }}
      >
        <img src={outdentIcon} alt="outdent" />
      </IconButton>
      <IconButton
        disableRipple
        onClick={handleQuote}
        sx={{
          color: "#101828",
          border: "1px solid #D0D5DD",
          borderRadius: "2px",
          padding: "8px 8px",
          marginRight: "5px",
        }}
      >
        <img src={quoteIcon} alt="quote" />
      </IconButton>
    </div>
  );
};

export default IndentOutdentToolbarPlugin;
