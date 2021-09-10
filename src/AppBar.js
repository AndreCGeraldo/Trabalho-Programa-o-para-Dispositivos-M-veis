import React from 'react'

const AppBar = () => {
    return (
        <div className="row">
            <div className="col-sm-12 bg-dark py-2">
                <img src="logo2.jpg" alt="Logo2" className="img-fluid float-left" width="10%"/>
                <img src="logo2.jpg" alt="Logo2" className="img-fluid float-right" width="10%"/>
                <h1 className="text-white text-center">
                    BANCO CENTRAL
                </h1>
                <h4 className="text-white text-center font-italic">
                    Sistema de Atendimento
                </h4>
                <br/>
                <h6 className="text-white text-center font-weight-bold">
                "Saber quando se deve esperar é o grande segredo do sucesso"
                </h6>
            </div>
        </div>
    );
}

export default AppBar;