"use client"

import { useState, Component } from "react"
import { RuntimeRenderer } from "../components/renderer/RuntimeRenderer"
import { PageSchema } from "../lib/schema"

const defaultJSON = `{
  "title": "Demo App",
  "components": [
    {
      "id": "1",
      "type": "heading",
      "props": {
        "text": "Welcome"
      }
    },
    {
      "id": "2",
      "type": "form",
      "props": {
        "fields": [
          {
            "name": "email",
            "label": "Email",
            "type": "text"
          }
        ]
      }
    },
    {
      "id": "3",
      "type": "table",
      "props": {
        "columns": ["name", "email"],
        "data": [
          {
            "name": "John",
            "email": "john@example.com"
          },
          {
            "name": "Jane",
            "email": "jane@example.com"
          }
        ]
      }
    }
  ]
}`

export default function Page() {
    const [text, setText] = useState(defaultJSON)
    const [config, setConfig] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)

    const [loading, setLoading] = useState(false)

    class ErrorBoundary extends Component<
        { children: React.ReactNode },
        { hasError: boolean }
    > {
        constructor(props: any) {
            super(props)
            this.state = { hasError: false }
        }

        static getDerivedStateFromError() {
            return { hasError: true }
        }

        render() {
            if (this.state.hasError) {
                return (
                    <div className="p-3 border border-red-500 text-red-400">
                        Component crashed safely
                    </div>
                )
            }

            return this.props.children
        }
    }
    const handleChange = (val: string) => {
        setText(val)

        try {
            const parsed = JSON.parse(val)

            const result = PageSchema.safeParse(parsed)

            if (!result.success) {
                setError("Invalid schema (rendering with fallback)")
                setConfig(parsed) // STILL pass raw data to renderer
                return
            }

            setConfig(result.data)
            setError(null)
        } catch (e: any) {
            setError(e.message)
            setConfig(null)
        }
    }

    return (
        <div className="min-h-screen bg-[#0b0f14] text-gray-100 p-3 sm:p-6">

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-white">
                    JSON Runtime Builder
                </h1>
                <p className="text-gray-400 text-sm">
                    Live schema-driven UI renderer
                </p>
            </div>

            {/* Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* LEFT: Editor */}
                <div className="order-last lg:order-none bg-[#111827] border border-gray-800 rounded-xl p-4 min-w-0">

                    <div className="flex justify-between items-center mb-3">
                        <h2 className="font-semibold text-gray-700">
                            JSON Editor
                        </h2>

                        {error && (
                            <span className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded">
                Invalid JSON
              </span>
                        )}
                    </div>

                    <textarea
                        className="w-full h-[600px] bg-[#0b0f14] border border-gray-800 rounded-lg p-3 font-mono text-sm text-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
                        value={text}
                        onChange={(e) => handleChange(e.target.value)}
                    />

                    {error && (
                        <div className="mt-3 text-sm text-red-600 bg-red-50 p-2 rounded">
                            {error}
                        </div>
                    )}
                </div>

                {/* RIGHT: Preview */}
                <div className="order-first lg:order-none bg-[#111827] border border-gray-800 rounded-xl p-4 min-w-0">

                    <h2 className="font-semibold text-gray-700 mb-3">
                        Live Preview
                    </h2>

                    <div className="rounded-lg p-4 bg-[#0b0f14] border border-gray-800 min-h-[600px]">
                        {config ? (
                            <RuntimeRenderer config={config} />
                        ) : (
                            <div className="text-gray-400 text-sm">
                                Fix JSON to see preview
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}