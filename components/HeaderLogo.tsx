import Link from "next/link";
import Image from "next/image";

export const HeaderLogo =() => {
  return (
    <Link href="/">
      <div className="items-center hidden lg:flex cursor-pointer">  
        <Image
          src="/logo.svg"
          alt="Logo"
          width={28}
          height={28}
        />
        <p className="font-bold text-white text-2xl ml-2.5">
          Finance
        </p>
      </div>
    </Link>
  )
}