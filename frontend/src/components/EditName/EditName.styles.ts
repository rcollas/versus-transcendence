import styled from 'styled-components';

export const FormContainer = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2em;

	@media only screen and (max-width: 768px) {
		align-items: center;
	}
`;

export const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.75em;
	height: 70px;
`;

export const Input = styled.input`
	height: 48px;
	width: clamp(18rem, 50%, 30rem);
	/* Text box */
	font-family: 'Montserrat';
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 28px;

	/* Inside auto layout */
	flex: none;
	order: 1;
	align-self: stretch;
	flex-grow: 1;
	background: #f9f9f9;
	border: 1px solid #e6e6e6;
	border-radius: 5px;
	padding-left: 24px;

	::placeholder {
		font-weight: 400;
		font-size: 14px;
	}
`;

export const ConfirmContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 16px;
`;

export const loadingimg = styled.img`
	width: 32px;
	height: 32px;
`;

export const errorDisplay = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0px;
`;
