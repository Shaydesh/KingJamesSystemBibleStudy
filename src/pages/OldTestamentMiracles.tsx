import MiracleTable from "../components/OldTestamentMiracles/MiracleTable";
import { useMiracles } from "../hooks/useMiracles";



const OldTestamentMiracles = () => {
  const { data, loading, error } = useMiracles();

  if (loading) return <p>Loading miracles...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (<>
    <h1 className="bibleBookHeader">Miracles of the Old Testament</h1>
    <MiracleTable data={data} />
  </>);
}

export default OldTestamentMiracles;