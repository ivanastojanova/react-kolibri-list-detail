import { useState } from 'react'
import { KolSpin } from '@public-ui/react';
import { KolButton } from '@public-ui/react';

import { KolTableStateful } from '@public-ui/react';

const apiUrl = import.meta.env.VITE_API_URL;

async function fetchResults() {
  try {
    const response = await fetch(`${apiUrl}/projects`);
    const json = await response.json();
    return json.length ? json : [];
  } catch (e) {
    throw new Error(e);
  }
}

// const textFormatter = (el, cell, objectName, propertyName) => {
//     el.textContent = cell.data && cell.data[objectName] ? cell.data[objectName][propertyName] : '-'

// }

// const HEADERS = {
// 	horizontal: [
// 		[
// 			{
// 				label: 'Project',
// 				key: 'project',
// 				textAlign: 'center',
// 				width: '10em',
// 				render: (el, cell) => { 
//                     textFormatter(el, cell, 'project', 'projectName')
//                 }
// 			},
// 			{
// 				label: 'Employee',
// 				key: 'employee',
// 				textAlign: 'center',
// 				width: '10em',
//                 render: (el, cell) => { 
//                     textFormatter(el, cell, 'employee', 'name')
//                 }
// 			},
// 			{
// 				label: 'Work performed',
// 				key: 'workPerformed',
// 				width: '20em',
// 				textAlign: 'center',
// 			},
// 		],
// 	],
// };


export default function Customers() {

  const [results, setResults] = useState([]);

  async function onRefresh() {
    const results = await fetchResults();
    console.log(results);
    setResults(results);
  }


	return (
		<div>
			<KolSpin _show />
      <div><KolButton _label="Load"_on={{
          onClick: onRefresh
        }}></KolButton></div>

      {results.length > 0 && <KolTableStateful _data={results} _headers='{"horizontal": [[{"label":"Project","key":"projectName"}, {"label":"StartDate","key":"startDate"}, {"label":"EndDate", "key":"endDate"}]]}' _label={''}>
        
      </KolTableStateful>}

      {/* {results.length > 0 && <KolTableStateful _data={results} _headers={HEADERS} _label={''}>
        
      </KolTableStateful>} */}
		</div>
	);
}

