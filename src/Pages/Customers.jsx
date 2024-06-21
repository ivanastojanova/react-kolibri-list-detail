import { useState, useEffect } from 'react'
import Table from '../Components/Table'; 
import { KolButton } from '@public-ui/react';
import { createReactRenderElement } from '@public-ui/react';
import { useNavigate } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

// helper function
const REACT18_ROOTS = new WeakMap();

const getRoot = (el) => {
	if (REACT18_ROOTS.has(el) === false) {
		REACT18_ROOTS.set(el, createRoot(el));
	}
	return REACT18_ROOTS.get(el);
};

const apiUrl = import.meta.env.VITE_API_URL;

const fetchCustomers = async () => {
  try {
    const response = await fetch(`${apiUrl}/customers`);
    const json = await response.json();
    return json.length ? json : [];
  } catch (e) {
    throw new Error(e);
  }
};

export default function Customers() {
  const HEADERS = {
    horizontal: [
      [
        {
          label: 'Contact',
          key: 'contact',
          textAlign: 'center',
          width: '10em',
        },
        {
          label: 'Company Name',
          key: 'companyName',
          textAlign: 'center',
        },
        {
          label: 'Go To',
          textAlign: 'center',
          key: '',
          render: (el, cell) => {
            getRoot(createReactRenderElement(el)).render(
              <div>
                <KolButton _label="Detail" _on={{onClick: onNavToDetail}} _id={cell.data.id}/>
              </div>,
            );
          },
        },
      ],
    ],
  };
  const navigate = useNavigate();
  
  const onNavToDetail = (el) => {
    // console.log(el.target.id);
    navigate(`/customers/${el.target.id}`)
  }

  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchCustomers().then((results) => {
      setResults(results);
    });
 }, []);

 // api function
  async function onRefresh() {
    const results = await fetchCustomers();
    // console.log(results);
    setResults(results);
  }

  async function onAddNewItem() {
    navigate(`/form`);
  }

	return (
		<>
      {results.length > 0 && <Table data={results} headers={HEADERS} onRefresh={onRefresh} onAddNewItem={onAddNewItem} />}
    </>
	);
}