import React from "react";
import { $isRangeSelection, $getSelection, type TextFormatType } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
// import {
//   FontBoldIcon,
//   FontItalicIcon,
//   StrikethroughIcon,
//   UnderlineIcon,

// } from "@radix-ui/react-icons";
import { IconButton } from "@mui/material";
import {
  PiTextStrikethrough,
  PiTextUnderline,
  PiTextItalic,
  PiTextB,
} from "react-icons/pi";

function TextFormatToolbarPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [activeFormats, setActiveFormats] = React.useState<TextFormatType[]>([]);

  const getIcon = (format: TextFormatType): JSX.Element | null => {
    switch (format) {
      case "bold":
        return <PiTextB />;
      case "italic":
        return <PiTextItalic />;
      case "underline":
        return <PiTextUnderline />;
        case "strikethrough":
          return <PiTextStrikethrough />;
      default:
        return null;
    }
  };


  const onClick = (format: TextFormatType): void => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        selection.formatText(format);

        const updatedActiveFormats = activeFormats.includes(format)
          ? activeFormats.filter((f) => f !== format)
          : [...activeFormats, format];

        setActiveFormats(updatedActiveFormats);
      }
    });
  };

  const supportedTextFormats: TextFormatType[] = [
    "bold",
    "italic",
    "underline",
    "strikethrough",
  ];
  return (
    <div>
      {supportedTextFormats.map((format) => (
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
           backgroundColor: activeFormats.includes(format) ? "#e7ecf2" : "transparent",
          }}
        >
          {getIcon(format)}
        </IconButton>
        
      ))}
    </div>
  );
}

export default TextFormatToolbarPlugin;
