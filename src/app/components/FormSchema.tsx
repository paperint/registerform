import { z } from "zod";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Please check your email again." }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters" }),
  phone: z.string().regex(/^\d{10}$/, {
    message: "Phone number must be 10 digits without spaces or dashes",
  }),
  profile: z.string().min(1, { message: "Please upload your profile" }),
});

export default FormSchema;
