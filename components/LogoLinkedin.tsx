import Image from 'next/image';
import LogoLinkedinSvg from '@/assets/logo_linkedin.svg';

export default function LogoLinkedin() {
    return (
        <Image
            src={LogoLinkedinSvg}
            alt="LinkedIn"
            className="dark:invert-0"
            width={20}
            height={20}
        />
    );
}
