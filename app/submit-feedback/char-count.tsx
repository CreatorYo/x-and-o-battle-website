import { cn } from "@/lib/utils";

export function CharCount({ length, max, warnAt }: { length: number; max: number; warnAt: number }) {
  return (
    <span
      className={cn(
        "text-xs leading-none tabular-nums",
        length >= max
          ? "text-red-600 dark:text-red-400"
          : length >= warnAt
            ? "text-orange-600 dark:text-yellow-500"
            : "text-muted-foreground"
      )}
    >
      {length}/{max}
    </span>
  );
}
