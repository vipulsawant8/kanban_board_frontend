import { FormControl, FormLabel } from "react-bootstrap";

const InputFile = ({ field, register }) => {
  
	return (
		<>
			{field.label && <FormLabel>{field.label}</FormLabel>}
			<FormControl 
				type="file" 
				{...register(field.name)} multiple={field.multiple} />
		</>
	);
};

export default InputFile;