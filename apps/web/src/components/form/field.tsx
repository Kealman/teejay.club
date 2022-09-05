import { memo, ReactNode } from "react";

import { Error } from "./error";

type Props = {
  label?: string;
  isRequired?: boolean;
  errors?: string[];
  children: ReactNode;
};

export const Field = memo<Props>(
  ({ label, isRequired = false, errors, children }) => (
    <div className="relative flex flex-col gap-y-3 content">
      <label className="flex flex-col">
        {label && (
          <div>
            {label} {isRequired && <span className="text-red-500">*</span>}
          </div>
        )}
        {children}
        {errors?.map((error, index) => (
          <Error key={index}>{error}</Error>
        ))}
      </label>
    </div>
  )
);

Field.displayName = "Field";
