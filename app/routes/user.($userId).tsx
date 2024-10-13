import { FormValibot } from "#app/db/useFormValibot.js";
import { UserSchema, type User } from "#app/db/users.js";
import { Link } from "react-router";
import { safeParse } from "valibot";
import { db, runSql } from "../db";
import type * as Route from "./+types.user.($userId)";


const getUserDetailSQL = db.prepare(`select id,name,surname,phone,email from Users where id=:userId`);

export async function loader({ params: { userId } }: Route.LoaderArgs) {
    if (!userId) return {} as User;
    return getUserDetailSQL.get({ userId }) as User;
}


const insertUserSQL = db.prepare(`insert into Users (name,surname,phone,email) values (:name,:surname,:phone,:email)`);
const updateUserSQL = db.prepare(`update Users SET name=:name,surname=:surname,phone=:phone,email=:email where id=:id`);
export async function action({
    request,
}: Route.ActionArgs) {
    let formData = await request.formData();
    const result = safeParse(UserSchema, Object.fromEntries(formData));
    const errorsArr = (result?.issues ?? []).map(({ path, type, message }) => [path?.[0]?.key, { type, message }]);
    if (errorsArr.length > 0) {
        return Object.fromEntries(errorsArr);
    }
    const user = result.output as User;
    const sql = user.id ? updateUserSQL : insertUserSQL;
    return runSql(sql, user, '/users');
}


export default function UserDetails({
    loaderData,
    actionData
}: Route.ComponentProps) {
    return <>
        <FormValibot serverErrors={actionData} data={loaderData} schema={UserSchema} fields={
            ({ register, fieldError, getValues, formState: { errors } }) => <>
                <h1>id: {getValues("id")}</h1>
                <input type="hidden" {...register('id')} />
                <p>name: <input {...register('name')} /></p>
                {fieldError('name')}
                <p>surname: <input {...register('surname')} /></p>
                {fieldError('surname')}
                <p>email: <input {...register('email')} /></p>
                {fieldError('email')}
                <p>phone: <input {...register('phone')} /></p>
                {fieldError('phone')}
                <p>
                    <input type="submit" value="Save" className="border-1 rounded-e mr-2" />
                    <Link to="/users">back to Users</Link>
                </p>
            </>
        } />
    </>
}