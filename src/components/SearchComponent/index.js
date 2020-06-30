import React, {useState} from "react";
import FlexComponent from "../../smallComponents/FlexComponent";
import s from "./search.module.css";
import Btn from "../../smallComponents/btn/btn";
import SearchContent from "./SearchContent";


const Search = ({ horsesWithRaces, showButtons }) => {

  const [input, setInput] = useState({
    value: '',
    show: false,
  });
  
  const filteredHorses = horsesWithRaces.filter(h => {
    return h.horse_name.toLowerCase().indexOf(input.value.toLowerCase()) > -1
  });

  const showSearchList = (input.value.length > 0 && filteredHorses.length > 0);

  return (
    <FlexComponent flexDirection={showSearchList ? "column" : "row"}>
      {showButtons && <FlexComponent flexDirection="row">
        <div className={s.odds_comparison_btn}>
          <Btn cta_url={`#`} background="hover_red" type="link">Odds Comparison</Btn>
        </div>
        <div>
          <Btn cta_url={`#`} background="hover_red" type="link">Tips</Btn>
        </div>
      </FlexComponent>}
      <SearchContent
        showSearchList={showSearchList}
        filteredHorses={filteredHorses}
        setInput={setInput} 
        input={input}
        horsesWithRaces={horsesWithRaces} />
    </FlexComponent>
  )
}

export default Search