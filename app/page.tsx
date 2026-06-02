import { CallsignBar } from "@/components/CallsignBar";
import { TacticalHero } from "@/components/TacticalHero";
import { DeploymentLog } from "@/components/DeploymentLog";
import { ServiceRecord } from "@/components/ServiceRecord";
import { Doctrine } from "@/components/Doctrine";
import { CombatRecord } from "@/components/CombatRecord";
import { Comms } from "@/components/Comms";

export default function Home() {
  return (
    <>
      <CallsignBar />
      <main className="relative">
        <TacticalHero />
        <DeploymentLog />
        <ServiceRecord />
        <Doctrine />
        <CombatRecord />
        <Comms />
      </main>
    </>
  );
}
