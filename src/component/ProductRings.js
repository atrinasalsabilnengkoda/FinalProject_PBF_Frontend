import React, { Component } from 'react';
import firebase from "firebase";
import Navbar from './Navbar';
import Footer from './Footer';
import Rings from '../container/Rings';

class ProductRings extends Component {
    constructor(props) {
        super(props);
        this.state = {          // Komponen state dari React untuk statefull component
            listRings: []     // Variabel array yang digunakan untuk menyimpan data dari API
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

    handleHapusRings = (idRings) => {
        const {listRings} = this.state;
        const newState = listRings.filter(data => {
            return data.id !== idRings;
        });
        this.setState({listRings: newState});
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
            const {listRings} = this.state;
            const indeksRings = listRings.findIndex(data => {
                return data.id === id;
            });
            listRings[indeksRings].name = name;
            listRings[indeksRings].price = price;
            listRings[indeksRings].image = image;
            listRings[indeksRings].material = material;
            listRings[indeksRings].weight = weight;
            listRings[indeksRings].desc = desc;
            this.setState({listRings});
        } else if (name && price && image && material && weight && desc) { // jika data belum ada di server
            const id = new Date().getTime().toString();
            const { listRings } = this.state;
            listRings.push({id, name, price, image, material, weight, desc});
            this.setState({ listRings });
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
            <div className="col-lg-12 bg-light">
                <Navbar /> <br/><br/>
                <div className="container">
                    <h4 className="text-center">💍 Produk Rings</h4><br></br>
                    <div className="row" id="product">
                        <div className="col-12">
                            {
                                this.state.listRings.map(rings => {
                                    return <Rings key={rings.id} name={rings.name} price={rings.price} image={rings.image} material={rings.material} weight={rings.weight} desc={rings.desc}  hapusRings = {() => this.handleHapusRings(rings.id)}/>
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

export default ProductRings;