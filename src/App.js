import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { Fragment, useEffect } from "react";
// import { uiActions } from "./store/UI-Slice";
import Notification from "./components/UI/Notification";
import { fetchCartData, sendCartData } from "./store/cart-actions";

let isInitialized = true;
function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    // const sendCartData = async () => {
    // dispatch(
    //   uiActions.showNotification({
    //     status: "Pending",
    //     title: "Sending..",
    //     message: "sending cart data!!",
    //   }),
    // );
    // const response = await fetch("https://cartadvance-default-rtdb.firebaseio.com/cart.json", {
    //   method: "PUT",
    //   body: JSON.stringify(cart),
    // });
    // if (!response.ok) {
    //   dispatch(
    //     uiActions.showNotification({
    //       status: "error",
    //       title: "Error!!!",
    //       message: "Sending cart data failed!",
    //     }),
    //   );
    // }
    // dispatch(
    //   uiActions.showNotification({
    //     status: "success",
    //     title: "Successfully",
    //     message: "Sending cart data successfully",
    //   }),
    // );
    // };

    if (isInitialized) {
      isInitialized = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }

    // sendCartData().catch((error) => {
    // dispatch(
    //   uiActions.showNotification({
    //     status: "error",
    //     title: "Error!!!",
    //     message: "Sending cart data failed!",
    //   }),
    // );
    // });
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
