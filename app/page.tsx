import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import Searchbar from "@/components/Searchbar";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <MaxWidthWrapper className="flex-grow">
        <Searchbar />
      </MaxWidthWrapper>
      <MaxWidthWrapper>
        <div className="flex h-20 items-center">
          <div className="text-xs text-muted-foreground">
            <a href="/privacy-policy">privacy policy</a> -{" "}
            <a href="/user-agreement">user agreement</a>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
