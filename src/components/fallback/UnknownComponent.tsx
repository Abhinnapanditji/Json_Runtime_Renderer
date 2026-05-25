export function UnknownComponent({ type, error }: any) {
    return (
        <div className="border border-red-500/40 bg-red-500/10 text-red-300 p-3 rounded-lg">
            <p>Unknown component: <b>{type}</b></p>

            {error && (
                <pre className="text-xs mt-2 opacity-70">
          {JSON.stringify(error, null, 2)}
        </pre>
            )}
        </div>
    )
}