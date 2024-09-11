import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { PiArrowArcRight, PiArrowArcLeft } from "react-icons/pi";

const LowPriority = 1;

function UndoRedoPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [canUndo, setCanUndo] = useState<boolean>(false);
  const [canRedo, setCanRedo] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const handleUndoRedoState = (payload: boolean): boolean => {
      if (isMounted) {
        setCanUndo(payload);
        return payload;
      }
      return false;
    };

    editor.registerCommand(CAN_UNDO_COMMAND, handleUndoRedoState, LowPriority);

    return () => {
      setIsMounted(false);
    };
  }, [editor, isMounted]);

  useEffect(() => {
    const handleUndoRedoState = (payload: boolean): boolean => {
      if (isMounted) {
        setCanRedo(payload);
        return payload;
      }
      return false;
    };
    editor.registerCommand(CAN_REDO_COMMAND, handleUndoRedoState, LowPriority);
    return () => {
      setIsMounted(false);
    };
  }, [editor, isMounted]);

  const handleUndo = () => {
    if (canUndo) {
      editor.dispatchCommand(UNDO_COMMAND, undefined);
    }
  };

  const handleRedo = () => {
    if (canRedo) {
      editor.dispatchCommand(REDO_COMMAND, undefined);
    }
  };

  return (
    <>
      <IconButton
        disableRipple
        onClick={handleUndo}
        disabled={!canUndo}
        sx={{
          border: "1px solid  #D0D5DD",
          borderRadius: "2px",
          height: "30px",
          marginRight: "5px",
          color: "#101828",
        }}
      >
        <PiArrowArcLeft style={{ width: "18px" }} />
      </IconButton>
      <IconButton
        disableRipple
        onClick={handleRedo}
        disabled={!canRedo}
        sx={{
          border: "1px solid  #D0D5DD",
          borderRadius: "2px",
          height: "30px",
          color: "#101828",
        }}
      >
        <PiArrowArcRight style={{ width: "18px" }} />
      </IconButton>
    </>
  );
}

export default UndoRedoPlugin;