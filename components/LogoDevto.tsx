import LogoDevtoSvg from '@/assets/logo_devto.svg';

export default function LogoDevto() {
    return (
        <img
            src={LogoDevtoSvg}
            alt="Devto"
            className="invert-0 dark:invert"
            width={20}
            height={20}
        />
    );
}
