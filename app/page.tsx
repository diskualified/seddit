import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <p>Welcome to Seddit</p>
      <Link href="/login" className="btn">Login</Link>
    </main>
    
  );
}
