"use client";

import { useState } from "react";

let flag = 0;
let count_prod=0;
let isdisabled= false;

export default function ProductSearch({ onSelect, check_disable }: {onSelect:any, check_disable:boolean}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  

  async function searchProducts(value: string) {
    setQuery(value);
    const res = await fetch(`/api/productscompare?q=${value}`);
    setResults(await res.json());
  }

  const cleanSearch = () =>{
    count_prod +=1;
    setResults([]);
    setQuery("");

    // Agregar algun llamada a service para usuarios no free que tienen limite de agregar 4 comparativas
    if(count_prod>=2){
      isdisabled=true;
      //check_disable
    }else{
      isdisabled=false;
    }
  }


  return (
    <div className="mt-[0.5em]">
      <input
        placeholder="Buscar videojuegos..."
        value={query}
        onChange={(e) => searchProducts(e.target.value)}
        className="border p-2 w-full bg-white rounded-xl"
        disabled={check_disable}
      />
        {results.length>0 ? 
        <ul className="border rounded-xl bg-white-200 compare-down">
            
            {results.map((p: any) => (
                
            <li key={p.title} className="pl-[0.5em] pt-[0.5em] pr-[0.5em] target:bg-white hover:bg-gray-200">
                <button onClick={() => {onSelect(p); cleanSearch();}}>
                {p.title} - <span className="text-xs ">{p.platform} - {p.storeName}</span>
                </button>
            </li>
            ))}
            
        </ul>
        :""}
    </div>
  );
}
