"use client"

import React from "react"

export class ErrorBoundary extends React.Component<
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
                <div className="border border-red-500 bg-red-500/10 text-red-300 p-3 rounded">
                    Component failed safely (no crash)
                </div>
            )
        }

        return this.props.children
    }
}