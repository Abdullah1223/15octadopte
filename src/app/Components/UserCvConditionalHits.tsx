import { Hits, useSearchBox } from "react-instantsearch";
import Hit from "./CVHitFunction";

export function ConditionalHits() {
    const { query } = useSearchBox();
    
    if (!query) {
      return null; // Or return null to hide completely
    }
  
    return <Hits hitComponent={Hit} />;
  }
  