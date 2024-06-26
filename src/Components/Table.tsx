import { KolSpin } from '@public-ui/react';
import { KolButton } from '@public-ui/react';

import { KolTableStateful } from '@public-ui/react';


export default function Table(props: { data: any; headers: any; onRefresh: any; onAddNewItem: any; isLoading: boolean}) { // define Types for data, headers
    let { data, headers, onRefresh, onAddNewItem, isLoading} = props;
    return (
    <>
        <KolButton _label="Load" _on={{onClick: onRefresh}} className="mt-2 mr-2"/>
        <KolButton _label="Add new" _on={{onClick: onAddNewItem}} className="mt-2"/>
       
        {data.length > 0 &&  <KolTableStateful _data={data} _headers={headers} _label={''} />}

        <KolSpin _show={isLoading} className='spin' />
    </>
    );
  }