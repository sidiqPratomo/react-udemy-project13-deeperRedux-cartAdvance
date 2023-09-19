import { uiActions } from "./UI-Slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch("https://cartadvance-default-rtdb.firebaseio.com/cart.json");

      if (!response.ok) {
        throw new Error("Couldnt fetch data");
      }

      const data = await response.json();
      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        }),
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!!!",
          message: "Fetching cart data failed!",
        }),
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "Pending",
        title: "Sending..",
        message: "sending cart data!!",
      }),
    );

    const sendRequest = async () => {
      const response = await fetch("https://cartadvance-default-rtdb.firebaseio.com/cart.json", {
        method: "PUT",
        body: JSON.stringify({
          items: cart.items,
          totalQuantity: cart.totalQuantity,
        }),
      });

      if (!response.ok) {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!!!",
            message: "Sending cart data failed!",
          }),
        );
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Successfully",
          message: "Sending cart data successfully",
        }),
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!!!",
          message: "Sending cart data failed!",
        }),
      );
    }
  };
};
