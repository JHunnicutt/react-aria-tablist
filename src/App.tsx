import { DOMAttributes, Key, ReactNode, useRef } from 'react';
import { useTab, useTabList, useTabPanel } from 'react-aria';
import {
	Item,
	TabListState,
	useTabListState,
	TabListProps,
	ItemProps,
} from 'react-stately';

interface MyItemProps {
	key: Key;
	rendered: ReactNode;
}

interface TabProps {
	key: Key;
	item: MyItemProps;
	state: TabListState<Object>;
}

function Tabs(props: TabListProps<Object>) {
	let state = useTabListState(props);
	let ref = useRef(null);
	let { tabListProps } = useTabList(props, state, ref);

	console.log(state);

	return (
		<div className="tabs">
			<div {...tabListProps} ref={ref}>
				{[...state.collection].map((item) => (
					<Tab key={item.key} item={item} state={state} />
				))}
			</div>
		</div>
	);
}

function Tab({ item, state }: TabProps) {
	let { key, rendered } = item;
	let ref = useRef(null);
	let { tabProps } = useTab({ key }, state, ref);

	return (
		<div {...tabProps} ref={ref}>
			{rendered}
		</div>
	);
}

function App() {
	return (
		<div className="App">
			<h1 className="text-red-500">Hello from app</h1>
		</div>
	);
}

export default App;
