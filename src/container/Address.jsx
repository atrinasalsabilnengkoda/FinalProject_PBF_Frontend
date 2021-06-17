import React from "react";

const Address = (props) => {
  return (
    <div className="page-content page-container bg-light" id="page-content">
      <div className="padding">
        <div className="row container d-flex justify-content-center">
          <div className="col-xl-10 col-md-12">
            <div className="card user-card-full">
              <div className="row m-l-0 m-r-0">
                <div className="col-sm-6 bg-white user-profile">
                  <div className="card-block text-center text-dark">
                    <br/><br/>
                  <div className="m-b-25">
                      {" "}
                      <img
                        className="mx-auto d-block img-fluid my-3"
                        width="50%"
                        src="https://i.pinimg.com/564x/3d/77/ef/3d77ef1780fb54f9fd630e20ef2bb372.jpg"
                        alt="Bracelets"
                      />{" "}
                    </div>
                    <br />
                    <button
                      className="btn btn-success btn-danger"
                      onClick={() => {
                        if (window.confirm("Product berhasil dihapus"))
                          props.hapusAlamat(props.id);
                      }}
                    >
                      Hapus Alamat
                    </button>
                    <br/><br/>
                  </div>
                </div>
                <div className="col-sm-6 bg-info">
                  <div className="card-block">
                  <br/>
                    <h5 className="m-b-20 p-b-5 b-b-default f-w-600">Jalan : </h5>
                    <h6 className="f-w-600">{props.jalan}</h6>
                    <h5 className="m-b-20 p-b-5 b-b-default f-w-600">Kecamatan : </h5>
                    <h6 className="f-w-600">{props.kecamatan}</h6>
                    <h5 className="m-b-20 p-b-5 b-b-default f-w-600">Kota : </h5>
                    <h6 className="f-w-600">{props.kota}</h6>
                    <h5 className="m-b-20 p-b-5 b-b-default f-w-600">Provinsi : </h5>
                    <h6 className="f-w-600">{props.provinsi}</h6>
                    <h5 className="m-b-20 p-b-5 b-b-default f-w-600">Kode Pos : </h5>
                    <h6 className="f-w-600">{props.kodepos}</h6>
                    <h5 className="m-b-20 p-b-5 b-b-default f-w-600">Notes : </h5>
                    <div className="row">
                      <div className="col">
                        <h6 className="m-b-10 f-w-600">{props.notes}</h6>
                        <br/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;