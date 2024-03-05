import {
  GetUserResponseSchema,
  PostUserRequestSchemaType,
  PostUserResponseSchema,
} from "@/entities/user";
import { summity } from "@/lib/summity";

export const getUser = async (email: string) =>
  summity()
    .get(`/user`, {
      params: {
        email,
      },
    })
    .then((res) => GetUserResponseSchema.parse(res.data));

export const postUser = async (user: PostUserRequestSchemaType) =>
  summity()
    .post(`/user`, user)
    .then((res) => PostUserResponseSchema.parse(res.data));

export const getUserOrPostUserIfNotExist = async (
  user: PostUserRequestSchemaType,
) => getUser(user.email).catch(() => postUser(user));
