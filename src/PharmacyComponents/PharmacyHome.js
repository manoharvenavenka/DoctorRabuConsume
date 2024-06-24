import {React,useEffect,useState} from 'react'

export default function PharmacyHome() {
    const [pharmacy, setPharmacy] = useState("");

    useEffect(() => {
        const storedDoctor = sessionStorage.getItem('pharmacy');
        if (storedDoctor) {
            setPharmacy(JSON.parse(storedDoctor));
        }
    }, []);

  return (
    <div>
      <h1>haiii{pharmacy.pharmacyName}</h1>
    </div>
  )
}
