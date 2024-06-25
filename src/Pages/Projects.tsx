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

      {results.length > 0 && 
        <KolTableStateful _data={results} _headers='{"horizontal": [[{"label":"Project","key":"projectName"}, {"label":"StartDate","key":"startDate"}, {"label":"EndDate", "key":"endDate"}]]}' _label={''} />}
		</div>
	);
}

