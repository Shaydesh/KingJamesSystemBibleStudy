import MiracleTable from "../components/OldTestamentMiracles/MiracleTable";
import { useMiracles } from "../hooks/useMiracles";

const OldTestamentMiracles = () => {
  const { data, loading, error } = useMiracles();

  // Filter miracles to only show those with Classification "Old Testament"
  const oldTestamentMiracles = data.filter(miracle => miracle.Classification === "Old Testament");

  if (loading) return <p>Loading miracles...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h1 className="bibleBookHeader">Miracles of the Old Testament</h1>
      <MiracleTable data={oldTestamentMiracles} />
    </>
  );
}

export default OldTestamentMiracles;