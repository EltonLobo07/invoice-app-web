import Image from "next/image";
import { Message } from "@/components/general";
import AnnouncementImgData from "./announcement.png";
import { classJoin } from "@/utils/general";

type Props = {
  description: React.ReactNode;
};

export function NoResourceMessage(props: Props) {
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
