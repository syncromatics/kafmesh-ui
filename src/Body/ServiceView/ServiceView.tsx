import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import * as Components from '../../Graphs/Components/Components';

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
	const history = useHistory();
	const props: Components.Props = {
		service: service,
		onItemSelected(event: Components.itemSelectedEvent): void {
			switch (event.item.type) {
				case 'component':
					history.push('/components/' + event.item.id);
					break;
			}
		}
	};

	return (
		<BodyContainer>
			<Components.Component {...props} />
		</BodyContainer>
	);
};

export default Component;
