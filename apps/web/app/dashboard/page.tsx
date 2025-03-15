import GenerateImage from "@/components/GenerateImage";
import Link from "next/link";
import {MoveDown} from "lucide-react"

export default function Dashboard() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="p-4 bg-muted/50 rounded">
        <div className="flex flex-col gap-2">
          <p>Create Your First AI image in Three steps (with Model)</p>
          <p>
            1: Create Your Model
            <Link
              className="underline text-xs text-blue-700"
              href={"/dashboard/train"}
            >
              Go
            </Link>
          </p>
          <p>2 : Write your Prompt </p>
          <p>3 : Click on Generate</p>
          <p>
            4 : Create From Pack{" "}
            <Link
              className="underline text-xs text-blue-700"
              href={"/dashboard/packs"}
            >
              Go
            </Link>
          </p>
          <p>or</p>
          <p className="flex gap-2">Write a prompt in the bottom box and click on generate <MoveDown width={20}/></p>
        </div>
      </div>
      <div className="min-h-[60vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
        <GenerateImage />
      </div>
    </div>
  );
}
