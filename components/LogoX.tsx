import Image from 'next/image';
import LogoXSvg from '@/assets/logo_x.svg';

export default function LogoGithub() {
    return (
        <Image
            src={LogoXSvg}
            alt="X"
            className="invert dark:invert-0"
            width={20}
            height={20}
        />
    );
}
