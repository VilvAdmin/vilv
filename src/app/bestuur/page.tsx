import React from "react";

const mgmt: { function: string, name: string }[] = [{ function: "Voorzitter", name: "Michiel Vanpachtenbeke" }, { function: "Ondervoorzitter", name: "Wouter Van De Walle" }, { function: "Penningmeester", name: "Dries Verduyckt" }, { function: "Secretaris", name: "Laurent Verheyden" }, { function: "Bestuurslid", name: "Lucas Discart" }]

export default async function Bestuur() {
  return (
    <>
      <h1 className="text-vilvBlue text-xl font-semibold pb-4">Bestuur</h1>
      <div className="grid grid-cols-[max-content_1fr] gap-2 pb-4">
        {mgmt.map((person) => (
          <React.Fragment key={person.function}>
            <p className="font-semibold">{person.function}</p><p>{person.name}</p>
          </React.Fragment>
        ))}
      </div>
      <br />
      <p>Contacteer ons via <a href="mailto:vilv.bestuur@fcvilvheverlee.be" className="text-vilvBlue">vilv.bestuur@fcvilvheverlee.be</a></p>
    </>
  );
}