import * as yup from "yup";
import { useDispatch } from "react-redux";
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, Card, CardTitle, CardBody, Button } from "react-bootstrap";
import CustomForm from "@/components/form/CustomForm.jsx";
import { createList } from "@/app/features/lists/listSlice.js";
import notify from "../../utils/notify";

const AddList = ({ show, onHide, ref }) => {
	
	const dispatch = useDispatch();

	const fields = [
		{
			name: "title",
			label: "List title",
			type: "text",
			placeholder: "Enter list title"
		},
	];
	
	const listSchema = yup.object({
		title: yup.string().required(),
	});

	const handleAddList = async (data) => {
	
		try {
			const result = await dispatch(createList(data.title)).unwrap();
			if (import.meta.env.DEV) console.log('result :', result);
			
			const msg  = result.message || `List "${data.title}" was created`;
			notify.success(msg);

			ref.current.resetForm();
			onHide();
		} catch (error) {
			
			const msg = error || "Add List failed. Please try again.";
			notify.error(msg);
		}
	};

	const handleError = errors => {
		 if (import.meta.env.DEV) console.log("errors :", errors);
	};

	return (<Modal show={show} onHide={onHide} centered backdrop="static" keyboard={false}>
		<ModalHeader closeButton>
			<ModalTitle>Add New List</ModalTitle>
		</ModalHeader>

		<ModalBody style={{ backgroundColor: "#f8f9fa" }}>
			<Card className="mt-4 p-3" style={{ backgroundColor: "inherit", border: "none" }}>
				<CardBody>
					<CustomForm ref={ref} fields={fields} validationSchema={listSchema} onSubmit={handleAddList} onError={handleError} defaultValues={{ title: "" }} submitLabel="Add" name="AddList" />
				</CardBody>
			</Card>
		</ModalBody>
	</Modal>)
}

export default AddList;