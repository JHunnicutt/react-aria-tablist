import { Key, ReactNode, useRef } from 'react';
import { useTab, useTabList, useTabPanel } from 'react-aria';
import {
	Item,
	TabListProps,
	TabListState,
	useTabListState,
} from 'react-stately';

function Tabs(props) {
	let state = useTabListState(props);
}

function App() {
	return (
		<div className="App">
			<h1 className="text-red-500">Hello from app</h1>
		</div>
	);
}

export default App;
