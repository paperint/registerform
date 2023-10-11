"use client";
import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  UserInput,
  EmailInput,
  PasswordInput,
  PhoneInput,
  ProfileImage,
} from "./ImportComponent";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import FormSchema from "./FormSchema";

type Props = {};

function RegisterForm({}: Props) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      profile: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <article className="w-full max-w-md mx-auto">
      <Form {...form}>
        <h1 className="mb-4 text-2xl font-bold text-center underline underline-offset-2">
          Register Form
        </h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <ProfileImage form={form} />
          <UserInput form={form} />
          <EmailInput form={form} />
          <PasswordInput form={form} />
          <PhoneInput form={form} />
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </article>
  );
}

export default RegisterForm;
