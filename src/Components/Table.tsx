import { KolSpin } from '@public-ui/react';
import { KolButton } from '@public-ui/react';

import { KolTableStateful } from '@public-ui/react';


export default function Table(props: { data: any; headers: any; onRefresh: any; onAddNewItem: any; }) { // define Types for data, headers
    let { data, headers, onRefresh, onAddNewItem } = props;
    return (
    <>
        <KolSpin _show />
        <KolButton _label="Load" _on={{onClick: onRefresh}} />
        <KolButton _label="Add new" _on={{onClick: onAddNewItem}} />
        <KolTableStateful _data={data} _headers={headers} _label={''} />
    </>
    );
  }