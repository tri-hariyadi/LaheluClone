import {useEffect, useRef} from 'react';

const useUpdateEffect = <T>(effect: () => void, deps: Array<T>) => {
    const isInitialMount = useRef(true);
    useEffect(
        isInitialMount.current
            ? () => {
                  isInitialMount.current = false;
              }
            : effect,
        deps,
    );
};

export default useUpdateEffect;
