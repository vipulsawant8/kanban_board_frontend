import { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/src/yup.js";

import { Form, Button, FormGroup, FormText } from "react-bootstrap";

import { InputCheckbox, InputFile, InputSelect, InputText, InputTextarea, SubmitButton } from "@/components/form";

const CustomForm = forwardRef(
	(
		{
			fields = [],
			validationSchema,
			onSubmit,
			onError,
			submitLabel = "Submit",
			submitInside = false,
			defaultValues = {},
			name=''
		},
		ref
	)  => {

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
		setValue
	} = useForm({
		resolver: validationSchema ? yupResolver(validationSchema) : undefined,
		defaultValues
	});

	useImperativeHandle(ref, () => ({
		resetForm: () => { reset(defaultValues) }
	}));

	const handleError = errors => {

		if (import.meta.env.DEV) {
			if (onError) {
						
				onError(errors);
			} else {
			
				if (import.meta.env.DEV) console.log("Form errors :", errors);
			}
		}
	};

	const fieldMap = {
		text: InputText,
		email: InputText,
		password: InputText,
		number: InputText,
		textarea: InputTextarea,
		select: InputSelect,
		file: InputFile,
		checkbox: InputCheckbox	
	};

		return (
			<Form onSubmit={handleSubmit(onSubmit, handleError)}>
			{ fields.map((f) =>{
				const Component = fieldMap[f.type] || InputText;

				return (
					<FormGroup key={f.name}>
					<Component 
						key={f.name}
						field={f}
						register={register}
						watch={watch}
						setValue={setValue} />
					
					{ errors[f.name] && (
						<FormText className="text-danger">
							{ errors[f.name].message }
						</FormText>
					) }
					
					{ submitInside && (<SubmitButton variant="primary" label={submitLabel} name={name} type="inside" />) }
					</FormGroup>
				)
			}
			)}

			{ !submitInside &&  (<div className="d-flex justify-content-center"> <SubmitButton variant="primary" label={submitLabel} name={name} /> </div>) }
		</Form> )
});

export default CustomForm;