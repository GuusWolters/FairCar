import { buttonVariants } from "@repo/ui/components/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PageTopProps {
  title: string;
  rightMenu?: React.ReactNode;
  button?: {
    text: string;
    link: string;
  };
}

export function PageTop({ title, button, rightMenu }: PageTopProps) {
  return (
    <div className="bg-primary min -mt-14 h-[15vh] min-h-80 w-full">
      <div className="container m-auto h-full flex items-end justify-between">
        <div>
          {button && (
            <Link
              href={button?.link}
              className={buttonVariants({
                size: "sm",
                variant: "link",
                className: "text-white mb-2 -ml-3",
              })}
            >
              <ArrowLeft className="w-5 h-5" />
              {button.text}
            </Link>
          )}
          <h1 className="h1 text-background">{title}</h1>
        </div>
        {rightMenu}
      </div>
    </div>
  );
}
