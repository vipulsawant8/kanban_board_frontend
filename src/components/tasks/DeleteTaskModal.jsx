import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, ModalTitle, ModalFooter, Button } from "react-bootstrap";
import { deleteTask, persistReorderTasks, selectAllTasks } from "../../app/features/tasks/taskSlice.js";
import notify from "../../utils/notify.js";

const DeleteTaskModal = ({ show, onHide, task }) => {
	const tasks = useSelector(selectAllTasks);
	const dispatch = useDispatch();

	const handleDelete = async () => {
		try {
				const result = await dispatch(deleteTask(task._id)).unwrap();
				if (import.meta.env.DEV) console.log('result :', result);
				const msg = result.message || `Task "${task.title}" was deleted`;
				notify.success(msg);
				 
				const orderedTasks = tasks
				.filter(t => t.listID === task.listID && t._id !== task._id)
				.sort((a, b) => a.position - b.position);

				const payload = orderedTasks.map((t, idx) => ({
				_id: t._id,
				listID: t.listID,
				position: idx
				}));

				await dispatch(persistReorderTasks(payload)).unwrap();
				
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