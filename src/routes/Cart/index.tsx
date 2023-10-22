import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ShippingForm from "../../components/ShippingForm";
import { MiniFig, RootState, RebrickableMiniFigPart } from "../../types";
import FigCard from "../../components/FigCard";
import { UPDATE_CART } from "../../redux/types";
import PopUpModal from "../../components/PopUpModal";
import { mockApi } from "../../api";
import { ShippingFormValues } from "../../types";

import EmptyMessage from "./EmptyMessage";

const Cart = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const cartState: MiniFig = useSelector((state: RootState) => state.cart);
  const isEmpty = Object.keys(cartState).length === 0;

  const handleSubmit = async (values: ShippingFormValues) => {
    const params = {
      shipping_details: {
        ...values,
      },
      fig_id: cartState.set_num,
    };
    const response = await mockApi.post("/orders", {
      ...params,
    });

    return response;
  };

  const setParts = (parts: RebrickableMiniFigPart[]) => {
    return dispatch({
      type: UPDATE_CART,
      payload: { parts },
    });
  };

  if (isEmpty) {
    return <EmptyMessage />;
  }

  return (
    <>
      <div className="flex w-full justify-between">
        <ShippingForm
          onSubmit={handleSubmit}
          cartState={cartState}
          setParts={setParts}
          setShowModal={setShowModal}
        />
      </div>
      <PopUpModal show={showModal} setShow={setShowModal}>
        {cartState.name && (
          <FigCard
            key={cartState?.name}
            imgUrl={cartState?.set_img_url}
            name={cartState?.name}
            numberOfParts={cartState?.num_parts}
            figId={cartState?.set_num}
            extended={true}
            parts={cartState?.parts}
            setParts={setParts}
            scrollable
          />
        )}
      </PopUpModal>
    </>
  );
};

export default Cart;
