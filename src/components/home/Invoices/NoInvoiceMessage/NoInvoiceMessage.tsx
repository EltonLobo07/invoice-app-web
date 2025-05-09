import Image from "next/image";
import { Message } from "@/components/general";
import AnnouncementImgData from "./announcement.png";
import { classJoin } from "@/utils/general";
import type { ResponsiveTextType } from "@/types/home";

type Props = {
  newInvoiceLinkText: ResponsiveTextType;
  description: React.ReactNode;
};

/*
  <span className="inline-block max-w-[13rem]">
    Create a new invoice by clicking the{" "}
    <strong>
      <ResponsiveText {...props.newInvoiceLinkText} />
    </strong>{" "}
    button and get started
  </span>
*/

export function NoInvoiceMessage(props: Props) {
  return (
    <Message
      headingLvl={3}
      title="There is nothing here"
      description={props.description}
      img={
        <Image
          src={AnnouncementImgData}
          alt="announcement"
          className={classJoin(
            "w-[195px] md:w-[241.34px]",
            "h-[160px] md:h-[200px]"
          )}
        />
      }
    />
  );
}
