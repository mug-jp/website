import LogoX from '@/components/LogoX';
import LogoGithub from '@/components/LogoGithub';
import LogoLinkedin from '@/components/LogoLinkedin';

type Props = {
    name: string;
    caption: string;
    founding?: boolean;
    xUrl: string;
    githubUrl: string;
    linkedinUrl: string;
    icon: string;
};

export default function Member({
    name,
    caption,
    founding = false,
    icon,
    xUrl,
    githubUrl,
    linkedinUrl,
}: Props) {
    return (
        <div className="flex flex-col justify-center items-center space-y-2 text-center">
            <img
                src={icon}
                alt={name}
                className="rounded-full object-cover border border-gray-500/45 w-32 h-auto md:w-40"
                width={160}
                height={160}
            />
            <div className="flex flex-col items-center gap-0.5">
                <span className="font-semibold text-sm md:text-base">
                    {name}
                </span>
                <span
                    className={`text-[11px] md:text-xs tracking-wider whitespace-nowrap ${
                        founding
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-gray-500 dark:text-gray-400'
                    }`}
                >
                    {caption}
                </span>
            </div>
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
