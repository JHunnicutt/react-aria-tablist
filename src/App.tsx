import { Key, ReactNode, RefObject, useRef } from 'react';
import { AriaTabPanelProps, useTab, useTabList, useTabPanel } from 'react-aria';
import {
	Item,
	TabListState,
	useTabListState,
	TabListProps,
} from 'react-stately';

interface MyItemProps {
	key: Key;
	rendered: ReactNode;
}

interface MyTabProps {
	key: Key;
	item: MyItemProps;
	state: TabListState<Object>;
}

interface MyTabPanelProps extends AriaTabPanelProps {
	state: TabListState<Object>;
}

function Tabs(props: TabListProps<Object>) {
	let state = useTabListState(props);
	let ref = useRef(null);
	let { tabListProps } = useTabList(props, state, ref);

	return (
		<div className="tabs">
			<div {...tabListProps} ref={ref}>
				{[...state.collection].map((item) => (
					<Tab key={item.key} item={item} state={state} />
				))}
			</div>

			<TabPanel key={state.selectedItem?.key} state={state} />
		</div>
	);
}

function Tab({ item, state }: MyTabProps) {
	let { key, rendered } = item;
	let ref = useRef(null);
	let { tabProps } = useTab({ key }, state, ref);

	return (
		<div {...tabProps} ref={ref}>
			{rendered}
		</div>
	);
}

function TabPanel({ state, ...props }: MyTabPanelProps) {
	let ref = useRef(null);
	let { tabPanelProps } = useTabPanel(props, state, ref);

	console.log(state.selectedItem.props.children);

	return (
		<div {...tabPanelProps} ref={ref}>
			{state.selectedItem?.props.children}
		</div>
	);
}

function App() {
	return (
		<div className="App">
			<h1 className="text-red-500">Hello from Tablist</h1>

			<Tabs aria-label="test tabs">
				<Item key="tab1" title="About EMVR">
					<div>
						<div>
							<h3 className="font-bold">Virtual Reality</h3>
							<p>
								Research suggests that prolonged exposure therapy in Virtual
								Reality could help people experiencing post-traumatic stress
								manage their symptoms.
							</p>
						</div>
						<div>
							<h3 className="font-bold">Immersive Therapy</h3>
							<p>
								emVR facilitates EMDR therapy sessions in Virtual Reality
								immersion on the web offering an innovative and effective way to
								participate in EMDR therapy.
							</p>
						</div>
						<div>
							<h3 className="font-bold">Engaging and Adaptable</h3>
							<p>
								Our platform is adaptable to meet individual needs of your
								patients providing quick results and engaging and immersive
								virtual environments.
							</p>
						</div>
					</div>
				</Item>
				<Item key="tab2" title="What is EMDR">
					<div>
						<div>
							<h3 className="font-bold">EMDR Therapy</h3>
							<p>
								EMDR stands for Eye Movement Desensitization and Reprocessing
								and is a type of therapy that helps individuals process
								traumatic experiences
							</p>
						</div>
						<div>
							<h3 className="font-bold">Extensive Training</h3>
							<p>
								This unique and deeply transformative form of therapy requires
								extensive training and education for the therapist to be able to
								offer it and it.
							</p>
						</div>
						<div>
							<h3 className="font-bold">Applications</h3>
							<p>
								EMDR is well suited for those who have experienced trauma,
								abuse, violence, loss, grief, adjustment disorders, and acute
								stress disorder, or are war veterans.
							</p>
						</div>
					</div>
				</Item>
				<Item key="tab3" title="Contact Us">
					<form action="">
						<input type="text" placeholder="Name" />
						<input type="email" placeholder="Email" />
						<input type="text" placeholder="Message" />
						<button>Submit</button>
					</form>
				</Item>
			</Tabs>
		</div>
	);
}

export default App;
