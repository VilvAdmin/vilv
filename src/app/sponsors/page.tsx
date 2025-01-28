import { SponsorCard } from "./_components/sponsor-card";

export default async function Sponsors() {
  const sponsors = [{name: "Atlas Engineering", logo: "/Atlas_no_bg.png", href: "http://atlas-engineering.be/", description: ""}]

  return (
    <>
    <h1 className="text-vilvBlue text-xl font-semibold pb-4">Sponsors</h1>
    <div className="flex flex-wrap gap-4">
    {sponsors.map((sponsor) => (
        <SponsorCard sponsor={sponsor} key={sponsor.name}/>
    ))}
    </div>
    </>
  );
}