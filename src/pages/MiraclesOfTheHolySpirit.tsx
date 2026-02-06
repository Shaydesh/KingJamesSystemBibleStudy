import MiracleTable from "../components/MiraclesOfTheHolySpirit/MiracleTable";
import { useMiracles } from "../hooks/useMiracles";

const MiraclesOfTheHolySpirit = () => {
  const { data, loading, error } = useMiracles();

  // Filter miracles to only show those with Classification "Holy Spirit"
  const holySpiritMiracles = data.filter(miracle => miracle.Classification === "Holy Spirit");

  if (loading) return <p>Loading miracles...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h1 className="bibleBookHeader">Miracles of the Holy Spirit</h1>
      <MiracleTable data={holySpiritMiracles} />
    </>
  );
}

export default MiraclesOfTheHolySpirit;
