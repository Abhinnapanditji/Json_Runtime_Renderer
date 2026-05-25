export function DynamicForm({ fields }: any) {
    const safeFields = Array.isArray(fields) ? fields : []

    return (
        <form className="space-y-4 bg-[#111827] border border-gray-800 p-4 rounded-lg">
            {safeFields.map((field: any, i: number) => (
                <div key={field?.name || i}>
                    <label className="block text-sm text-gray-300 mb-1">
                        {field?.label ?? "Field"}
                    </label>

                    <input
                        type={field?.type ?? "text"}
                        className="w-full text-sm bg-[#0b0f14] border border-gray-700 text-gray-200 rounded-md p-2"
                    />
                </div>
            ))}
        </form>
    )
}