
import { useState, useCallback } from "react";
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
   CommandSeparator,
} from "@/components/ui/command";

const SearchAutomation = () => {
    /*const [predictions, setPredictions] = useState<
      google.maps.places.AutocompleteSuggestion[]
   >([]);

   const handleUserInput = useCallback(
      debounce((input: string) => {
         setUserInput(input);
         fetchPredictions(input);
      }, 1000),
      []
   );

   async function fetchPredictions(input: string) {
      const queryBody = {
         input: input,
         includedRegionCodes: ["uk"],
         includeQueryPredictions: true,
      };
      try {
         //const res = await PlacesApi.post("places:autocomplete", queryBody);
         const data = await res.json();
         if (!res.ok) throw new Error("Failed to fetch predictions");
         console.log("received suggestings ->", data.suggestions);
         setPredictions(data.suggestions ?? []);
      } catch (error) {
         console.log(error);
      }
   }

   const handleSelectedPlace = (placeId: string) => {
      const selectedInput = predictions.filter(
         (prediction) => prediction.placePrediction?.placeId === placeId
      );
      setUserInput(String(selectedInput[0].placePrediction?.text.text));
      handleGetSelectedPlaceRating(placeId);
   };*/

    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleSearch = async (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.trim()) {
            const response = await fetch(`/search?query=${value}`);
            const data = await response.json();
            setSuggestions(data);
        } else {
        setSuggestions([]);
        }
    };


    return 
        <div>
            <Command className="rounded-lg border shadow-md w-[540px] bg-white"
                    shouldFilter={false}
                >
                <CommandInput
                    placeholder="Search by Game"
                    defaultValue=""
                    onValueChange={handleSearch}
                    className="block w-[480px] h-[48px] -mr-16 text-base text-gray-900"
                />

                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                    {suggestions.map((item, index) => (
                        <CommandItem
                            key={item.placeId}
                            value={item.placeId}
                            onSelect={(value) => handleSelectedPlace(value)}
                        >
                            {item.text}
                        </CommandItem>
                    ))}
                    </CommandGroup>
                    <CommandSeparator />
                </CommandList>
            </Command>
            <button
                type="button"
                className="rounded-r-lg h-[48px] -ml-48 w-48 bg-roofone-green-primary mt-[0.75px] px-4 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
                Calculate rating
            </button>
        </div>
    
};
export default SearchAutomation;