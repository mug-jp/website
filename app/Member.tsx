import Image, { StaticImageData } from 'next/image';
import { Link } from 'next-view-transitions';
import LogoX from '@/components/LogoX';
import LogoGithub from '@/components/LogoGithub';
import LogoLinkedin from '@/components/LogoLinkedin';

type Props = {
    name: string;
    xUrl: string;
    githubUrl: string;
    linkedinUrl: string;
    icon: StaticImageData;
};

export default function Member({ name, icon, xUrl, githubUrl, linkedinUrl }: Props) {
    return (
        <div className="flex flex-col justify-center items-center space-y-2">
            <Image
                src={icon}
                alt={name}
                className="rounded-full"
                height={200}
            />
            <span className="font-semibold text-sm md:text-base">{name}</span>
            <div className="flex gap-4">
                <Link href={xUrl}>
                    <LogoX />
                </Link>
                <Link href={githubUrl}>
                    <LogoGithub />
                </Link>
                <Link href={linkedinUrl}>
                    <LogoLinkedin />
                </Link>
            </div>
        </div>
    );
}
