"use client";
import { Button } from "../ui/button";

export default function WebsiteLinks({ links, theme }: any) {
  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      {links?.map((link: any, i: number) => {
        const borderRadius =
          theme?.buttonShape === "pill"
            ? "9999px"
            : theme?.buttonShape === "rounded"
            ? "0.5rem"
            : "0";

        return (
          <Button
            key={i}
            className="w-full min-h-[48px] max-w-md p-0"
            style={{
              backgroundColor: theme?.buttonColor,
              color: theme?.textColor,
              borderColor: theme?.buttonBorderColor || "transparent",
              borderWidth: theme?.buttonBorderColor ? 1 : 0,
              borderStyle: "solid",
              borderRadius,
            }}
            onClick={() => window.open(link.url, "_blank")}
          >
            <div className="flex items-center w-full px-2 py-3">
              {link.header_image_url && (
                <img
                  src={link.header_image_url}
                  alt="icon"
                  width={25}
                  height={25}
                  className={`object-contain shrink-0 ${
                    theme?.buttonShape === "pill"
                      ? "rounded-full"
                      : theme?.buttonShape === "rounded"
                      ? "rounded-sm"
                      : ""
                  }`}
                />
              )}
              <span className="flex-1 text-sm leading-snug text-center break-words">
                {link.title}
              </span>
            </div>
          </Button>
        );
      })}
    </div>
  );
}
