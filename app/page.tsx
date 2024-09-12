import DayjournalIcon from '@/assets/dayjournal.jpg';
import KiguchiIcon from '@/assets/kiguchi.jpg';
import MugjpLLogo from '@/assets/mugjp.png';
import Member from './Member';
import Image from 'next/image';
import { Link } from 'next-view-transitions';
import LogoGithub from '@/components/LogoGithub';
import LogoConnpass from '@/assets/logo_connpass.png';
import LogoQiita from '@/assets/logo_qiita.png';

export default function Page() {
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
                    MapLibre User Group Japan (MUG-JP)は、
                    <Link href="https://maplibre.org/">MapLibre</Link>
                    エコシステムの日本での普及を目指し2023年に設立されました。
                </div>
                <div className="flex gap-4 justify-center items-center">
                    <Link href="https://www.github.com/mug-jp">
                        <LogoGithub />
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
                <div className="grid grid-cols-2 gap-10">
                    <Member
                        name="Yasunori Kirimoto"
                        icon={DayjournalIcon}
                        xUrl="https://x.com/dayjournal_nori"
                        githubUrl="https://github.com/dayjournal"
                        linkedinUrl="https://www.linkedin.com/in/yasunori-kirimoto"
                    />
                    <Member
                        name="Kanahiro Iguchi"
                        icon={KiguchiIcon}
                        xUrl="https://x.com/kanahiro_iguchi"
                        githubUrl="https://github.com/Kanahiro"
                        linkedinUrl="https://www.linkedin.com/in/kanahiro-iguchi-b78b96122/"
                    />
                </div>
            </div>
        </main>
    );
}
