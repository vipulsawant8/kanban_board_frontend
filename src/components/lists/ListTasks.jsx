import { Draggable, Droppable } from "@hello-pangea/dnd";
import { TaskItem } from "@/components/tasks";

const ListTasks = ({ listID, tasks }) => {

	// if (!tasks || tasks.length === 0) {
	// 	<p className="text-center"> No Tasks </p>
	// };

	return (
		<Droppable droppableId={listID} type="TASK">
			{(provided, snapshot) => (
				<div ref={provided.innerRef}
				{...provided.droppableProps}
				style={{
					minHeight: 50,
					padding: 4,
					background: snapshot.isDraggingOver ? "#f1f3f5" : "transparent",
					transition: "background-color 0.2s ease"
 				}}>
					{ tasks.map((task, index) => (
						<Draggable key={task._id} draggableId={task._id} index={index}>
							{(dragProvided) => (
								<div 
								ref={dragProvided.innerRef}
								{...dragProvided.draggableProps}
								{...dragProvided.dragHandleProps}
								style={{
									marginBottom: 8,
									...dragProvided.draggableProps.style
								}}>
									<TaskItem task={task} />
								</div>
							)}
							</Draggable>
					))}
					{provided.placeholder}
				</div>)}
			</Droppable>
	);
};

export default ListTasks;