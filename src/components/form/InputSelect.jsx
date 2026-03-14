import { FormSelect, FormLabel } from "react-bootstrap";

const InputSelect = ({ field, register }) => {
	
	return (
		<>
			{field.label && <FormLabel>{field.label}</FormLabel>}
			<FormSelect 
				{...register(field.name)} >
				<option value={''}> Select </option>
			
				{ field.options?.map(op => ( <option key={op.value} value={op.value}> {op.label} </option> )) }
			</FormSelect>
		</>
	);
};

export default InputSelect;