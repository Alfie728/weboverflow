import Link from "next/link";
import Image from "next/image";
import { getTopInteractedTags } from "@/lib/actions/tag.action";
import { Badge } from "../ui/badge";
import RenderTag from "../shared/RenderTag";

interface Props {
  user: {
    _id: string;
    clerkId: string;
    picture: string;
    name: string;
    username: string;
  };
}

const UserCard = async ({ user }: Props) => {
  const interactedTags = await getTopInteractedTags({ userId: user._id });
  return (
    <article className=" w-full ">
      <div
        className="background-light900_dark200 
          flex w-full flex-col items-center justify-center 
          rounded-2xl border px-4 py-8 
          transition hover:scale-105 hover:bg-light-800 hover:shadow-xl dark:border-dark-400 dark:hover:bg-dark-400"
      >
        <Link
          href={`/profile/${user.clerkId}`}
          className="shadow-light100_darknone rounded-full"
        >
          <Image
            src={user.picture}
            alt="user profile picture"
            width={100}
            height={100}
            className="rounded-full"
          />
        </Link>

        <div className="mt-4 text-center">
          <h3 className="h3-bold text-dark200_light900 line-clamp-1">
            {user.name === "null" ? user.username : user.name}
          </h3>
          <p className="body-regular text-dark500_light500 mt-2">
            @{user.username}
          </p>
        </div>

        <div className="mt-5">
          {interactedTags.length > 0 ? (
            <div className="flex items-center justify-center gap-2">
              {interactedTags.map((tag) => (
                <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
              ))}
            </div>
          ) : (
            <Badge>No tags yet</Badge>
          )}
        </div>
      </div>
    </article>
  );
};
export default UserCard;
