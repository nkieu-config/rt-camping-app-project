import Link from "next/link";
import { Button } from "../ui/button";

function Logo() {
  return (
    <Button size="sm" asChild>
      <Link href="/" className="text-2xl">
        Logo
      </Link>
    </Button>
  );
}
export default Logo;
