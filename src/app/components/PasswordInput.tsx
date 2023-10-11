import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type Props = {
  form: any;
};

const PasswordInput = ({ form }: Props) => {
  const { errors } = form.formState;
  return (
    <>
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                className={`${
                  errors.password
                    ? `border-red-600  focus-visible:ring-red-500 `
                    : ``
                }`}
                type="password"
                placeholder="1234"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default PasswordInput;
