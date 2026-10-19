import LogoGithubSvg from '@/assets/logo_github.svg';

export default function LogoGithub() {
    return (
        <img
            src={LogoGithubSvg}
            alt="GitHub"
            className="invert dark:invert-0"
            width={20}
            height={20}
        />
    );
}
