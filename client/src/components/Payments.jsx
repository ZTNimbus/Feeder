import StripeCheckout from "react-stripe-checkout";

import { dispatchHandleToken } from "../actions";

function Payments() {
  return (
    <StripeCheckout
      name={"Feeder"}
      description={"Purchase 5 credit(s)"}
      amount={500}
      token={(token) => dispatchHandleToken(token)}
      stripeKey={import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}
    >
      <button className={"btn"} style={{ marginBottom: "5px" }}>
        Add Credits
      </button>
    </StripeCheckout>
  );
}
export default Payments;
