import React from "react";
const Cart = (props) => {
  return (
    <div className="col-lg-12">
        <div className="container">
            <br/>
            <h1>My Cart</h1>
            <div className="row">
                <table className="table mt-3">
                    <thead class="thead-warning">
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Sub-total</th>
                            <th scope="col">Action</th>
                        </tr> </thead>
                    <tbody>{this.listCart()}</tbody>
                    <tfoot className="font-weight-bold text-white bg-warning">
                        <td className="text-center" colSpan="5">
                            Total
                        </td>
                        <td>Rp{props.total},-</td>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>
  );
};
export default Cart;