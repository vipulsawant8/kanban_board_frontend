import * as yup from "yup";
import { forwardRef } from "react";
import { CustomForm } from "@/components/form";

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
	}
];

const taskSchema = yup.object({
	title: yup.string().required("Title is required"),
	description: yup.string(),
});

const TaskEditForm = forwardRef(({ task, onSubmit }, ref) => {
	return (
		<CustomForm 
			ref={ref} 
			fields={taskFields}
			validationSchema={taskSchema}
			defaultValues={{ title: task.title, description: task.description || "" }} 
			submitLabel="Save"
			onSubmit={onSubmit}
			name={`EditTaskForm`}
			onError={errors => {if (import.meta.env.DEV) console.log("Task Edit Form Errors :", errors)}}
		/>
	);
})	
export default TaskEditForm;