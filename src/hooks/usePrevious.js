import {useRef,useEffect} from 'react';

export default function usePreviousList(state) {
    const ref = useRef();

    useEffect(() => {
        Object.keys(state).forEach(key => {
            if (ref.current[key] !== state[key]) {
                ref.current[key] = state[key];
            }
        });
    }, [state]);

    return ref.current;
}