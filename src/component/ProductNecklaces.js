import React, { Component } from 'react';
import firebase from "firebase";
import Navbar from './Navbar';
import Footer from './Footer';
import Necklaces from '../container/Necklaces';

class ProductNecklaces extends Component {
    constructor(props) {
        super(props);
        this.state = {          // Komponen state dari React untuk statefull component
            listNecklaces: []     // Variabel array yang digunakan untuk menyimpan data dari API
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

    handleHapusNecklaces = (idNecklaces) => {
        const {listNecklaces} = this.state;
        const newState = listNecklaces.filter(data => {
            return data.id !== idNecklaces;
        });
        this.setState({listNecklaces: newState});
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
            const {listNecklaces} = this.state;
            const indeksNecklaces = listNecklaces.findIndex(data => {
                return data.id === id;
            });
            listNecklaces[indeksNecklaces].name = name;
            listNecklaces[indeksNecklaces].price = price;
            listNecklaces[indeksNecklaces].image = image;
            listNecklaces[indeksNecklaces].material = material;
            listNecklaces[indeksNecklaces].weight = weight;
            listNecklaces[indeksNecklaces].desc = desc;
            this.setState({listNecklaces});
        } else if (name && price && image && material && weight && desc) { // jika data belum ada di server
            const id = new Date().getTime().toString();
            const { listNecklaces } = this.state;
            listNecklaces.push({id, name, price, image, material, weight, desc});
            this.setState({ listNecklaces });
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
                    <h4 className="text-center">💍 Produk Necklaces</h4><br></br>
                    <div className="row" id="product">
                        <div className="col-12">
                            {
                                this.state.listNecklaces.map(necklaces => {
                                    return <Necklaces key={necklaces.id} name={necklaces.name} price={necklaces.price} image={necklaces.image} material={necklaces.material} weight={necklaces.weight} desc={necklaces.desc}  hapusNecklaces = {() => this.handleHapusNecklaces(necklaces.id)}/>
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

export default ProductNecklaces;