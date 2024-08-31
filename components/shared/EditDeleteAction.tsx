"use client";
import { toast } from "@/hooks/use-toast";
import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  type: string;
  itemId: string;
}

const EditDeleteAction = ({ type, itemId }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/question/edit/${JSON.parse(itemId)}`);
  };
  const handleDelete = async () => {
    if (type === "Question") {
      // Delete question
      await deleteQuestion({ questionId: JSON.parse(itemId), path: pathname });
      return toast({
        title: "Question Deleted",
        description: "You have successfully deleted this question!",
        variant: "default",
      });
    } else if (type === "Answer") {
      await deleteAnswer({
        answerId: JSON.parse(itemId),
        path: pathname,
      });
      return toast({
        title: "Answer Deleted",
        description: "You have successfully deleted this answer!",
        variant: "default",
      });
    }
  };

  return (
    <div className="flex items-center justify-end gap-3 max-[550px]:self-end">
      {type === "Question" && (
        <Image
          src="/assets/icons/edit.svg"
          alt="Edit"
          width={20}
          height={20}
          className="cursor-pointer object-contain"
          onClick={handleEdit}
        />
      )}
      <Image
        src="/assets/icons/trash.svg"
        alt="Edit"
        width={20}
        height={20}
        className="cursor-pointer object-contain"
        onClick={handleDelete}
      />
    </div>
  );
};
export default EditDeleteAction;
