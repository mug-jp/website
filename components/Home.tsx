import DayjournalIcon from '@/assets/dayjournal.jpg';
import KiguchiIcon from '@/assets/kiguchi.jpg';
import MugjpLLogo from '@/assets/mugjp.png';
import Member from './Member';
import LogoGithub from '@/components/LogoGithub';
import LogoConnpass from '@/assets/logo_connpass.png';
import LogoQiita from '@/assets/logo_qiita.png';
import LogoDevto from '@/components/LogoDevto';

export default function Page() {
    return (
        <main className="p-4 md:p-8 space-y-20">
            <div className="flex flex-col items-center justify-center gap-2">
                <img
                    src={MugjpLLogo}
                    alt="MapLibre User Group Japan"
                    className="rounded-md h-auto max-w-full"
                    width={480}
                />
                <div className="w-full md:w-[480px] text-center">
                    MapLibre User Group Japan (MUG-JP)は、
                    <a href="https://maplibre.org/">MapLibre</a>
                    エコシステムの日本での普及を目指し2023年に設立されました。
                </div>
                <div className="flex gap-4 justify-center items-center">
                    <a href="https://www.github.com/mug-jp">
                        <LogoGithub />
                    </a>
                    <a href="https://mug-jp.connpass.com/">
                        <img
                            src={LogoConnpass}
                            alt="Connpass"
                            width={24}
                            height={24}
                        />
                    </a>
                    <a href="https://qiita.com/organizations/mug-jp">
                        <img
                            src={LogoQiita}
                            alt="Qiita"
                            width={20}
                            height={20}
                        />
                    </a>
                    <a href="https://dev.to/mug-jp">
                        <LogoDevto />
                    </a>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-8">
                <h1 className="text-3xl font-bold">Charter Member</h1>
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
            <div className="flex flex-col items-center justify-center gap-y-8">
                <h1 className="text-3xl font-bold">Contributors</h1>
                <div className="w-full max-w-[800px] h-[400px] md:h-[600px]">
                    <iframe
                        title="MUG-JP contributors"
                        className="w-full h-full rounded-md"
                        src="https://contributors.mug-jp.org/?logo=false"
                    ></iframe>
                    <a
                        href="https://contributors.mug-jp.org"
                        className="text-end block text-gray-500"
                    >
                        https://contributors.mug-jp.org/
                    </a>
                </div>
            </div>
        </main>
    );
}
