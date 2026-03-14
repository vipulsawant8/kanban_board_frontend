import { useState, useRef, memo } from "react";
import { Button, Card, CardBody, CardHeader } from "react-bootstrap";

import { ListHeader, ListTasks, ListAddTask, ListEditForm } from '@/components/lists';
import ListDeleteModal from "./ListDeleteModal.jsx";

const ListColumn = ({ list, tasks = [] }) => {

	const listFormRef = useRef();
	
	const [editing, setEditing] = useState(false);
	const [deleting, setDeleting] = useState(false);

	const onEdit = () => {

		setEditing(true);
	};

	const onHideEdit = () => {

		setEditing(false);
	};

	const onDelete = () => {

		setDeleting(true);
	};
	
	const onHideDelete = () => {

		setDeleting(false);
	};

	return (
		
		<Card className="kanban-list">
			
			{ deleting && ( <ListDeleteModal show={deleting} onHide={onHideDelete} list={list}  /> ) }

			<CardBody className="kanban-list-header p-2">
				
				{ !editing && ( <ListHeader 
						title={list.title} 
						onEdit={onEdit} 
						onDelete={onDelete} 
					/> ) }

				{ editing && ( 
					<div className="d-flex align-items-end">
					
						<ListEditForm 
							show={editing}
							ref ={listFormRef}
							list={list}
							onSave={onHideEdit}
						/>
						<Button variant="link" className="btn-icon x-btn" onClick={onHideEdit} style={{textDecoration: "none"}}> X </Button>
					</div> 
				) }

				<ListTasks listID={list._id} tasks={tasks} />
				<ListAddTask listID={list._id} />
			</CardBody>
		</Card>
	);
};

export default memo(ListColumn);