import Image from "next/image";

export default function Logo({ size }:{size?:number}) {
  return (
    <div className="flex justify-center w-full h-full">
      <Image
        src="/dark.webp"
        className="rounded-badge w-auto h-auto"
        alt="image"
        width={size || 200}
        height={100}
        priority
        quality={100}
      />
    </div>
  );
}
