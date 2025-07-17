import "./PlaceSearchList.css";
import { PlaceSearchResult } from "./PlaceSearchResult";

export const PlaceSearchList = ({ results }) => {
  return (
    <div className="results-list">
      {results.map((result, id) => {
        return <PlaceSearchResult result={result.name} key={id} />;
      })}
    </div>
  );
};