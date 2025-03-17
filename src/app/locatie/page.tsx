export default async function Locatie() {
  return (
    <>
      <h1 className="text-vilvBlue text-xl font-semibold pb-4">Locatie</h1>
      <address><a href="https://www.google.com/maps/place/OHL+Jeugdvoetbalcentrum+Leuven/@50.898365,4.7189079,16.75z/data=!4m5!3m4!1s0x0:0x92665fb4ab41b34d!8m2!3d50.8988012!4d4.7203901" target="_blank" rel="noopener noreferrer">
        Jeugdvoetbalcentrum Leuven <br />
        Domeinstraat 61 <br />
        3010 Kessel-Lo
      </a></address>
      <br />
      <p>
        Via de Domeinstraat heb je toegang tot de parking (P4 provinciedomein). Links achteraan de parking loopt er een weg naar de kleedkamers (ongeveer 250 m stappen langs de verschillende voetbalvelden). Aan die zijde van het gebouw hangt een informatiebord waarop aangegeven is welke kleedkamers en welk veld die dag voor ons gereserveerd zijn​.
      </p>
      <br />
      <div id="image-container">
        <img src="/location.png" id="route" alt="pad naar kleedkamer" loading="lazy" style={{ maxWidth: "100%", maxHeight: "400px" }} />
      </div>
    </>
  );
}