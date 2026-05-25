export function DynamicTable({ columns, data }: any) {
    const safeColumns = Array.isArray(columns) ? columns : []
    const safeData = Array.isArray(data) ? data : []

    if (!safeColumns.length) {
        return (
            <div className="text-yellow-400 border border-yellow-500 p-3 rounded">
                Invalid table configuration
            </div>
        )
    }

    return (
        <div className="overflow-hidden rounded-lg border border-gray-800 bg-[#111827]">
            <table className="w-full text-sm text-gray-200">
                <thead>
                <tr>
                    {safeColumns.map((col: string) => (
                        <th key={col} className="p-3 text-left text-gray-400">
                            {col}
                        </th>
                    ))}
                </tr>
                </thead>

                <tbody>
                {safeData.map((row: any, i: number) => (
                    <tr key={i} className="border-t border-gray-800">
                        {safeColumns.map((col: string) => (
                            <td key={col} className="p-3">
                                {row?.[col] ?? "-"}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}