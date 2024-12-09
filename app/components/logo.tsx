import Image from "next/image";

export default function Logo({ width }:{width?:number}) {
  return (
    <div className="flex justify-center">
      <Image
        src="/dark.png"
        className="rounded-badge"
        unoptimized
        alt="image"
        width={width || 200}
        height={100}
      />
    </div>
  );
}
