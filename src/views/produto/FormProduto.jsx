import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function FormProduto() {
    const { state } = useLocation();
    const [idProduto, setIdProduto] = useState();
    const [titulo, setTitulo] = useState();
    const [codProduto, setCodProduto] = useState();
    const [descricaoProduto, setDescricaoproduto] = useState();
    const [valorUnitario, setValorUnitario] = useState();
    const [entregaMin, setEntregaMin] = useState();
    const [entregaMax, setEntregaMax] = useState();



 useEffect(() => {
            if (state != null && state.id != null) {
                axios.get("http://localhost:8080/api/produto/" + state.id)
             .then((response) => {
                               setIdProduto(response.data.id)
                               setTitulo(response.data.titulo)
                               setCodProduto(response.data.codProduto)
                               setDescricaoproduto(response.data.descricaoProduto)
                               setValorUnitario(response.data.valorUnitario)
                               setEntregaMin(response.data.entregaMin)
                               setEntregaMax(response.data.entregaMax)
                })
            }
        }, [state])

        function formatarData(dataParam) {
        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }
    
        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }
          
        
        

            function salvar() {

                let produtoRequest = {
                    titulo: titulo,
                    codProduto: codProduto,
                    descricaoProduto: descricaoProduto,
                    valorUnitario: valorUnitario,
                    entregaMin: entregaMin,
                    entregaMax: entregaMax
                }

                if (idProduto != null) { //Alteração:
                    axios.put("http://localhost:8080/api/produto/" + idProduto, produtoRequest)
                    .then((response) => { console.log('Produto alterado com sucesso.') })
                    .catch((error) => { console.log('Erro ao alter um produto.') })
                } else { //Cadastro:
                    axios.post("http://localhost:8080/api/produto", produtoRequest)
                    .then((response) => { console.log('produto cadastrado com sucesso.') })
                    .catch((error) => { console.log('Erro ao incluir o produto') })
                }
         }
        


    
    return (

        <div>
            <MenuSistema />

            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified'>
                    {idProduto === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}>produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>}
                    {idProduto != undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> produto &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>}

                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Título'
                                    maxLength="100"
                                    placeholder="Informe o título do produto"
                                    value={titulo}
                                    onChange={e => setTitulo(e.target.value)} />

                                <Form.Input
                                    required
                                    fluid
                                    label='Código do Produto'
                                    placeholder="Informe o código do produto"
                                    value={codProduto}
                                    onChange={e => setCodProduto(e.target.value)} />

                            </Form.Group>

                            <Form.Group>

                                <Form.Input
                                    required
                                    fluid
                                    label='Descrição do Produto'
                                    maxLength="100"
                                    placeholder="Infome a descrição do produto"
                                    width={16}
                                    value={descricaoProduto}
                                    onChange={e => setDescricaoproduto(e.target.value)} 
                                    
                                    />

                            </Form.Group>


                            <Form.Group>

                                <Form.Input
                                    required
                                    fluid
                                    label='ValorUnitario'
                                    maxLength="100"
                                    placeholder="Infome o ValorUnitario"
                                    width={16}
                                    value={descricaoProduto}
                                    onChange={e => setValorUnitario(e.target.value)} />
                            </Form.Group>
                            <Form.Input
                                required
                                fluid
                                label='EntregaMin'
                                maxLength="10"
                                placeholder="Infome a EntregaMin"
                                width={16}
                                value={descricaoProduto}
                                onChange={e => setEntregaMin(e.target.value)} />



                            <Form.Group>
                                <Form.Input
                                    required
                                    fluid
                                    label='Tempo de Entrega Maxima em 
Minutos'
                                    maxLength="100"
                                    placeholder="40"
                                    width={6}
                                    value={descricaoProduto}
                                    onChange={e => setEntregaMax(e.target.value)} />


                            </Form.Group>

                        </Form>

                        <div style={{ marginTop: '4%' }}>

                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                            >
                                <Icon name='reply' />
                                <Link to={'/list-produto'}>Voltar</Link>
                            </Button>

                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={() => salvar()}
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>

                        </div>

                    </div>

                </Container>
            </div>
        </div>

    );

}
