"use client"

import { useState, useRef } from "react"
import clsx from "clsx"

interface FileUploadProps {
  onFileSelect: (file: File) => void
  onFileUpload?: (dataUrl: string) => void // Keep for backward compatibility but make optional
  isLoading?: boolean
  accept?: string
  className?: string
}

export function FileUpload({
  onFileSelect,
  onFileUpload,
  isLoading = false,
  accept = "image/*",
  className
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    setSelectedFile(file)
    onFileSelect(file)

    // Keep backward compatibility with data URL callback if provided
    if (onFileUpload) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string
        onFileUpload(dataUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  return (
    <div className={clsx(className)}>
      <div
        className={clsx("relative border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer",
          dragActive ? "border-btn-primary bg-light-bg-three dark:bg-dark-bg-two" : "border-light-border dark:border-dark-border",
          "hover:border-btn-primary hover:bg-light-bg-three dark:hover:bg-dark-bg-two",
          isLoading && "opacity-50 pointer-events-none"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !isLoading && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          multiple={false}
          className="hidden"
          accept={accept}
          onChange={handleChange}
          disabled={isLoading}
        />

        <div className="space-y-4">
          {selectedFile ? (
            <div className="space-y-2">
              <div className="text-green-600 dark:text-green-400 text-lg">✓</div>
              <div className="text-sm font-medium text-text-primary dark:text-white">
                {selectedFile.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-main-text">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • {selectedFile.type}
              </div>
            </div>
          ) : (
            <>
              <div className="text-4xl text-gray-400 dark:text-gray-600">📅</div>
              <div className="space-y-2">
                <div className="text-lg font-medium text-text-primary dark:text-white">
                  Upload Schedule Image
                </div>
                <div className="text-sm text-gray-500 dark:text-main-text">
                  Drag and drop your work schedule here, or{" "}
                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="text-btn-primary hover:text-btn-secondary font-medium"
                    disabled={isLoading}
                  >
                    browse files
                  </button>
                </div>
              </div>
            </>
          )}

          {isLoading && (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-btn-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm text-text-primary dark:text-main-text">
                Analyzing schedule...
              </span>
            </div>
          )}
        </div>

        {selectedFile && !isLoading && (
          <button
            type="button"
            onClick={() => {
              setSelectedFile(null)
              if (inputRef.current) {
                inputRef.current.value = ''
              }
            }}
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300"
          >
            ×
          </button>
        )}
      </div>
    </div>
  )
} 