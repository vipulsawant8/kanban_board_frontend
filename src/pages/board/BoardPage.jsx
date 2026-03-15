import * as yup from "yup";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectAllLists, fetchLists, createList, reorderList, persistReorderLists } from "@/app/features/lists/listSlice.js";
import { selectAllTasks, fetchTasks, reorderTaskLocal, persistReorderTasks } from "@/app/features/tasks/taskSlice.js";

// import { CustomForm } from "@/components/form";

import { Container, Row, Col, Card, CardBody, CardTitle, Modal, ModalBody, ModalHeader, ModalFooter, Button } from "react-bootstrap";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

import { ListColumn } from "@/components/lists";

import reorderArray from "@/utils/reorder.js";

import { useRef } from "react";
import { AddList } from "../../components/lists";
import { selectListIDs } from "../../app/features/lists/listSlice";
import { selectTaskIDs } from "../../app/features/tasks/taskSlice";

const BoardPage = () => {

	const formRef = useRef();

	const dispatch = useDispatch();

	const lists = useSelector(selectAllLists);
	const tasks = useSelector(selectAllTasks);
	const loading = useSelector(state => state.lists.loading);

	const [adding, setAdding] = useState(false);

	useEffect(() => {

		dispatch(fetchLists());
		dispatch(fetchTasks());
	}, []);

	const tasksByList = useMemo(() =>{

		const map = {};
		tasks.forEach(t => {
			if (!map[t.listID]) map[t.listID] = [];
			map[t.listID].push(t);
		});

		Object.keys(map).forEach(k => {
			map[k].sort((a, b) => a.position - b.position);
		});

		return map;
	}, [tasks]);

	const onDragEnd = useCallback((result) => {

		if (import.meta.env.DEV) console.log("onDragEnd :", result);
		const { destination, source, type } = result;

		if (!destination) return;

		if (destination.droppableId === source.droppableId && destination.index === source.index) return;

		if (type === "TASK") {
			
			const srcListID = source.droppableId;
			const destListID = destination.droppableId;

			const sourceTasks = tasksByList[srcListID] ? [...tasksByList[srcListID]] : [];
			const destTasks =  srcListID === destListID ? sourceTasks : ( tasksByList[destListID] ? [...tasksByList[destListID]] : []);
			
			if (srcListID === destListID) {
				
				const newOrder = reorderArray(sourceTasks, source.index, destination.index);
				
				const updates = newOrder.map((t, idx) => ({ _id: t._id, listID: srcListID, position: idx}));

				dispatch(reorderTaskLocal(updates));

				dispatch(persistReorderTasks(updates));
			
				return;
			}
			const [moved] = sourceTasks.splice(source.index, 1);

			destTasks.splice(destination.index, 0, moved);

			const updates = [
				...sourceTasks.map((t, idx) => ({ _id: t._id, listID: srcListID, position: idx })),
				...destTasks.map((t, idx) => ({ _id: t._id, listID: destListID, position: idx }))
			];

			dispatch(reorderTaskLocal(updates));

			dispatch(persistReorderTasks(updates));
			return;
		}
	}, [lists, tasksByList, dispatch]);

	const onHide = () => {

		setAdding(false);
	};
	
	return (<>
			<Row>
				<Col className="d-flex justify-content-end">
					<Button onClick={()=> setAdding(true)}> Add List </Button>
				</Col>
			</Row>
			
			 <AddList ref={formRef} show={adding} onHide={onHide} />

			<Row className="mt-3">
				<h2 className="mb-4"> Your Board </h2>
				<DragDropContext onDragEnd={onDragEnd}>
					{lists.map((list, index) => (
						<Col key={list._id + index}>
							<ListColumn list={list} tasks={tasksByList[list._id] || []} />
						</Col>
					))}
				</DragDropContext>
			</Row>

			{ loading && <p> Loading lists..... </p> }
			{ !loading && lists.length ===0 && <h4> No Lists </h4> }
	</>);
};

export default BoardPage;