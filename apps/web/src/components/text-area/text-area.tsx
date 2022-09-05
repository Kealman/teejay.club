import { memo, useRef, useEffect } from "react";

type Props = Omit<JSX.IntrinsicElements["textarea"], "ref">;

export const TextArea = memo<Props>(function TextArea(props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textArea = ref.current;
    if (!textArea) {
      return;
    }
    const handleInput = () => {
      textArea.style.height = "auto";
      textArea.style.height = textArea.scrollHeight + "px";
    };
    textArea.addEventListener("input", handleInput);
    return () => {
      textArea.removeEventListener("input", handleInput);
    };
  }, []);

  return <textarea {...props} ref={ref} />;
});
