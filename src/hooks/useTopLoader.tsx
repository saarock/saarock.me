import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';



/**
 * 
 * @learn Learn again about the cleanup function in the react and know the latest news when the react mount and un-mount the pages and write the algo;
 */
const useTopLoader = () => {
    const [width, setWidth] = useState<number>(0);
    const location = useLocation();
    useEffect(() => {



        setWidth(1000000);


        setTimeout(() => {
            console.log("this")
            setWidth(0)
        }, 2000)
        return () => {
        }
    }, [location.pathname]);


    return { width }
}

export default useTopLoader