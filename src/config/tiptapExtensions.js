import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Code from "@tiptap/extension-code";
import Highlight from "@tiptap/extension-highlight";
import History from "@tiptap/extension-history";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Blockquote from "@tiptap/extension-blockquote";
import Placeholder from "@tiptap/extension-placeholder";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import { all, createLowlight } from "lowlight";

const CustomBold = Bold.extend({
  renderHTML({ HTMLAttributes }) {
    return ["b", HTMLAttributes, 0];
  },
});

const lowlight = createLowlight(all);

lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

export const defaultExtensions = [
  Document,
  Paragraph,
  Text,
  Heading.configure({
    levels: [1, 2, 3],
  }),
  HorizontalRule,
  BulletList,
  OrderedList,
  ListItem,
  Code,
  Highlight.configure({
    multicolor: false,
    HTMLAttributes: {
      class: "my-custom-highlight",
    },
  }),
  History,
  CustomBold,
  Italic,
  TextStyle,
  Color,
  Image,
  Link.configure({
    openOnClick: true,
    defaultProtocol: "https",
  }),
  Blockquote,
  Placeholder.configure({
    placeholder: "여기에 무엇이든 작성하세요 ...",
  }),
  CodeBlockLowlight.configure({
    lowlight,
  }),
];
