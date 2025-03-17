import './sponsor-card.css'

type sponsor = { name: string, logo: string, href: string, description: string }

type SponsorCardProps = { sponsor: sponsor };

export const SponsorCard = ({ sponsor }: SponsorCardProps) => {
  return (
    <a href={sponsor.href} target="_blank" className='max-w-min'>
      <div className="card">
        <div className='image'>
          <img className='sponsorcard' src={sponsor.logo} alt={sponsor.name} />
        </div>
        <div className="container">
          <h4><b>{sponsor.name}</b></h4>
          <p>{sponsor.description}</p>
        </div>
      </div>
    </a>
  )
}