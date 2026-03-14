import { FormLabel, FormControl } from "react-bootstrap";

const InputTextarea = ({ field, register }) => {
	return (
		<>
			{ field.label && <FormLabel> {field.label} </FormLabel> }
			<FormControl 
				as={'textarea'}
				placeholder={field.placeholder}
				{...register(field.name)} />	
		</>
	);
}

export default InputTextarea;