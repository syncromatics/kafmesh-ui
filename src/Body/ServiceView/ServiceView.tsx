import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import * as Service from '../../Graphs/Service/Service';

const BodyContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
`;

export type Props = {
	service: number;
};

// Flex # corresponds to vertical section divider location
const Component: FunctionComponent<Props> = ({ service }) => {
	const props: Service.Props = {
		service: service
	};

	return (
		<BodyContainer>
			<Service.Component {...props} />
		</BodyContainer>
	);
};

export default Component;
