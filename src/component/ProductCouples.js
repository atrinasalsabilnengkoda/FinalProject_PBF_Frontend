import React, { Component } from 'react';
import firebase from "firebase";
import Navbar from './Navbar';
import Footer from './Footer';
import Couples from '../container/Couples';

class ProductCouples extends Component {
    constructor(props) {
        super(props);
        this.state = {          // Komponen state dari React untuk statefull component
            listCouples: []     // Variabel array yang digunakan untuk menyimpan data dari API
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

    handleHapusCouples = (idCouples) => {
        const {listCouples} = this.state;
        const newState = listCouples.filter(data => {
            return data.id !== idCouples;
        });
        this.setState({listCouples: newState});
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
            const {listCouples} = this.state;
            const indeksCouples = listCouples.findIndex(data => {
                return data.id === id;
            });
            listCouples[indeksCouples].name = name;
            listCouples[indeksCouples].price = price;
            listCouples[indeksCouples].image = image;
            listCouples[indeksCouples].material = material;
            listCouples[indeksCouples].weight = weight;
            listCouples[indeksCouples].desc = desc;
            this.setState({listCouples});
        } else if (name && price && image && material && weight && desc) { // jika data belum ada di server
            const id = new Date().getTime().toString();
            const { listCouples } = this.state;
            listCouples.push({id, name, price, image, material, weight, desc});
            this.setState({ listCouples });
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
                    <h4 className="text-center">💍 Produk Couples</h4><br></br>
                    <div className="row" id="product">
                        <div className="col-12">
                            {
                                this.state.listCouples.map(couples => {
                                    return <Couples key={couples.id} name={couples.name} price={couples.price} image={couples.image} material={couples.material} weight={couples.weight} desc={couples.desc}  hapusCouples = {() => this.handleHapusCouples(couples.id)}/>
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

export default ProductCouples;