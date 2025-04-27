import { toast } from "sonner"

type ToastType = "success" | "error" | "info" | "warning"

interface ToastOptions {
  description?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

/**
 * Show a toast notification
 */
export function showToast(type: ToastType, title: string, options?: ToastOptions) {
  const { description, duration, action } = options || {}

  switch (type) {
    case "success":
      toast.success(title, {
        description,
        duration,
        action: action
          ? {
              label: action.label,
              onClick: action.onClick,
            }
          : undefined,
      })
      break
    case "error":
      toast.error(title, {
        description,
        duration,
        action: action
          ? {
              label: action.label,
              onClick: action.onClick,
            }
          : undefined,
      })
      break
    case "info":
      toast.info(title, {
        description,
        duration,
        action: action
          ? {
              label: action.label,
              onClick: action.onClick,
            }
          : undefined,
      })
      break
    case "warning":
      toast.warning(title, {
        description,
        duration,
        action: action
          ? {
              label: action.label,
              onClick: action.onClick,
            }
          : undefined,
      })
      break
    default:
      toast(title, {
        description,
        duration,
        action: action
          ? {
              label: action.label,
              onClick: action.onClick,
            }
          : undefined,
      })
  }
}

/**
 * Show a promise toast notification
 */
export function showPromiseToast<T>(
  promise: Promise<T>,
  messages: {
    loading: string
    success: string
    error: string
  },
  options?: {
    successDescription?: string
    errorDescription?: string
    duration?: number
  },
) {
  return toast.promise(promise, {
    loading: messages.loading,
    success: (data) => ({
      title: messages.success,
      description: options?.successDescription,
    }),
    error: (error) => ({
      title: messages.error,
      description: options?.errorDescription || error.message,
    }),
    duration: options?.duration,
  })
}
