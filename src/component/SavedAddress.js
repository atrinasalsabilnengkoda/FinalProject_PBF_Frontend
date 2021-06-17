import React, { Component } from 'react';
import firebase from "firebase";
import Navbar from './Navbar';
import Footer from './Footer';
import Rings from '../container/Address';

class ProductRings extends Component {
    constructor(props) {
        super(props);
        this.state = {          // Komponen state dari React untuk statefull component
            listAddress: []     // Variabel array yang digunakan untuk menyimpan data dari API
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

    handleHapusAddress = (idAddres) => {
        const {listAddress} = this.state;
        const newState = listAddress.filter(data => {
            return data.id !== idAddres;
        });
        this.setState({listAddress: newState});
    }

    handleTombolTambah = () => {
        let jalan = this.refs.jalan.value; // this.refs mengacu pada input field (input text, textarea, dll)
        let kecamatan = this.refs.kecamatan.value;
        let kota = this.refs.kota.value;
        let provinsi = this.refs.provinsi.value;
        let kodepos = this.refs.kodepos.value;
        let notes = this.refs.notes.value;
        let id = this.refs.id.value;

        if (id && jalan && kecamatan && kota && provinsi && kodepos && notes) { //cek apakah seua data memiliki nilai (tidak null)
            const {listAddress} = this.state;
            const indeksAddress = listAddress.findIndex(data => {
                return data.id === id;
            });
            listAddress[indeksAddress].jalan = jalan;
            listAddress[indeksAddress].kecamatan = kecamatan;
            listAddress[indeksAddress].kota = kota;
            listAddress[indeksAddress].provinsi = provinsi;
            listAddress[indeksAddress].kodepos = kodepos;
            listAddress[indeksAddress].notes = notes;
            this.setState({listAddress});
        } else if (jalan && kecamatan && kota && provinsi && kodepos && notes) { // jika data belum ada di server
            const id = new Date().getTime().toString();
            const { listAddress } = this.state;
            listAddress.push({id, jalan, kecamatan, kota, provinsi, kodepos, notes});
            this.setState({ listAddress });
        }

        this.refs.jalan.value = "";
        this.refs.kecamatan.value = "";
        this.refs.kota.value = "";
        this.refs.provinsi.value = "";
        this.refs.kodepos.value = "";
        this.refs.notes.value = "";
        this.refs.id.value ="";
    };

    render() {
        return (
            <div className="col-lg-12 bg-light">
                <Navbar /> <br/><br/>
                <div className="container">
                    <div className="row" id="product">
                        <div className="col-5">
                        <h4 className="text-center">✏️ Tambah Alamat Baru</h4><br></br>
                            <div className="form pb-2 bg-info p-4">
                            <br/>
                            <div className="form-group row p-2">
                                    <label htmlFor="title" className="col-sm-4 col-form-label"><h5><b>Jalan</b></h5></label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="jalan" name="jalan" ref="jalan"/>
                                    </div>
                                </div>
                                <div className="form-group row p-2">
                                    <label htmlFor="title" className="col-sm-4 col-form-label"><h5><b>Kecamatan</b></h5></label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="kecamatan" name="kecamatan" ref="kecamatan"/>
                                    </div>
                                </div>
                                <div className="form-group row p-2">
                                    <label htmlFor="title" className="col-sm-4 col-form-label"><h5><b>Kota</b></h5></label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="kota" name="kota" ref="kota"/>
                                    </div>
                                </div>
                                <div className="form-group row p-2">
                                    <label htmlFor="title" className="col-sm-4 col-form-label"><h5><b>Provinsi</b></h5></label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="provinsi" name="provinsi" ref="provinsi"/>
                                    </div>
                                </div>
                                <div className="form-group row p-2">
                                    <label htmlFor="title" className="col-sm-4 col-form-label"><h5><b>Kode Pos</b></h5></label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="kodepos" name="kodepos" ref="kodepos"/>
                                    </div>
                                    </div>
                                <div className="form-group row p-2">
                                    <label htmlFor="title" className="col-sm-4 col-form-label"><h5><b>Notes</b></h5></label>
                                        <div className="col-sm-8">
                                            <textarea name="notes" id="notes" cols="3" rows="3" className="form-control" col="3" ref="notes"></textarea>
                                        </div>
                                </div>
                                <input type="hidden" name="id" ref="id"/>
                                <br />
                                <div className="form-group row p-2">
                                    <div className="col-sm-5"></div>
                                    <button type="submit" className="btn btn-primary col-sm-2 align-center" onClick={this.handleTombolTambah} >Simpan</button>
                                    <div className="col-sm-5"></div>
                                </div>
                                <br/>
                            </div>
                            <br/>
                        </div>

                        <div className="col-7">
                            <h4 className="text-center">Saved Address</h4><br></br>
                            {
                                this.state.listAddress.map(address => {
                                    return <Rings key={address.id} jalan={address.jalan} kecamatan={address.kecamatan} kota={address.kota} provinsi={address.provinsi} kodepos={address.kodepos} notes={address.notes}  hapusAddress = {() => this.handleHapusAddress(address.id)}/>
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