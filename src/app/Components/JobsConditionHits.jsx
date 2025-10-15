import { useSearchBox } from "react-instantsearch";
import { Hits } from "react-instantsearch";
import Hit from "./JobHit";
export default function ConditionalHits() {
  const { query } = useSearchBox();
  
  if (!query) {
    return null; // Or return null to hide completely
  }

  return <Hits hitComponent={Hit} />;
}
