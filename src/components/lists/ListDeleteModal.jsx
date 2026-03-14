import { useDispatch } from "react-redux";
import { Modal, ModalHeader, ModalTitle, ModalFooter, Button } from "react-bootstrap";
import { deleteList } from "../../app/features/lists/listSlice.js";
import notify from "../../utils/notify.js";

const ListDeleteModal = ({ show, onHide, list }) => {
	
	const dispatch = useDispatch();

	const handleDelete = async () => {
		try {
				const result = await dispatch(deleteList(list._id)).unwrap();
				if (import.meta.env.DEV) console.log('result :', result);
				const msg = result.message || `List "${list.title}" was deleted`;
				notify.success(msg);
				onHide();
			} catch (error) {
				
				const msg = error || "List Delete failed. Please try again.";
				notify.error(msg);
			}	
	};

	return (
		<Modal show={show} backdrop="static" centered onHide={ onHide } keyboard={false} >
			<ModalHeader closeButton>
				<ModalTitle> Delete List? </ModalTitle>
			</ModalHeader>
			<ModalFooter>
				<Button variant="outline-danger" style={{textDecoration: "none"}} onClick={handleDelete}> Confirm </Button>
			</ModalFooter>	
		</Modal>
	)
};

export default ListDeleteModal;