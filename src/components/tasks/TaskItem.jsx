import { useState, useRef } from "react";
import { Card, CardBody, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "@/app/features/tasks/taskSlice.js";

import { TaskEditForm } from "@/components/tasks";
import DeleteTaskModal from "./DeleteTaskModal";
import notify from "../../utils/notify";

const TaskItem = ({ task }) => {

	const formRef = useRef();

	const dispatch = useDispatch();
	const [editing, setEditing] = useState(false);

	const handleSave = async (data) => {

		try {
			const result = await dispatch(updateTask({ id: task._id, ...data })).unwrap();
			if (import.meta.env.DEV) console.log('result :', result);
			const msg = result.message || `Task "${data.title}" was updated`;
			notify.success(msg)
			formRef.current.resetForm();
			setEditing(false);
		} catch (error) {
				
				const msg = error || "Delete failed. Please try again.";
				notify.error(msg);
		}
	};

	const [deleting, setDeleting] = useState(false);

	return (
		<Card className="mb-2 kanban-task">
			<CardBody className="p-2">

				{deleting && <DeleteTaskModal onHide={() => setDeleting(false)} task={task} show={deleting} />}

				{ !editing && (<> <div className="d-flex justify-content-between">
					<strong className="fw-medium"> {task.title} </strong>
					<div>
						<Button size="sm" variant="link" className="btn-icon edit-btn" onClick={() => setEditing(true)}> ✎ </Button>
						<Button size="sm" variant="link" className="ms-2 btn-icon x-btn" onClick={() => setDeleting(true)}> X </Button>
					</div>
				</div> 
				{ task.description && (<div className="text-muted small mt-1"> { task.description } </div>) }
				</>) }
				
				{ editing && (<div className="d-flex align-items-end"><TaskEditForm task={task} onSubmit={handleSave} ref={formRef} /> <Button size="sm" variant="link" className="mt-2 btn-icon x-btn" onClick={() => setEditing(false)} style={{textDecoration: "none"}}> X </Button> </div>) }			
			</CardBody>
		</Card>
	);
}

export default TaskItem;