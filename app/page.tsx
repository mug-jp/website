import DayjournalIcon from '@/assets/dayjournal.jpg';
import KiguchiIcon from '@/assets/kiguchi.jpg';
import MugjpLLogo from '@/assets/mugjp.png';
import Member from './Member';
import Image from 'next/image';
import Link from 'next/link';
import LogoGithub from '@/assets/logo_github.svg';
import LogoConnpass from '@/assets/logo_connpass.png';
import LogoQiita from '@/assets/logo_qiita.png';

export default function About() {
    return (
        <main className="p-8 space-y-20">
            <div className="flex flex-col items-center justify-center gap-2">
                <Image
                    src={MugjpLLogo}
                    alt="MapLibre User Group Japan"
                    className="rounded-md"
                    width={480}
                />
                <div className="w-80% md:w-[480px] text-center">
                    MapLibre User Group Japan (MUG-JP) is founded to popularize
                    MapLibre Ecosystem in Japan in 2023.
                </div>
                <div className="flex gap-4 justify-center items-center">
                    <Link href="https://www.github.com/mug-jp">
                        <Image
                            src={LogoGithub}
                            alt="GitHub"
                            width={20}
                            height={20}
                        />
                    </Link>
                    <Link href="https://mug-jp.connpass.com/">
                        <Image
                            src={LogoConnpass}
                            alt="Connpass"
                            width={24}
                            height={24}
                        />
                    </Link>
                    <Link href="https://qiita.com/organizations/mug-jp">
                        <Image
                            src={LogoQiita}
                            alt="Qiita"
                            width={20}
                            height={20}
                        />
                    </Link>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-8">
                <h1 className="text-4xl font-bold">Member</h1>
                <div className="grid grid-cols-2 gap-8">
                    <Member
                        name="Yasunori Kirimoto"
                        icon={DayjournalIcon}
                        xUrl="https://x.com/dayjournal_nori"
                        githubUrl="https://github.com/dayjournal"
                    />
                    <Member
                        name="Kanahiro Iguchi"
                        icon={KiguchiIcon}
                        xUrl="https://x.com/kanahiro_iguchi"
                        githubUrl="https://github.com/Kanahiro"
                    />
                </div>
            </div>
        </main>
    );
}
