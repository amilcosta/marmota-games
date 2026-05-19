'use client';
import { useState, useEffect } from 'react';
import { Slider2 } from '@/components/ui/slider2';
import { usePathname, useSearchParams,useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function PriceRange({price_init, price_end}: { price_init:string, price_end: string }){
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [value, setValue] = useState([parseInt(price_init), parseInt(price_end)]);
    const [debouncedValue, setDebouncedValue] = useState([parseInt(price_init), parseInt(price_end)]);
    
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
            // Call your API function here
            const params = new URLSearchParams(searchParams);
            params.set('p1', value[0].toString());
            params.set('p2', value[1].toString());
            replace(`${pathname}?${params.toString()}`);
        }, 1000); // 2 seconds delay

        return () => clearTimeout(handler);
    }, [value]);

    return (
        <div>
            <div className="flex pb-[0.5em]">
                Precio $ { value.map(val => `${val.toLocaleString('es-CL')}`).join(' - ') } 
            </div>
            <Slider2  
                value={value}
                onValueChange={setValue} // Keeps UI smooth
                min={0}
                max={130000}
                step={1000}
                //minStepsBetweenThumbs={1} 
                >
            </Slider2>
        </div>
    )
}