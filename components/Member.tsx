import LogoX from '@/components/LogoX';
import LogoGithub from '@/components/LogoGithub';
import LogoLinkedin from '@/components/LogoLinkedin';

type Props = {
    name: string;
    xUrl: string;
    githubUrl: string;
    linkedinUrl: string;
    icon: string;
};

export default function Member({ name, icon, xUrl, githubUrl, linkedinUrl }: Props) {
    return (
        <div className="flex flex-col justify-center items-center space-y-2">
            <img
                src={icon}
                alt={name}
                className="rounded-full"
                width={200}
                height={200}
            />
            <span className="font-semibold text-sm md:text-base">{name}</span>
            <div className="flex gap-4">
                <a href={xUrl}>
                    <LogoX />
                </a>
                <a href={githubUrl}>
                    <LogoGithub />
                </a>
                <a href={linkedinUrl}>
                    <LogoLinkedin />
                </a>
            </div>
        </div>
    );
}
