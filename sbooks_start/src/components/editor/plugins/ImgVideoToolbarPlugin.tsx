import React from "react";
import { IconButton } from "@mui/material";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import video from "../images/icons/Play.svg";
import LinkToolbarPlugin from "./linkPlugin/LinkPlugin";
import useModal from "../plugins/commentPlugin/useModal";
import { InsertImageDialog } from "./imagePlugin/ImagePlugin";
import { CiImageOn } from "react-icons/ci";
import { EmbedConfigs } from '../plugins/youtubePlugin/YTComponent';
import { INSERT_EMBED_COMMAND } from '@lexical/react/LexicalAutoEmbedPlugin';

const ImgVideoToolbarPlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext();
  const [activeEditor] = React.useState(editor);
  const [modal, showModal] = useModal();
  const [isEditable] = React.useState(() => editor.isEditable());


  return (
    <div>
      <IconButton
        disabled={!isEditable}
        onClick={() => {
          showModal("Insert Image", (onClose) => (
            <InsertImageDialog activeEditor={activeEditor} onClose={onClose} />
          ));
        }}
        sx={{
          fontSize: "20px",
          color: "#101828",
          border: "1px solid #D0D5DD",
          borderRadius: "2px",
          padding: "4px 6px",
          marginRight: "5px",
        }}
      >
        <CiImageOn />

      </IconButton>

      {EmbedConfigs.map((embedConfig) => (
        <IconButton
          disableRipple
          sx={{
            fontSize: "20px",
            color: "#101828",
            border: "1px solid #D0D5DD",
            borderRadius: "2px",
            padding: "6px 8px",
            marginRight: "5px",
          }}
          key={embedConfig.type}
          onClick={() => {
            activeEditor.dispatchCommand(
              INSERT_EMBED_COMMAND,
              embedConfig.type,
            );
          }}
          className="item">
          <img src={video} alt="video_img" />
        </IconButton>
      ))}
      <LinkToolbarPlugin />
      {modal}
    </div>
  );
};

export default ImgVideoToolbarPlugin;
