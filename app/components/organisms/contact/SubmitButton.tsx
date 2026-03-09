'use client';

import { useFormStatus } from 'react-dom';
import { ArrowRight } from 'lucide-react';

type SubmitButtonProps = {
  label: string;
  submittingLabel: string;
};

export const SubmitButton = ({ label, submittingLabel }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 w-full px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm tracking-wide hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {pending ? submittingLabel : label}
      {!pending && <ArrowRight className="h-4 w-4" />}
    </button>
  );
};
