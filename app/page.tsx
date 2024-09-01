import DayjournalIcon from '@/assets/dayjournal.jpg';
import KiguchiIcon from '@/assets/kiguchi.jpg';
import MugjpLLogo from '@/assets/mugjp.png';
import Member from './Member';
import Image from 'next/image';

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
