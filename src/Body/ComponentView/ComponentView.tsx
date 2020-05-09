import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import * as Componentraph from '../../Graphs/Component/Component';

const BodyContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
`;

export type Props = {
	component: number;
};

// Flex # corresponds to vertical section divider location
const Component: FunctionComponent<Props> = ({ component }) => {
	const history = useHistory();
	const props: Componentraph.Props = {
		component: component
	};

	return (
		<BodyContainer>
			<Componentraph.Component {...props} />
		</BodyContainer>
	);
};

export default Component;
