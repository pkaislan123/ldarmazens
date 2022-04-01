import {useRef } from 'react';



export default function useDebouce(fn, delay){
    const timeoutRef = useRef(null);

    function debouncedFn(...args){
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(() =>{
            
            fn(...args);
        },delay );
    }

    return debouncedFn;

}