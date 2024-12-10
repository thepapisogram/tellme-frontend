import clsx from "clsx";

export default function ButtonFunction({
  text,
  icon,
  click,
  classes,
  alt
}: {
  text: string;
  icon: string;
  click: (event: React.MouseEvent<HTMLButtonElement>) => void;
  classes?: string,
  alt?: boolean
}) {
  return (
    <button onClick={click} className={clsx(
      `${classes}`,
      {
        "page-btn-alt": alt,
        "page-btn": !alt
      }
    )}>
      <i className={`flex items-center fi ${icon}`}></i>
      {text}
    </button>
  );
}
