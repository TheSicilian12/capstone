import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DeleteSingleProductModal.css";
import '../UniversalCSS.css'

export default function DeleteSingleProductModal() {
  const dispatch = useDispatch();

  const { closeModal } = useModal();

  const deleter = async () => {
    // await dispatch(deleteProduct(id))
    closeModal()
  };

  return (
    <>
      <h1>Delete</h1>
        <button className="buttons-small" onClick={deleter}>Yes</button>
        <button className="buttons-small" onClick={() => closeModal()}>No</button>
    </>
  );
}
