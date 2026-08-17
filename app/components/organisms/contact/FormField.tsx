"use client";

import type { ReactNode } from "react";
import { FieldError } from "./FieldError";
import { labelClass } from "./formStyles";

type FormFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  /** The brief supplies example answers for the qualification questions — they are the
   *  difference between a useful answer and "we need a scan". */
  help?: string;
  error?: string;
  children: ReactNode;
};

export const FormField = ({ id, label, required, help, error, children }: FormFieldProps) => (
  <div>
    <label htmlFor={id} className={labelClass}>
      {label} {required && <span className="text-destructive">*</span>}
    </label>
    {help && <p className="mb-2 text-xs leading-relaxed text-pretty text-muted-foreground">{help}</p>}
    {children}
    <FieldError msg={error} />
  </div>
);
