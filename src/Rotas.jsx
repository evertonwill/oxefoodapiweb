import React from 'react';
import { Route, Routes } from "react-router-dom";

import FormCliente from './views/cliente/formCliente';
import ListCliente from './views/cliente/ListCliente';
import FormEntregador from './views/entregador/FormEntregador';
import Home from './views/home/Home';
import FormProduto from './views/produto/FormProduto';
import FormFornecedor from './views/Fornecedor/FormFornecedor';


function Rotas() {
    return (
        <>
            <Routes>
                <Route path="home" element={ <Home/> } />
                <Route path="list-cliente" element={ <ListCliente/> } />
                <Route path="form-cliente" element={ <FormCliente/> } />
                <Route path="form-produto" element={ <FormProduto/> } />
                <Route path="form-entregador" element={ <FormEntregador/> } />
                <Route path="form-fornecedor" element={ <FormFornecedor/>}/>

            </Routes>
        </>
    )
}

export default Rotas