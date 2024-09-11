import * as React from "react";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { HashtagNode } from '@lexical/hashtag';
import { MarkNode } from "@lexical/mark";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { useSettings } from "../editor/plugins/commentPlugin/SettingsContext";
import { createWebsocketProvider } from "../editor/plugins/commentPlugin/collaboration";
import { ToolbarPlugin } from "./plugins/ToolbarPlugin";
import { ImageNode } from "./plugins/imagePlugin/ImageNode";
import { AutoLinkPlugin1 } from "./plugins/linkPlugin/AutoLinkPlugin1";
import { HashtagPlugin } from "@lexical/react/LexicalHashtagPlugin";
import { KeywordNode } from "./plugins/imagePlugin/KeywordNode";
import { TabIndentationPlugin } from "./plugins/imagePlugin/TabIndentationPlugin";
import { YouTubeNode } from "./plugins/youtubePlugin/YouTubeNode";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import theme from "./themes/PlaygroundEditorTheme";
import DragDropPaste from "./plugins/imagePlugin/DragDropPastePlugin";
import KeywordsPlugin from "./plugins/imagePlugin/KeywordsPlugin";
import TabFocusPlugin from "./plugins/imagePlugin/TabFocusPlugin";
import ImagesPlugin from "./plugins/imagePlugin/ImagePlugin";
import YouTubePlugin from "./plugins/youtubePlugin/YoutubePlugin";
import YTComponent from "./plugins/youtubePlugin/YTComponent";
import CommentPlugin from "../editor/plugins/commentPlugin/index";
import jsPDF from 'jspdf';
import "./styles.css";
import NavbarWrapper from "../nav/NavbarWrapper";
import { Grid } from "@mui/material";


function onError(error: Error): void {
  console.error(error);
}

export const CAN_USE_DOM: boolean =
  typeof window !== "undefined" &&
  typeof window.document !== "undefined" &&
  typeof window.document.createElement !== "undefined";

export default function Editor(): JSX.Element {
  
  const handleExportPDF = () => {
    const editorContent = document.getElementById("editor-content");

    if (!editorContent) {
      console.error("Editor content not found");
      return;
    }

    const pdf = new jsPDF();
    pdf.setFontSize(12);

    const editorText = editorContent.innerText.trim();

    const paragraphs = editorText.split(/\n\s*\n/);

    let yPosition = 10;
    let pageHeight = pdf.internal.pageSize.height;

    paragraphs.forEach((paragraph) => {
      const lines = pdf.splitTextToSize(paragraph, 180);

      lines.forEach((line: any) => {
        if (yPosition + 10 > pageHeight) {
          pdf.addPage();
          yPosition = 10;
        }

        pdf.text(line.trim(), 10, yPosition);
        yPosition += 10;
      });

      yPosition += 10;
    });

    pdf.save("editor-content.pdf");
  };

  const {
    settings: { isCollab },
  } = useSettings();

  const [isSmallWidthViewport, setIsSmallWidthViewport] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    const updateViewPortWidth = () => {
      const isNextSmallWidthViewport =
        CAN_USE_DOM && window.matchMedia("(max-width: 1025px)").matches;

      if (isNextSmallWidthViewport !== isSmallWidthViewport) {
        setIsSmallWidthViewport(isNextSmallWidthViewport);
      }
    };
    updateViewPortWidth();
    window.addEventListener("resize", updateViewPortWidth);

    return () => {
      window.removeEventListener("resize", updateViewPortWidth);
    };
  }, [isSmallWidthViewport]);

  const initialConfig = {
    namespace: "MyEditor",
    theme: theme,
    onError,
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      AutoLinkNode,
      LinkNode,
      MarkNode,
      ImageNode,
      HashtagNode,
      KeywordNode,
      YouTubeNode
    ],
  };

  return (
    <Grid
      container
      // justifyContent="center" 
      // alignItems="center" 

      sx={{ minHeight: "100vh", marginTop: "100px"}} 
    >
      <NavbarWrapper /> 
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        <RichTextPlugin
          contentEditable={<ContentEditable className="contentEditable" id="editor-content" />}
          placeholder={<div className="placeholder"></div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <ListPlugin />
        <CommentPlugin
          providerFactory={isCollab ? createWebsocketProvider : undefined}
        />
        <LinkPlugin />
        {/* <LinkToolbarPlugin /> */}
        <TabIndentationPlugin />
        <AutoLinkPlugin1 />
        <ImagesPlugin />
        <DragDropPaste />
        <HashtagPlugin />
        <KeywordsPlugin />
        <TabFocusPlugin />
        <YouTubePlugin />
        <YTComponent />
      </LexicalComposer>
      {/* <button onClick={handleExportPDF}>Export to PDF</button> */}
      </Grid>
  );
}