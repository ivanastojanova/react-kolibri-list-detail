import { useState, useEffect } from 'react'
import Table from '../Components/Table'; 
import { KolButton } from '@public-ui/react';
import { createReactRenderElement } from '@public-ui/react';
import { useNavigate } from 'react-router-dom';

// helper function
import { createRoot, Root } from 'react-dom/client';

const REACT18_ROOTS = new WeakMap<Element | DocumentFragment, Root>();

export const getRoot = (el: Element | DocumentFragment): Root => {
	if (REACT18_ROOTS.has(el) === false) {
		/* https://react.dev/reference/react-dom/client/createRoot */
		REACT18_ROOTS.set(el, createRoot(el));
	}
	return REACT18_ROOTS.get(el) as Root;
};

const apiUrl = import.meta.env.VITE_API_URL;

const fetchCustomers = async () => {
  try {
    const response = await fetch(`${apiUrl}/customers`);
    const json = await response.json();
    return json.length ? json : [];
  } catch (e: any) {
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
          render: (el: HTMLElement, cell: { data: { id: string | undefined; }; }) => {
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
  
  const onNavToDetail = (e: any) => { // e type define
    // console.log(el.target.id);
    navigate(`/customers/${e.target.id}`)
  }

  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetchCustomers().then((results) => {
      setResults(results);
      setIsLoading(false);
    });
 }, []);

 // api function
  async function onRefresh() {
    setIsLoading(true);
    let results = [];
    try {
      results = await fetchCustomers();
    } finally {
      setIsLoading(false);
    }
    // console.log(results);
    setResults(results);
  }

  async function onAddNewItem() {
    navigate(`/form`);
  }

	return (
		<>
      {results.length > 0 && <Table data={results} headers={HEADERS} onRefresh={onRefresh} onAddNewItem={onAddNewItem} isLoading={isLoading}/>}
    </>
	);
}