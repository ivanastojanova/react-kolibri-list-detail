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
  } catch (e: any) {
    throw new Error(e);
  }
}

export default function Customers() {

  const [results, setResults] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  async function onRefresh() {
    setIsLoading(true);
    let results = [];
    try {
      results = await fetchResults();
    } finally {
      setIsLoading(false);
    }
    // console.log(results);
    setResults(results);
  }


	return (
		<div>
      <KolButton _label="Load"_on={{onClick: onRefresh}} className="mt-2"></KolButton>

      {results.length > 0 && 
        <KolTableStateful className="mt-2" _data={results} _headers='{"horizontal": [[{"label":"Project","key":"projectName"}, {"label":"StartDate","key":"startDate"}, {"label":"EndDate", "key":"endDate"}]]}' _label={''} />}

      <KolSpin _show={isLoading} className='spin' />
		</div>
	);
}

