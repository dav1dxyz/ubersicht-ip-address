import { styled } from "uebersicht";

export const command = (dispatch) =>
	fetch("https://httpbin.org/ip")
	.then(response => response.json())
	.then(data => {
		dispatch({ type: "FETCH_SUCCEEDED", data });
	})
	.catch((error) => {
		dispatch({ type: "FETCH_FAILED", error });
	});

export const refreshFrequency = 5000;

export const updateState = (event, previousState) => {
	switch(event.type) {
		case 'FETCH_SUCCEEDED': return { data: event.data };
		case 'FETCH_FAILED': return { data: null };
		default: {
			return previousState;
		}
	}
};

const H2txt = styled.h2 `
	text-decoration: underline;
	position: relative;
	top: 15px;
`

const Gradient = styled.h1 `
	background-image: linear-gradient(to right, #e66465, #9198e5);

	background-size: 100%;
	background-repeat: repeat;

	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
`

export const render = ({ data, error }) => {
	return error ? (
		<div>There was an error: <strong>{String(error)}</strong></div>
	) : (
		<div>
			<H2txt>IP address:</H2txt>
			<Gradient>{data.origin}</Gradient>
		</div>
	)
}

export const className = `
	font-family: Helvetica Neue;
	text-align: center;
	top: 5%;
	right: 0;
	left: 0;
	width: 340px;
`
