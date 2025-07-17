import "./PlaceSearchResult.css";

export const PlaceSearchResult = ({ result }) => {
    return (
        <div
            className="search-result"
            onClick={(e) => alert(`You selected ${result}!`)}
        >
            {result}
        </div>
    );
};