import { useDispatch } from "react-redux";
import { Modal, ModalHeader, ModalTitle, ModalFooter, Button } from "react-bootstrap";
import { deleteTask } from "../../app/features/tasks/taskSlice.js";
import notify from "../../utils/notify.js";

const DeleteTaskModal = ({ show, onHide, task }) => {
	
	const dispatch = useDispatch();

	const handleDelete = async () => {
		try {
				const result = await dispatch(deleteTask(task._id)).unwrap();
				if (import.meta.env.DEV) console.log('result :', result);
				const msg = result.message || `Task "${task.title}" was deleted`;
				notify.success(msg);
				onHide();
			} catch (error) {
				
				const msg = error || "Task Delete failed. Please try again.";
				notify.error(msg);
			}	
	};

	return (
		<Modal show={show} backdrop="static" centered onHide={ onHide } keyboard={false} >
			<ModalHeader closeButton>
				<ModalTitle> Delete Task? </ModalTitle>
			</ModalHeader>
			<ModalFooter>
				<Button variant="outline-danger" style={{textDecoration: "none"}} onClick={handleDelete}> Confirm </Button>
			</ModalFooter>	
		</Modal>
	)
}

export default DeleteTaskModal