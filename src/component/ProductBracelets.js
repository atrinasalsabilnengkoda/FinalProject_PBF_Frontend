import React, { Component } from 'react';
import firebase from "firebase";
import Navbar from './Navbar';
import Footer from './Footer';
import Bracelets from '../container/Bracelets';

class ProductBracelets extends Component {
    constructor(props) {
        super(props);
        this.state = {          // Komponen state dari React untuk statefull component
            listBracelets: []     // Variabel array yang digunakan untuk menyimpan data dari API
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

    handleHapusBracelets = (idBracelets) => {
        const {listBracelets} = this.state;
        const newState = listBracelets.filter(data => {
            return data.id !== idBracelets;
        });
        this.setState({listBracelets: newState});
    }

    handleTombolTambah = () => {
        let name = this.refs.name.value; // this.refs mengacu pada input field (input text, textarea, dll)
        let price = this.refs.price.value;
        let image = this.refs.image.value;
        let material = this.refs.material.value;
        let weight = this.refs.weight.value;
        let desc = this.refs.desc.value;
        let id = this.refs.id.value;

        if (id && name && price && image && material && weight && desc) { //cek apakah seua data memiliki nilai (tidak null)
            const {listBracelets} = this.state;
            const indeksBracelets = listBracelets.findIndex(data => {
                return data.id === id;
            });
            listBracelets[indeksBracelets].name = name;
            listBracelets[indeksBracelets].price = price;
            listBracelets[indeksBracelets].image = image;
            listBracelets[indeksBracelets].material = material;
            listBracelets[indeksBracelets].weight = weight;
            listBracelets[indeksBracelets].desc = desc;
            this.setState({listBracelets});
        } else if (name && price && image && material && weight && desc) { // jika data belum ada di server
            const id = new Date().getTime().toString();
            const { listBracelets } = this.state;
            listBracelets.push({id, name, price, image, material, weight, desc});
            this.setState({ listBracelets });
        }

        this.refs.name.value = "";
        this.refs.price.value = "";
        this.refs.image.value = "";
        this.refs.material.value = "";
        this.refs.weight.value = "";
        this.refs.desc.value = "";
        this.refs.id.value ="";
    };

    render() {
        return (
            <div className="bg-light">
                <Navbar /> <br/><br/>
                <div className="container">
                <h4 className="text-center">💍 Produk Bracelets</h4><br></br>
                    <div className="row" id="product">
                        <div className="col-12">
                            {
                                this.state.listBracelets.map(bracelets => {
                                    return <Bracelets key={bracelets.id} name={bracelets.name} price={bracelets.price} image={bracelets.image} material={bracelets.material} weight={bracelets.weight} desc={bracelets.desc}  hapusBracelets = {() => this.handleHapusBracelets(bracelets.id)}/>
                                })
                            }
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default ProductBracelets;