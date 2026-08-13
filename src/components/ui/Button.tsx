import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
          size === 'sm' && 'h-8 px-3 text-sm',
          size === 'md' && 'h-10 px-4 text-sm',
          size === 'lg' && 'h-12 px-6 text-base',
          variant === 'primary' &&
            'bg-accent text-accent-fg hover:brightness-110',
          variant === 'secondary' &&
            'border border-border-strong bg-surface text-text hover:border-accent hover:text-accent',
          variant === 'ghost' && 'text-text-muted hover:bg-surface hover:text-text',
          variant === 'danger' && 'bg-danger/15 text-danger hover:bg-danger/25',
          className,
        )}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'
