import GamesImportTable from "./GamesImportTable";
import ImportGameButton from "./importGameButton";

export default function AddBulk() {
  
  const handleClick = () => {
    console.log('clicked');
  }

  return (
    <>
    <ImportGameButton handleClick={handleClick}/>
    <GamesImportTable />
    </>
  );
}