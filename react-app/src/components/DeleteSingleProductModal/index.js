import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteProductTHUNK } from "../../store/product";
import "./DeleteSingleProductModal.css";
import '../UniversalCSS.css'

export default function DeleteSingleProductModal({productId}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const id = productId

  const deleter = async () => {
    await dispatch(deleteProductTHUNK(id))
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
