import Box from '@mui/material/Box';


const Errors = ({errorsBack}) => {
  return (
	<Box
	border={1}
	borderColor="lightcoral"
	borderRadius={5}
	p={1}
	my={3}
	backgroundColor="#f9b3b3"
	>
		<ul>
			{errorsBack.map((error, index) => (
			<li key={index} style={{ color: 'red', fontWeight: 'bold' }}>
				{error.msg}
			</li>
			))}
		</ul>
	</Box>
  )
}

export default Errors