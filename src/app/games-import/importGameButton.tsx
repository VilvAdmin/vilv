interface ImportGameButtonProps {
  handleClick: () => void;
}

const ImportGameButton: React.FC<ImportGameButtonProps> = ({ handleClick }) => {
  return (
    <div className="flex justify-between items-center pb-4">
      <h1 className="text-vilvBlue text-xl font-semibold pb-4">Inschrijven op wedstrijden</h1>
      <button onClick={handleClick} className="bg-vilvBlue text-white p-2 rounded">Importeer</button>
    </div>
  )
}

export default ImportGameButton;