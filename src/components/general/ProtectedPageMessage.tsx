import { type HeadingLvl } from "@/utils/general";
import { Message } from "./Message";
import { BtnLikeLink } from "./BtnLikeLink";

type Props = {
  headingLvl?: HeadingLvl;
};

export function ProtectedPageMessage(props: Props) {
  return (
    <Message
      title="This page is protected"
      description="You need to be logged in to view this page"
      action={<BtnLikeLink href="/login">Login page</BtnLikeLink>}
      headingLvl={props.headingLvl ?? 2}
      img={null}
      hFull={true}
    />
  );
}
