import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import SearchBar from './components/SearchBar/SearchBar'
import ParcelPage from './components/ParcelPage/ParcelPage'

function App() {
	const [currentParcel, setCurrentParcel] = useState();
	const [currentPage, setCurrentPage] = useState('parcelPage');

    return (
      	<>
			<SearchBar currentPage={currentPage} setCurrentPage={setCurrentPage} setCurrentParcel={setCurrentParcel} />
			{currentPage === 'parcelPage' && <ParcelPage parcel={currentParcel} setCurrentPage={setCurrentPage} />}
      	</>
    )
}

export default App
