"use client"

import { Heading } from "../ui/Heading"
import { DynamicForm } from "../form/DynamicForm"
import { DynamicTable } from "../table/DynamicTable"
import { UnknownComponent } from "../fallback/UnknownComponent"
import { ErrorBoundary } from "../common/ErrorBoundary"

const registry: any = {
    heading: Heading,
    form: DynamicForm,
    table: DynamicTable,
}

const normalizeArray = (val: any) =>
    Array.isArray(val) ? val : []

export function RuntimeRenderer({ config }: any) {
    return (
        <div className="space-y-6">
            {(config?.components ?? []).map((item: any) => {
                const Component = registry[item.type]

                if (!Component) {
                    return (
                        <UnknownComponent
                            key={item.id}
                            type={item.type}
                        />
                    )
                }

                return (
                    <ErrorBoundary key={item.id} >
                    <Component
                        key={item.id}
                        {...item.props}
                    />
                    </ErrorBoundary>
                )
            })}
        </div>
    )
}