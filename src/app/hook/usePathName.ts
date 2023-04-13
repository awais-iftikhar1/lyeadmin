
import { useLocation } from 'react-router-dom';

export const usePathName = () => {
    const {pathname}= useLocation()  ;
    const path = pathname
    const route = path.split('/')[2];
    return {
        route
    }
}