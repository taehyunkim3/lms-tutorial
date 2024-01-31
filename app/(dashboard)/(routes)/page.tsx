import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="p-8">
      <h1>hello world~</h1>
      <Button variant={"default"}>button sample</Button>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
