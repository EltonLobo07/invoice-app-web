import Image from "next/image";
import { Message } from "@/components/general";
import AnnouncementImgData from "./announcement.png";
import { classJoin, type HeadingLvl } from "@/utils/general";

type Props = {
  headingLvl?: HeadingLvl;
  description: React.ReactNode;
};

export function NoResourceMessage(props: Props) {
  return (
    <Message
      headingLvl={props.headingLvl ?? 3}
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
