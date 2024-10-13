import { valibotResolver } from "@hookform/resolvers/valibot";
import { useCallback, useRef, type JSX } from "react";
import { useForm, type DefaultValues, type FieldErrors, type FieldValues, type GlobalError, type Path, type RegisterOptions } from "react-hook-form";
import { Form } from "react-router";
import type { InferInput, ObjectEntries, ObjectSchema } from "valibot";


function fieldError<T extends FieldValues, Keys extends keyof FieldErrors<T>>(errors: FieldErrors<T>, serverErrors?: FieldErrors<T>) {
    return (name: Keys) => {
        const error = errors[name] || serverErrors?.[name];
        return error ? <label htmlFor={name as string}>{error?.message as string}</label> : null;
    }
}

export function useFormValibot<Schema extends ObjectSchema<ObjectEntries, undefined>, Type extends InferInput<Schema>>(
    data: Type,
    schema: Schema,
    serverErrors?: FieldErrors<Type>) {
    const formObj = useForm<Type>({ defaultValues: data as DefaultValues<Type>, resolver: valibotResolver(schema) })
    const register = (name: Path<Type>, options?: RegisterOptions<Type, Path<Type>>) => ({ id: name, ...formObj.register(name, options) })
    return { ...formObj, register, fieldError: fieldError(formObj.formState.errors, serverErrors) }
}

export function FormValibot<Schema extends ObjectSchema<ObjectEntries, undefined>, Type extends InferInput<Schema>>
    ({ data, schema, fields, serverErrors }: {
        data: Type,
        schema: Schema,
        serverErrors?: FieldErrors<Type>,
        fields: (formObj: ReturnType<typeof useFormValibot<Schema, Type>>) => JSX.Element
    }) {
    const form = useRef<HTMLFormElement>(null!);
    const submit = useCallback(() => form.current.submit(), [form.current]);
    const formObj = useFormValibot(data, schema, serverErrors);
    return <Form method="post" ref={form} onSubmit={formObj.handleSubmit(submit)}>{fields(formObj)}</Form>
}