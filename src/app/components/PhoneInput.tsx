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

const PhoneInput = ({ form }: Props) => {
  const { errors } = form.formState;
  return (
    <>
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input
                className={`${
                  errors.phone
                    ? `border-red-600  focus-visible:ring-red-500 `
                    : ``
                }`}
                placeholder="0812345678"
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

export default PhoneInput;
