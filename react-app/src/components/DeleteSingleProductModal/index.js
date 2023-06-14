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
    history.push("/")
  };

  return (
    <div className="delete-single-product-modal">
      <h1>Delete</h1>
        <button className="button-full-red single-product-user-buttons" onClick={deleter}>Yes</button>
        <button className="button-no-dimensions single-product-user-buttons" onClick={() => closeModal()}>No</button>
    </div>
  );
}
