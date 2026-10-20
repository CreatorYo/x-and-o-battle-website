import Image from "next/image";
import { cn } from "@/lib/utils";

type IPhoneProps = {
  src: string;
  alt: string;
  sizes: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  className?: string;
};

export function IPhone({ src, alt, sizes, loading, fetchPriority, className }: IPhoneProps) {
  return (
    <span className={cn("@container block", className)}>
      <span className="relative block rounded-[16.6cqw] bg-[linear-gradient(145deg,#6b6b72_0%,#2a2a2e_22%,#1a1a1d_50%,#2c2c30_78%,#5d5d64_100%)] p-[0.85cqw] shadow-[0_3cqw_6cqw_-2cqw_rgba(0,0,0,0.28),0_10cqw_18cqw_-8cqw_rgba(0,0,0,0.35)]">
        <span className="absolute -left-[0.55cqw] top-[22cqw] h-[6.5cqw] w-[0.7cqw] rounded-l-[0.4cqw] bg-[#3a3a3f]" />
        <span className="absolute -left-[0.55cqw] top-[33cqw] h-[11cqw] w-[0.7cqw] rounded-l-[0.4cqw] bg-[#3a3a3f]" />
        <span className="absolute -left-[0.55cqw] top-[46.5cqw] h-[11cqw] w-[0.7cqw] rounded-l-[0.4cqw] bg-[#3a3a3f]" />
        <span className="absolute -right-[0.55cqw] top-[38cqw] h-[17cqw] w-[0.7cqw] rounded-r-[0.4cqw] bg-[#3a3a3f]" />

        <span className="block rounded-[15.8cqw] bg-black p-[2.7cqw] shadow-[inset_0_0_0_0.25cqw_rgba(255,255,255,0.06)]">
          <span className="relative block aspect-[640/1387] overflow-hidden rounded-[13.1cqw] bg-black">
            <Image
              src={src}
              alt={alt}
              fill
              sizes={sizes}
              loading={loading}
              fetchPriority={fetchPriority}
              draggable="false"
              className="object-cover"
            />
            <span className="absolute left-1/2 top-[2.7cqw] h-[8.6cqw] w-[29cqw] -translate-x-1/2 rounded-full bg-black" />
          </span>
        </span>
      </span>
    </span>
  );
}
