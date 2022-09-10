import { OutputData } from "@editorjs/editorjs";
import { Component } from "react";

import { Telegram } from "./telegram";
import { Twitter } from "./twitter";

type Props = {
  placeholder: string;
  value: OutputData;
  onChange: (value: OutputData) => void;
};

export class Editor extends Component<Props> {
  editor?: Promise<import("@editorjs/editorjs").default>;

  shouldComponentUpdate() {
    return false;
  }

  async componentDidMount() {
    if (this.editor) {
      return;
    }

    this.editor = import("@editorjs/editorjs").then(
      async ({ default: EditorJS }) => {
        const tools = await this.fetchTools();
        return new EditorJS({
          holder: "editorjs",
          placeholder: this.props.placeholder,
          data: this.props.value,
          onChange: async (api) => {
            const value = await api.saver.save();
            this.props.onChange(value);
          },
          onReady: () => {
            const title =
              document.querySelector<HTMLInputElement>("#title-input");
            if (title) {
              title.addEventListener("keydown", async (event) => {
                if (event.code === "Enter") {
                  event.preventDefault();
                  const editor = await this.editor;
                  if (!editor) {
                    return;
                  }
                  editor.focus();
                }
              });
            }
          },
          // @ts-ignore
          tools,
          minHeight: 40,
        });
      }
    );
  }

  async fetchTools() {
    const [Header, list, quote, delimiter] = await Promise.all([
      // @ts-ignore
      import("@editorjs/header").then((i) => i.default),
      // @ts-ignore
      import("@editorjs/list").then((i) => i.default),
      // @ts-ignore
      import("@editorjs/quote").then((i) => i.default),
      // @ts-ignore
      import("@editorjs/delimiter").then((i) => i.default),
    ]);
    return {
      header: {
        class: Header,
        defaultLevel: 2,
        inlineToolbar: false,
      },
      list,
      quote,
      delimiter,
      telegram: Telegram,
      twitter: Twitter,
    };
  }

  render() {
    return <div id="editorjs"></div>;
  }
}
