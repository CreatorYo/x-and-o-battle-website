"use client";

import { createContext, useContext, useId, type ComponentProps } from "react";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { cn } from "@/lib/utils";

const Form = FormProvider;

const FormFieldContext = createContext<{ name: string } | null>(null);

const FormItemContext = createContext<{ id: string } | null>(null);

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

function useFormField() {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  if (!fieldContext || !itemContext) {
    throw new Error("useFormField should be used within <FormField> and <FormItem>");
  }

  return {
    formItemId: `${itemContext.id}-form-item`,
    formMessageId: `${itemContext.id}-form-item-message`,
    ...getFieldState(fieldContext.name, formState),
  };
}

function FormItem({ className, ...props }: ComponentProps<"div">) {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div className={cn("space-y-3", className)} {...props} />
    </FormItemContext.Provider>
  );
}

function FormLabel({ className, ...props }: ComponentProps<"label">) {
  const { error, formItemId } = useFormField();

  return (
    <label
      className={cn("block text-sm font-medium leading-none", error && "text-red-600 dark:text-red-400", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
}

function FormControl(props: ComponentProps<typeof Slot>) {
  const { error, formItemId, formMessageId } = useFormField();

  return (
    <Slot
      id={formItemId}
      aria-describedby={error ? formMessageId : undefined}
      aria-invalid={!!error}
      {...props}
    />
  );
}

function FormMessage({ className, children, ...props }: ComponentProps<"p">) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p id={formMessageId} className={cn("text-sm font-medium text-red-600 dark:text-red-400", className)} {...props}>
      {body}
    </p>
  );
}

export { Form, FormItem, FormLabel, FormControl, FormMessage, FormField };
