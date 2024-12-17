import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import Searchbar from "@/components/Searchbar";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <MaxWidthWrapper>
        <Searchbar />
      </MaxWidthWrapper>
    </div>
  );
}
