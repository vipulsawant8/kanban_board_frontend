import * as yup from "yup";
import { use, useRef, useState } from "react";
import { Button } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { createTask } from "@/app/features/tasks/taskSlice.js";

import { CustomForm } from "@/components/form";
import notify from "../../utils/notify";

const taskFields = [
	{
		name: "title",
		label: "Title",
		type: "text",
	},
	{
		name: "description",
		label: "Description",
		type: "textarea",
	},
];

const taskSchema = yup.object({
	title: yup.string().required("Title is required"),
	description: yup.string(),
});

const ListAddTask = ({ listID }) => {

	const dispatch = useDispatch();
	const [adding, setAdding] = useState(false);

	const formRef = useRef();

	const handleSave = async (data) => {

		try {
			const result = await dispatch(createTask({ listID, ...data })).unwrap();
			if (import.meta.env.DEV) console.log('result :', result);
			const msg = result.message || `Task "${data.title}" was created`;
			notify.success(msg);
			formRef.current.resetForm();
			setAdding(false);
		} catch (error) {
		
			const msg = error || "Create task failed. Please try again.";
			notify.error(msg);
		}
	};

	const handleError = errors => {

		 if (import.meta.env.DEV) console.log("errors :", errors);
	}

	if (!adding) return (
		<Button size="sm" variant="outline-primary" className="mt-2" onClick={() => setAdding(true)}>
			+ Add Task
		</Button>	
	)
		
	return (
		<div  className="d-flex align-items-end">
			<CustomForm ref={formRef} validationSchema={taskSchema} fields={taskFields} defaultValues={{ title: "", description: "" }} onSubmit={handleSave} submitLabel="Save" name="Add-Task" onError={handleError} />
			<Button size="sm" variant="link" className="mt-2 btn-icon x-btn"  onClick={() => setAdding(false)}>
				X
			</Button>
		</div>
	)
};

export default ListAddTask;