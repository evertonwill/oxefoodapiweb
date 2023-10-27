import axios from "axios";
import React, { useEffect, useState } from "react";
import InputMask from 'react-input-mask';
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function FormFornecedor() {
    const { state } = useLocation();
    const [idFornecedor, setIdFornecedor] = useState();
    const [nome, setNome] = useState();
    const [endereco, setendereco] = useState();
    const [datafundacao, setDatafundacao] = useState();
    const [valordemercado, setvalordemercado] = useState();
    const [paginaweb, setpaginaweb] = useState();
    const [contatovendedor, setcontatovendedor] = useState();

    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/fornecedor/" + state.id)
                .then((response) => {
                    setIdFornecedor(response.data.id);
                    setNome(response.data.nome);
                    setendereco(response.data.endereco);
                    setDatafundacao(formatarData(response.data.datafundacao));
                    setvalordemercado(response.data.valordemercado);
                    setpaginaweb(response.data.paginaweb);
                    setcontatovendedor(response.data.contatovendedor);
                });
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

        let fornecedorRequest = {
            nome: nome,
            endereco: endereco,
            datafundacao: datafundacao,
            valordemercado: valordemercado,
            paginaweb: paginaweb,
            contatovendedor: contatovendedor
        }
        

        function salvar() {

            let fornecedorRequest = {
                nome: nome,
                endereco: endereco,
                datafundacao: datafundacao,
                valordemercado: valordemercado,
                paginaweb: paginaweb,
                contatovendedor: contatovendedor
            }
     
            if (idFornecedor != null) { //Alteração:
                axios.put("http://localhost:8080/api/fornecedor/" + idFornecedor, fornecedorRequest)
                .then((response) => { console.log('fornecedor alterado com sucesso.') })
                .catch((error) => { console.log('Erro ao alter um cliente.') })
            } else { //Cadastro:
                axios.post("http://localhost:8080/api/fornecedor", fornecedorRequest)
                .then((response) => { console.log('Cliente cadastrado com sucesso.') })
                .catch((error) => { console.log('Erro ao incluir o cliente.') })
            }
     }
     
    }


    return (

        <div>

            <MenuSistema />

            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                { idFornecedor === undefined &&
    <h2> <span style={{color: 'darkgray'}}> Fornecedor &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
}
{ idFornecedor != undefined &&
    <h2> <span style={{color: 'darkgray'}}> Fornecedor &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
}


                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    maxLength="100"
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='endereço'>
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                        value={endereco}
                                        onChange={e => setendereco(e.target.value)}
                                    />
                                </Form.Input>

                            </Form.Group>

                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='data da fundação'
                                    width={6}>
                                    <InputMask
                                        mask="00/00/0000"
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                        value={datafundacao}
                                        onChange={e => setDatafundacao(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='valor do mercado'
                                    width={6}>
                                    <InputMask
                                        mask="(99) 9999.9999"
                                        value={valordemercado}
                                        onChange={e => setvalordemercado(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='pagina web'
                                    width={6}
                                    value={paginaweb}
                                >
                                    
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='contato do vendedor'
                                    width={6}>
                                    <InputMask
                                        mask="(99) 9999.9999"
                                        value={contatovendedor}
                                        onChange={e => setcontatovendedor(e.target.value)}
                                    />
                                </Form.Input>

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
                                <Link to={'/list-cliente'}>Voltar</Link>

                            
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
                                <Link to >Salvar</Link>
                            </Button>
                        </div>

                    </div>

                </Container>
            </div>
        </div>

    );

}





/*export default function FormFornecedor() {
    const { state } = useLocation();
    const [idFornecedor, setIdFornecedor] = useState();
    const [nome, setNome] = useState();
    const [endereco, setendereco] = useState();
    const [datafundacao, setDatafundacao] = useState();
    const [valordemercado, setvalordemercado] = useState();
    const [paginaweb, setpaginaweb] = useState();
    const [contatovendedor, setcontatovendedor] = useState();
*/


/*useEffect(() => {
    if (state != null && state.id != null) {
        axios.get("http://localhost:8080/api/fornecedor/" + state.id)
            .then((response) => {
                setIdFornecedor(response.data.id);
                setNome(response.data.nome);
                setendereco(response.data.endereco);
                setDatafundacao(formatarData(response.data.datafundacao));
                setvalordemercado(response.data.valordemercado);
                setpaginaweb(response.data.paginaweb);
            }); setcontatovendedor(response.data.contatovendedor);
        }*/