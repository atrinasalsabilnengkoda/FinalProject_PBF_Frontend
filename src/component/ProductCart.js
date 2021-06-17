import React, { Component } from 'react';
import firebase from "firebase";
import Navbar from './Navbar';
import Footer from './Footer';
import Cart from '../container/Cart';

var total, subtotal, no;
class ProductCart extends Component {
    constructor(props) {
        super(props);
        this.state = {          // Komponen state dari React untuk statefull component
            listCart: []     // Variabel array yang digunakan untuk menyimpan data dari API
        }
    }

    ambilDataDariServerAPI = () => {    // fungsi untuk mengambil data dari API dengan penambahan sort dan order
        let ref = firebase.database().ref('/');
        ref.on("value", snapshot => {
            const state = snapshot.val();
            this.setState(state);
        });
    }

    simpanDataKeServerAPI = () => {
        firebase.database()
        .ref("/")
        .set(this.state);
    }

    componentDidMount() {
        this.ambilDataDariServerAPI()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            this.simpanDataKeServerAPI();
        }
    }

    handleHapusCart = (idCart) => {
        const {listCart} = this.state;
        const newState = listCart.filter(data => {
            return data.id !== idCart;
        });
        this.setState({listCart: newState});
    }

    handleTombolTambah = () => {
        let name = this.refs.name.value; // this.refs mengacu pada input field (input text, textarea, dll)
        let price = this.refs.price.value;
        let image = this.refs.image.value;
        let qty = this.refs.qty.value;
        let id = this.refs.id.value;

        if (id && name && price && image && qty) { //cek apakah seua data memiliki nilai (tidak null)
            const {listCart} = this.state;
            const indeksCart = listCart.findIndex(data => {
                return data.id === id;
            });
            listCart[indeksCart].name = name;
            listCart[indeksCart].price = price;
            listCart[indeksCart].image = image;
            listCart[indeksCart].qty = qty;
            this.setState({listCart});
        } else if (name && price && image && qty) { // jika data belum ada di server
            const id = new Date().getTime().toString();
            const { listCart } = this.state;
            listCart.push({id, name, price, image, qty});
            this.setState({ listCart });
        }

        this.refs.name.value = "";
        this.refs.price.value = "";
        this.refs.image.value = "";
        this.refs.qty.value = "";
        this.refs.id.value ="";
    };
    listCart() {
        total = 0;
        subtotal = 0;
        no = 0;
        return this.state.cart.map((cart) => {
            subtotal = cart.price * cart.qty;
            total = total + cart.price * cart.qty;
            no += 1;
            return (
                <tr key={cart.id}>
                    <th scope="row">{no}</th>
                    <td>{cart.name}</td>
                    <td>Rp{cart.price},-</td>
                    <td>{cart.qty}</td>
                    <td>Rp{subtotal},-</td>
                    <td>
                        <button className="btn btn-danger btn-block"onClick={() => this.removeItemFromCart(cart.name)}>Remove</button>
                    </td>
                </tr>
            );
        });
    }
    render() {
        return (
            <div className="col-lg-12 bg-light">
                <Navbar /> <br/><br/>
                <div className="container">
                    <div className="row" id="product">
                    <h4 className="text-center">My Cart</h4><br></br>
                        <div className="col-7">
                            {
                                this.state.listCart.map(cart => {
                                    return <Cart key={cart.id} name={cart.name} price={cart.price} image={cart.image} qty={cart.qty} hapusCart = {() => this.handleHapusCart(cart.id)}/>
                                    
                                })
                            }
                            <br/>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default ProductCart;