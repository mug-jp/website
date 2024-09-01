import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import DayjournalIcon from '@/assets/dayjournal.jpg';
import LogoX from '@/assets/logo_x.svg';
import LogoGithub from '@/assets/logo_github.svg';

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
            <span className="font-semibold">{name}</span>
            <div className="flex space-x-2">
                <Link href={xUrl}>
                    <Image src={LogoX} alt="X" width={20} height={20} />
                </Link>
                <Link href={githubUrl}>
                    <Image
                        src={LogoGithub}
                        alt="GitHub"
                        width={20}
                        height={20}
                    />
                </Link>
            </div>
        </div>
    );
}
