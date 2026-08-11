import Image, { type StaticImageData } from 'next/image';
import type { ReactNode } from 'react';

type Props = {
  title: string;
  subtitle?: string;
  date?: string;
  href: string;
  imageSrc?: StaticImageData;
  icon?: ReactNode;
};

export function LabCard({
  title,
  subtitle,
  date,
  href,
  imageSrc,
  icon,
}: Props) {
  return (
    <a
      href={href}
      className="flex flex-col h-96 w-64 rounded-xl bg-gradient-to-br from-indigo-400 to-violet-400 p-4 shadow-lg overflow-hidden group"
    >
      <div className="relative w-full aspect-square rounded-md overflow-hidden bg-white/20">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
            sizes="256px"
          />
        ) : null}
      </div>
      <div className="flex flex-col gap-0 mt-4 text-white">
        <h2 className="text-xl font-semibold tracking-tight leading-tight">
          {title}
        </h2>
        {subtitle ? (
          <p className="text-sm text-white/90 font-mono">{subtitle}</p>
        ) : null}
      </div>
      <div className="mt-auto flex justify-between items-center text-white">
        {date ? (
          <span className="text-[0.6rem] font-medium px-2 py-[3px] border-white/70 text-white/90 border-[1px] rounded-sm">
            {date}
          </span>
        ) : (
          <span />
        )}
        {icon ? <span className="w-6 opacity-90">{icon}</span> : null}
      </div>
    </a>
  );
}
