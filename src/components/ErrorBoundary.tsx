// components/ErrorBoundary.tsx
'use client'

import { Component, ErrorInfo, ReactNode } from 'react'
import CameraCapture from './CameraCapture'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Camera Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-center">
          <h3 className="text-lg font-bold">Camera Error</h3>
          <p className="text-sm">Please refresh the page and allow camera access</p>
        </div>
      )
    }

    return this.props.children
  }
}

// Wrap your CameraCapture component:
<ErrorBoundary>
  <CameraCapture />
</ErrorBoundary>