import { email, minLength, nonEmpty, nullish, number, object, optional, pipe, regex, string, transform, undefined, union, type InferInput } from "valibot";

export const UserSchema=object({
  id:optional(union([number(),pipe(string(),transform(parseInt))])),
  name:pipe(string(),minLength(3, 'at least 3 letters long'),nonEmpty("enter name")),
  email:pipe(string(),email()),
  surname:pipe(string(),nonEmpty()),
  phone:pipe(string(),regex(/^[\d\s-]+$/,'Phone wrong'),nonEmpty()),
})

export type User=InferInput<typeof UserSchema>;

// export const postUser = async (addedUser: typeof UsersTable.$inferInsert) => {
//   return (await db.insert(UsersTable).values(addedUser)).rowCount;
// };

// export const deleteUser = async (id: number) => {
//   return (await db.delete(UsersTable).where(eq(UsersTable.id,id))).rowCount
// };