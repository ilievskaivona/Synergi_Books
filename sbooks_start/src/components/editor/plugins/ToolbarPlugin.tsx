import React from "react";
import "./toolbar.css";
import { Grid } from "@mui/material";
import * as Toolbar from "@radix-ui/react-toolbar";

import TextFormatToolbarPlugin from "./TextFormatToolbarPlugin";
import ListToolbarPlugin from "./ListToolbarPlugin";
import TextAlignToolbarPlugin from "./TextAlignToolbarPlugin";
import UndoRedoPlugin from "./UndoRedoPlugin";

import IndentOutdentToolbarPlugin from "./IndentOutdentToolbarPlugin";
import ImgVideoToolbarPlugin from "./ImgVideoToolbarPlugin";

export function ToolbarPlugin(): JSX.Element {
  
  return (
    <Toolbar.Root className="toolbarRoot">
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <UndoRedoPlugin />
        </Grid>
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="divider" />
          <TextFormatToolbarPlugin />
          <div className="divider" />
        </Grid>
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextAlignToolbarPlugin />
        </Grid>
      </Grid>
      <Grid container sx={{ marginTop: "10px", justifyContent: "center" }}>
        <Grid>
          <ListToolbarPlugin />
        </Grid>
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="divider" />
          <ImgVideoToolbarPlugin />
          <div className="divider" />
        </Grid>
        <Grid>
          <IndentOutdentToolbarPlugin />
        </Grid>
      </Grid>
    </Toolbar.Root>
  );
}
