import Image from "next/image";

export default function Logo({ size }:{size?:number}) {
  return (
    <div className="flex justify-center w-full h-full">
      <Image
        src="/dark.webp"
        className="rounded-badge"
        alt="image"
        width={size || 200}
        height={size || 200}
        priority
        quality={100}
      />
    </div>
  );
}