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
          'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all disabled:pointer-events-none disabled:opacity-50',
          size === 'sm' && 'h-9 px-3.5 text-sm',
          size === 'md' && 'h-10 px-5 text-sm',
          size === 'lg' && 'h-12 px-6 text-[15px]',
          variant === 'primary' &&
            'bg-accent text-accent-fg shadow-sm hover:opacity-90',
          variant === 'secondary' &&
            'border border-border-strong bg-surface text-text shadow-sm hover:bg-bg-elevated',
          variant === 'ghost' && 'text-text-muted hover:bg-bg-elevated hover:text-text',
          variant === 'danger' && 'bg-danger/10 text-danger hover:bg-danger/15',
          className,
        )}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'
