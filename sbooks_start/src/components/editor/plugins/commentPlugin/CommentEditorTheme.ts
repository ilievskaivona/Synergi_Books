import type {EditorThemeClasses} from 'lexical';

import './index.css';

import baseTheme from '../../themes/PlaygroundEditorTheme';

const theme: EditorThemeClasses = {
  ...baseTheme,
  paragraph: 'CommentEditorTheme__paragraph',
};

export default theme;