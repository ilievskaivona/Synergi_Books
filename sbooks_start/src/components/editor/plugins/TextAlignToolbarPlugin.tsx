import React from "react";
import { IconButton } from "@mui/material";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $isRangeSelection,
  $getSelection,
  FORMAT_ELEMENT_COMMAND,
  ElementFormatType,
} from "lexical";

import {
  PiTextAlignCenter,
  PiTextAlignJustify,
  PiTextAlignLeft,
  PiTextAlignRight,
} from "react-icons/pi";

const TextAlignToolbarPlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext();
  const [activeAlign, setActiveAlign] =
    React.useState<ElementFormatType | null>(null);

  const getIconSource = (format: ElementFormatType): JSX.Element | null => {
    switch (format) {
      case "left":
        return <PiTextAlignLeft />;
      case "center":
        return <PiTextAlignCenter />;
      case "right":
        return <PiTextAlignRight />;
      case "justify":
        return <PiTextAlignJustify />;
      default:
        return null;
    }
  };

  const onClick = (align: ElementFormatType): void => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, align);
        setActiveAlign(align);
      }
    });
  };
  const supportedAlignFormats: ElementFormatType[] = [
    "left",
    "center",
    "right",
    "justify",
  ];

  return (
    <div>
      {supportedAlignFormats.map((format) => (
        <IconButton
          disableRipple
          key={format}
          onClick={() => {
            onClick(format);
          }}
          sx={{
            fontSize: "20px",
            color: "#101828",
            border: "1px solid #D0D5DD",
            borderRadius: "2px",
            padding: "4px",
            marginRight: "5px",
            backgroundColor: activeAlign === format ? "#e7ecf2" : "transparent",
          }}
        >
          {getIconSource(format)}
        </IconButton>
      ))}
    </div>
  );
};

export default TextAlignToolbarPlugin;
