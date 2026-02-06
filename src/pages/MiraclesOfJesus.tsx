import MiracleTable from "../components/MiraclesOfJesus/MiracleTable";
import { useMiracles } from "../hooks/useMiracles";

const MiraclesOfJesus = () => {
  const { data, loading, error } = useMiracles();

  // Filter miracles to only show those with Classification "Gospels"
  const gospelMiracles = data.filter(miracle => miracle.Classification === "Gospels");

  if (loading) return <p>Loading miracles...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h1 className="bibleBookHeader">Miracles of Jesus</h1>
      <MiracleTable data={gospelMiracles} />
    </>
  );
}

export default MiraclesOfJesus;
