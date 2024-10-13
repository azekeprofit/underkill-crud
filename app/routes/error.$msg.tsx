import type * as Route from "./+types.error.$msg";

export default function Error({ params: { msg } }: Route.ClientLoaderArgs) {
    return <div className="border-red-600 border-4 text-5xl">
        {msg??'Error'}
    </div>
}