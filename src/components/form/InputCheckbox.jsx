import { FormCheck } from "react-bootstrap";

const InputCheckbox = ({ field, watch, setValue }) => {
	return (
	<> <FormCheck
		type="checkbox"
		label={field.label}
		checked={watch(field.name)}
		onChange={(e) => setValue(field.name, e.target.checked)} />
	</>
	);
}

export default InputCheckbox;