import ProfileLink from "@/components/shared/ProfileLink";
import QuestionTab from "@/components/shared/QuestionTab";
import Stats from "@/components/shared/Stats";
import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/lib/actions/user.action";
import { getJoinedDate } from "@/lib/utils";
import { URLProps } from "@/types";
import { SignedIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import Image from "next/image";
import Link from "next/link";

const page = async ({ params, searchParams }: URLProps) => {
  const userInfo = await getUserInfo({ userId: params._id });
  const { userId: clerkId } = auth();

  return (
    <>
      <div className="flex justify-between max-sm:grid max-sm:place-content-center max-sm:gap-8">
        <div className="flex flex-col items-start gap-4 max-sm:items-center lg:flex-row">
          <Image
            src={userInfo?.user.picture}
            alt="profile picture"
            width={140}
            height={140}
            className="rounded-full object-cover"
          />

          <div className="mt-3 max-sm:flex max-sm:flex-col max-sm:gap-2">
            <h2 className="h2-bold text-dark100_light900 max-sm:text-center">
              {userInfo.user.name}
            </h2>
            <p className="paragraph-regular text-dark200_light800 max-sm:text-center">
              @{userInfo.user.username}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {userInfo.user.location && (
                <ProfileLink
                  imgURL="/assets/icons/location.svg"
                  title={userInfo.user.location}
                />
              )}
              {userInfo.user.portfolioWebsite && (
                <ProfileLink
                  imgURL="/assets/icons/link.svg"
                  title="Portfolio"
                  href={userInfo.user.portfolioWebsite}
                />
              )}
              <ProfileLink
                imgURL="/assets/icons/calendar.svg"
                title={getJoinedDate(userInfo.user.joinedAt)}
              />
            </div>
            {userInfo.user.bio && (
              <p className="paragraph-regular max-sm:mb-5 max-sm:w-full sm:mt-3">
                {userInfo.user.bio}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {clerkId === userInfo.user.clerkId && (
              <Link href="/profile/edit">
                <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>
      <Stats
        totalQuestions={userInfo.totalQuestions}
        totalAnswers={userInfo.totalAnswers}
      />
      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger value="top-posts" className="tab">
              <QuestionTab />
            </TabsTrigger>
            <TabsTrigger value="answers" className="tab">
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts">POSTS</TabsContent>
          <TabsContent value="answers">ANSWERS</TabsContent>
        </Tabs>
      </div>
    </>
  );
};
export default page;
