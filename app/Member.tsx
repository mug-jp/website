import Image, { StaticImageData } from 'next/image';
import { Link } from 'next-view-transitions';
import LogoX from '@/components/LogoX';
import LogoGithub from '@/components/LogoGithub';

type Props = {
    name: string;
    xUrl: string;
    githubUrl: string;
    icon: StaticImageData;
};

export default function Member({ name, icon, xUrl, githubUrl }: Props) {
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
            </div>
        </div>
    );
}
