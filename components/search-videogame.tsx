'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname, useSearchParams,useRouter } from 'next/navigation';
//import { useRouter } from 'next/router';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchVideogame({placeholder}: { placeholder:string }){
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term) => {
        
        const params = new URLSearchParams(searchParams);
        if(term){
            params.set('query', term);
        }else{
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 400);

    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <Input placeholder={placeholder} onChange={(e) => {handleSearch(e.target.value);}}>
            </Input>
        </div>
    )
}
//export default SearchVideogame;