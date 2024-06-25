import { useState } from 'react'
import { KolSpin } from '@public-ui/react';
import { KolButton } from '@public-ui/react';

import { KolTableStateful } from '@public-ui/react';

const apiUrl = import.meta.env.VITE_API_URL;

async function fetchResults() {
  try {
    const response = await fetch(`${apiUrl}/tickets`);
    const json = await response.json();
    return json.results.length ? json.results : [];
  } catch (e: any) {
    throw new Error(e);
  }
}

const textFormatter = (el: { textContent: any; }, cell: { data: { [x: string]: { [x: string]: any; }; }; }, objectName: string, propertyName: string) => {
    el.textContent = cell.data && cell.data[objectName] ? cell.data[objectName][propertyName] : '-'

}

const HEADERS: any = { // fix the type
	horizontal: [
		[
			{
				label: 'Project',
				key: 'project',
				textAlign: 'center',
				width: '10em',
				render: (el: { textContent: any; }, cell: { data: { [x: string]: { [x: string]: any; }; }; }) => { 
                    textFormatter(el, cell, 'project', 'projectName')
                }
			},
			{
				label: 'Employee',
				key: 'employee',
				textAlign: 'center',
				width: '10em',
                render: (el: { textContent: any; }, cell: { data: { [x: string]: { [x: string]: any; }; }; }) => { 
                    textFormatter(el, cell, 'employee', 'name')
                }
			},
			{
				label: 'Work performed',
				key: 'workPerformed',
				width: '20em',
				textAlign: 'center',
			},
		],
	],
};


export default function Customers() {

  const [results, setResults] = useState([]);

  async function onRefresh() {
    const results = await fetchResults();
    // console.log(results);
    setResults(results);
  }


	return (
		<div>
			<KolSpin _show />
      		<div><KolButton _label="Load"_on={{onClick: onRefresh}} /></div>
			{results.length > 0 && <KolTableStateful _data={results} _headers={HEADERS} _label={''} />}
		</div>
	);
}