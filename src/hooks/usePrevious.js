import {useRef,useEffect} from 'react';

export default function usePreviousList(values = []) {
    const ref = useRef([]);

    useEffect(() => {
        values.forEach((value, index) => {
           ref.current[index] = value;
        });
    }, [values]);

    return ref.current;
}