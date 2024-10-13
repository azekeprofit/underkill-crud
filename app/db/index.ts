import Database, { type Statement } from "better-sqlite3";
import { redirect } from "react-router";

export const db = new Database('db.sqlite', { fileMustExist:false });

export function runSql(sql:Statement, parameters:Record<string,any>, successUrl:string){
    const sqlResult = sql.run(parameters);
    if (sqlResult.changes === 1) return redirect(successUrl);
    else return redirect(`/error/SQL error in ${sql.raw} `)
}