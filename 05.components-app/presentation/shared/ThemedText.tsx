import React from "react";
import { Text, TextProps } from "react-native";

type TextType = "normal" | "h1" | "h2" | "semi-bold" | "link";

interface Props extends TextProps {
  className?: string;
  type?: TextType;
}

const ThemedText = ({ className, type, ...rest }: Props) => {
  return (
    // className="text-3xl mt-10 text-light-text dark:text-dark-text"
    <Text
      className={[
        "text-light-text dark:text-dark-text",
        type === "normal" && "font-normal",
        type === "h1" && "text-3xl",
        type === "h2" && "text-xl",
        type === "semi-bold" && "font-bold",
        type === "link" && "font-normal underline",
        className,
      ].join(" ")}
      {...rest}
    />
  );
};

export default ThemedText;
