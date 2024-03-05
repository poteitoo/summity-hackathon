import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
  image: z.string().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const GetUserResponseSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
  image: z.string().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const PostUserRequestSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  image: z.string().optional(),
});
export type PostUserRequestSchemaType = z.infer<typeof PostUserRequestSchema>;
export const PostUserResponseSchema = UserSchema;
export type PostUserResponseSchemaType = z.infer<typeof PostUserResponseSchema>;
