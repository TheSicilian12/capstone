import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteProductTHUNK } from "../../store/product";
import "./DeleteSingleProductModal.css";
import '../UniversalCSS.css'

export default function DeleteSingleProductModal({productId}) {
  const dispatch = useDispatch();
  const history = useHistory()

  const { closeModal } = useModal();

  const id = productId

  const deleter = async () => {
    await dispatch(deleteProductTHUNK(id))
    closeModal()
    history.push("/homepage")
  };

  return (
    <>
      <h1>Delete</h1>
        <button className="buttons-small" onClick={deleter}>Yes</button>
        <button className="buttons-small" onClick={() => closeModal()}>No</button>
    </>
  );
}
