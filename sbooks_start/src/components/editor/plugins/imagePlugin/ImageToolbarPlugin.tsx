import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useState } from "react";
import DropDown, { DropDownItem } from "../commentPlugin/ui/DropDown";
import useModal from "../commentPlugin/useModal";
import { InsertImageDialog } from "./ImagePlugin";


export default function ImageToolbarPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [activeEditor] = useState(editor);

  const [modal, showModal] = useModal();

  const [isEditable] = useState(() => editor.isEditable());

  return (
    <div className="toolbar">
      <>
        <DropDown
          disabled={!isEditable}
          buttonClassName="toolbar-item spaced"
          buttonLabel="Insert"
          buttonAriaLabel="Insert specialized editor node"
  
        >
              
          <DropDownItem
            onClick={() => {
              showModal("Insert Image", (onClose) => (
                <InsertImageDialog
                  activeEditor={activeEditor}
                  onClose={onClose}
                />
              ));
            }}
            className="item"
          >
            <i className="icon image" />
            <span className="text">Image</span>
          </DropDownItem>
        </DropDown>
      </>

      {modal}
    </div>
  );
}
