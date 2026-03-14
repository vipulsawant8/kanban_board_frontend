import * as yup from "yup";
import { forwardRef } from "react";

import { useDispatch } from "react-redux";

import { CustomForm } from "@/components/form";
import { updateList } from "@/app/features/lists/listSlice.js";
import notify from "../../utils/notify";

const ListEditForm = forwardRef(({ list, onSave }, ref) => {

	const dispatch = useDispatch();

	const listFields = [
		{
			name: "title",
			label: "Title",
			type: "text",
		}
	];

	const listSchema = yup.object({
		title: yup.string().required("Title is required"),
	});

	const handleSave = async (data) => {

		try {
			const result = await dispatch(updateList({ id: list._id, title: data.title })).unwrap();
			const msg = result.message || `List "${data.title}" was updated`;
			notify.success(msg);
			ref.current.resetForm();
			onSave();
		} catch (error) {
			
			const msg = error || "List Update failed. Please try again.";
			notify.error(msg);
		}
	};

	const handleError = errors => {

		 if (import.meta.env.DEV) console.log("List Column Errors :", errors);
	};

	return ( <CustomForm ref={ref} fields={listFields} validationSchema={listSchema} onSubmit={handleSave} onError={handleError} defaultValues={{ title: list.title }} submitLabel="Save" name="EditList" submitInside={true} />)
	
} );

export default ListEditForm;