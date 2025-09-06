"use client";

import { useEffect } from "react";
import { useActionState } from "react";
import { toast } from "sonner";
import { FormState } from "@/utils/types";

interface FormContainerProps {
  children: React.ReactNode;
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
}

const initialState = {
  message: "",
};

function FormContainer({ children, action }: FormContainerProps) {
  const [state, formAction] = useActionState(action, initialState);

  useEffect(() => {
    if (state.message) {
      toast(state.message);
    }
  }, [state.message]);

  return <form action={formAction}>{children}</form>;
}
export default FormContainer;
