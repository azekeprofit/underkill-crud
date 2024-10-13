import type * as Route from "./+types.users";
import type { User } from "#app/db/users.js";
import { db, runSql } from "../db";
import { Form, Link, redirect } from "react-router";

const getUsersSQL = db.prepare(`select id,name,surname,phone,email from Users`);
export async function loader() {
    return getUsersSQL.all() as User[];
}

const deleteUserSQL = db.prepare(`delete from Users where id=:id`);
export async function action({
    request,
}: Route.ActionArgs) {
    const id = (await request.formData()).get('id');
    return runSql(deleteUserSQL, { id }, '/users');
}

export default function Users({
    loaderData,
}: Route.ComponentProps) {

    return <><h1>Users</h1>
        {loaderData.map(({ id, name, phone }) => <div key={id}>
            <b><Link to={`/user/${id}`}>{name}</Link></b> - {phone}
            <Form className="inline ml-1" method="post">
                <input type="hidden" name="id" value={id} />
                <button className="cursor-pointer text-red-600 font-bold">x</button>
            </Form>
        </div>)}
        <Link to="/user">Add new</Link>
    </>
}