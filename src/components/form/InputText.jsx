import { useState } from "react";
import { FormControl, FormLabel } from "react-bootstrap";

const InputText = ({ field, register }) => {
	const [showPassword, setShowPassword] = useState(false);

	const isPassword = field.type === "password";
	return (
		<>
			{field.label && <FormLabel htmlFor={field.name}>{field.label}</FormLabel>}
			<div style={{ position: "relative" }}>
				<FormControl 
					type={
						isPassword
							? showPassword
								? "text"
								: "password"
							: field.type
					} 
					placeholder={field.placeholder}
					id={field.name}
					autoComplete={field.autoComplete}
					{...register(field.name)} />

				{isPassword && (
					<button
						type="button"
						onClick={() => setShowPassword((v) => !v)}
						style={{
							position: "absolute",
							right: "10px",
							top: "50%",
							transform: "translateY(-50%)",
							background: "none",
							border: "none",
							cursor: "pointer",
						}}
					>
						{showPassword ? "Hide" : "Show"}
					</button>
				)}
			</div>
		</>
	);	
};

export default InputText;