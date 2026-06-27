import { createContext, useCallback, useContext, useState } from 'react'
import { CheckCircleIcon, InfoIcon, WarningIcon, XCircleIcon } from '@phosphor-icons/react'
import { cn } from '@utils/cn'

type ToastTone = 'success' | 'info' | 'warning' | 'danger'
type Toast = { id: number; message: string; tone: ToastTone }

const icons = {
  success: { Icon: CheckCircleIcon, color: 'text-success' },
  info: { Icon: InfoIcon, color: 'text-violet-300' },
  warning: { Icon: WarningIcon, color: 'text-warning' },
  danger: { Icon: XCircleIcon, color: 'text-danger' },
}

const ToastContext = createContext<
  ((message: string, tone?: ToastTone) => void) | null
>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>')
  return ctx
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Array<Toast>>([])

  const toast = useCallback((message: string, tone: ToastTone = 'success') => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, message, tone }])
    setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      3200,
    )
  }, [])

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed bottom-6 right-6 z-[400] flex flex-col gap-2.5">
        {toasts.map(({ id, message, tone }) => {
          const { Icon, color } = icons[tone]
          return (
            <div
              key={id}
              role="status"
              className="flex items-center gap-2.5 rounded-xl border border-line-strong bg-surface px-4 py-3 text-sm text-ink shadow-2 [animation:nocturne-fade-in_0.3s_ease]"
            >
              <Icon size={18} className={cn(color)} />
              {message}
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}
