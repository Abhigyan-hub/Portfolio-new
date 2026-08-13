import { cn } from '@/lib/utils'

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded border border-border bg-accent-dim px-2 py-0.5 font-mono text-[11px] text-accent',
        className,
      )}
    >
      {children}
    </span>
  )
}
