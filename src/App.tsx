import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import Header from './Header';
import ServicesView from './Body/ServicesView/ServicesView';
import ServiceView from './Body/ServiceView/ServiceView';
import ComponentView from './Body/ComponentView/ComponentView';
import ProcessorView, { Props } from './Body/ProcessorView/ProcessorView';
import Footer from './Footer';

const AppContainer = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const AppItems = styled.span`
	width: 90%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const App = () => (
	<Router>
		<GlobalStyles />
		<AppContainer>
			<AppItems>
				<Header />
				<Switch>
					<Route exact path="/">
						<Services />
					</Route>
					<Route path="/services/:id" children={<Service />} />
					<Route path="/processors/:id/:key" children={<ProcessorWithKey />} />
					<Route path="/components/:id" children={<Component />} />
					<Route path="/processors/:id" children={<Processor />} />
				</Switch>
				<Footer />
			</AppItems>
		</AppContainer>
	</Router>
);

function Services() {
	return <ServicesView />;
}

function Service() {
	let { id } = useParams();

	return <ServiceView service={id} />;
}

function Component() {
	let { id } = useParams();

	return <ComponentView component={id} />;
}

function Processor() {
	let { id } = useParams();
	return <ProcessorView processor={id} />;
}

function ProcessorWithKey() {
	const { id, key } = useParams();
	const options: Props = {
		processor: Number(id),
		topicKey: String(key)
	};

	return <ProcessorView {...options} />;
}

export default App;
