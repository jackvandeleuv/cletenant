import { Suspense } from 'react';
import MainSearch from './MainSearch';

export default function MainPage() {
    return (
        <Suspense>        
            <MainSearch />
        </Suspense>
    )
}
