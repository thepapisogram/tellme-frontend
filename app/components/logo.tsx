import Image from "next/image";

export default function Logo({ size = 200 }:{size?:number}) {
  return (
    <div className={`flex justify-center w-full h-full`}>
      <Image
        src="/dark.webp"
        className="rounded-badge w-auto h-auto"
        alt="image"
        width={size || 200}
        height={size || 200}
        priority
      />
    </div>
  );
}