import DayjournalIcon from '@/assets/dayjournal.jpg';
import KiguchiIcon from '@/assets/kiguchi.jpg';
import AsahinaIcon from '@/assets/asahina820.jpg';
import SmellmanIcon from '@/assets/smellman.jpg';
import KeichanIcon from '@/assets/keichan34.jpg';
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
                <h1 className="text-3xl font-bold">Organizers</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10 md:gap-x-10 md:gap-y-12">
                    <Member
                        name="Yasunori Kirimoto"
                        caption="Founding Member · 2023"
                        founding
                        icon={DayjournalIcon}
                        xUrl="https://x.com/dayjournal_nori"
                        githubUrl="https://github.com/dayjournal"
                        linkedinUrl="https://www.linkedin.com/in/yasunori-kirimoto"
                    />
                    <Member
                        name="Kanahiro Iguchi"
                        caption="Founding Member · 2023"
                        founding
                        icon={KiguchiIcon}
                        xUrl="https://x.com/kanahiro_iguchi"
                        githubUrl="https://github.com/Kanahiro"
                        linkedinUrl="https://www.linkedin.com/in/kanahiro-iguchi-b78b96122/"
                    />
                    <Member
                        name="Keita Kobayashi"
                        caption="Organizer · since 2026"
                        icon={KeichanIcon}
                        xUrl="https://x.com/sleepy_keita"
                        githubUrl="https://github.com/keichan34/"
                        linkedinUrl="https://www.linkedin.com/in/keitaroh-kobayashi/"
                    />
                    <Member
                        name="Taro Matsuzawa"
                        caption="Organizer · since 2026"
                        icon={SmellmanIcon}
                        xUrl="https://x.com/smellman"
                        githubUrl="https://github.com/smellman"
                        linkedinUrl="https://www.linkedin.com/in/tmatsuzawa/"
                    />
                    <Member
                        name="Asahina"
                        caption="Organizer · since 2026"
                        icon={AsahinaIcon}
                        xUrl="https://x.com/asahina820"
                        githubUrl="https://github.com/asahina820"
                        linkedinUrl="https://www.linkedin.com/in/asahina820/"
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
