import Image from "next/image";

export default function Logo({ width }:{width?:number}) {
  return (
    <div className="flex justify-center">
      <Image
        src="/dark.webp"
        className="rounded-badge"
        unoptimized
        alt="image"
        width={width || 200}
        quality={100}
        height={100}
      />
    </div>
  );
}
