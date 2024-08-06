
import logo from '@/assets/lifeChangerLogo.png';
import Image from 'next/image';
import Link from 'next/link';
export const LifeChangerLink = () => {

  return (
    <Link
      href="#"
      className="group flex h-9 w-9 flex-start shrink-0 justify-center items-center  md:h-16 md:w-16 md:text-base"
    >
      <Image src={logo.src} className="w-full transition-all group-hover:scale-110" alt="LifeChanger" width={40}
        height={40} />
      <span className="sr-only">Acme Inc</span>
    </Link >
  );
};