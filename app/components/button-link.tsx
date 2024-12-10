import Link from "next/link";

export default function ButtonLink({ link, text, icon, classes }:{link:string, text:string, icon:string, classes?:string}) {
  return (
    <Link href={link} className={`page-btn ${classes}`}>
      <i className={`flex items-center fi ${icon}`}></i>
      {text}
    </Link>
  );
}
