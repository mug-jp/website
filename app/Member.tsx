import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
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
                height={240}
            />
            <span className="font-semibold text-sm">{name}</span>
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
