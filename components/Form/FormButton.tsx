"use client";

import { useFormStatus } from "react-dom";
import { Loader } from "lucide-react";
import { Button } from "../ui/button";

type ButtonSize = "default" | "sm" | "lg" | "icon";

type FormButtonProps = {
  className?: string;
  size?: ButtonSize;
  text?: string;
};

function FormButton({ className, size, text }: FormButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      className={`${className} uppercase`}
      type="submit"
      size={size}
      disabled={pending}
    >
      {pending ? <Loader className="animate-spin" /> : text}
    </Button>
  );
}
export default FormButton;
