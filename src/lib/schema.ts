import { z } from "zod"

const HeadingProps = z.object({
    text: z.string(),
})

const FormProps = z.object({
    fields: z.array(
        z.object({
            name: z.string(),
            label: z.string(),
            type: z.string(),
        })
    ),
})

const TableProps = z.object({
    columns: z.array(z.string()),
    data: z.array(z.record(z.string(), z.any())),
})

const ComponentSchema = z.discriminatedUnion("type", [
    z.object({
        id: z.string(),
        type: z.literal("heading"),
        props: HeadingProps,
    }),
    z.object({
        id: z.string(),
        type: z.literal("form"),
        props: FormProps,
    }),
    z.object({
        id: z.string(),
        type: z.literal("table"),
        props: TableProps,
    }),
])

export const PageSchema = z.object({
    title: z.string().optional(),
    components: z.array(ComponentSchema),
})

export type PageConfig = z.infer<typeof PageSchema>