import { FC } from "react";

type Props = {
  number: number;
  one: string;
  few: string;
  many: string;
};

export const PluralForm: FC<Props> = ({ number, one, few, many }) => {
  const rule = new Intl.PluralRules("ru-RU").select(number);
  const form = {
    zero: one,
    one,
    two: few,
    few,
    many,
    other: many,
  }[rule];
  return <>{form}</>;
};
