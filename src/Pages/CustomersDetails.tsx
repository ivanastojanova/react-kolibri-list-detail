import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { KolSpin } from '@public-ui/react';
import { KolButton } from '@public-ui/react';
import { KolCard } from '@public-ui/react';

const apiUrl = import.meta.env.VITE_API_URL;

const fetchCustomersDetails = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/customers/${id}`);
    return await response.json();
  } catch (e) {
    throw new Error(e);
  }
};


export default function CustomersDetails() {
    const { slug } = useParams();

    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCustomersDetails(slug).then((results) => {
            // console.log(results)
          setResults(results);
        });
     }, [slug]);

     async function onEditItem() {
      navigate(`/form/${results.id}`);
    }

	return (
	<>
        <KolSpin _show />
        <KolButton _label='Edit' _on={{onClick: onEditItem}}></KolButton>
        <KolCard _label={results.companyName} >
            <div>
              <p>Contact: {results.contact}</p>
              <p>Address: {results.addressLine1} {results.addressLine2} {results.addressLine3}</p>
              <p>City & ZIP: {results.city} {results.postalCode}</p>
              <p>State Province, Country: {results.stateProvince} {results.country}</p>
              <p>Phone Number: {results.phoneNumber}</p>
              <p>Email: {results.email}</p>
            </div>
        </KolCard>
    </>
	);
}