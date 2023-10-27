import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table, Modal, Header } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function ListFornecedor () {

   const [lista, setLista] = useState([]);
   const [openModal, setOpenModal] = useState(false);
   const [idRemover, setIdRemover] = useState();

   function confirmaRemover(id) {
    setOpenModal(true)
    setIdRemover(id)
}
async function remover() {

    await axios.delete('http://localhost:8080/api/fornecedor/' + idRemover)
    .then((response) => {

        console.log('fornecedor removido com sucesso.')

        axios.get("http://localhost:8080/api/fornecedor")
        .then((response) => {
            setLista(response.data)
        })
    })
    .catch((error) => {
        console.log('Erro ao remover um fornecedor.')
    })
    setOpenModal(false)
}




   useEffect(() => {
       carregarLista();
   }, [])

   function carregarLista() {

       axios.get("http://localhost:8080/api/fornecedor")
       .then((response) => {
           setLista(response.data)
       })
   }


   function formatarData(dataParam) {

    if (dataParam === null || dataParam === '' || dataParam === undefined) {
        return ''
    }

    let arrayData = dataParam.split('-');
    return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
}
return(
    <div>
        <MenuSistema />
        <div style={{marginTop: '3%'}}>

            <Container textAlign='justified' >

                <h2> Fornecedor </h2>
                <Divider />

                <div style={{marginTop: '4%'}}>
                    <Button
                        label='Novo'
                        circular
                        color='orange'
                        icon='clipboard outline'
                        floated='right'
                        as={Link}
                        to='/form-fornecedor'
                    />
 <br/><br/><br/>
                  
                  <Table color='orange' sortable celled>

                      <Table.Header>
                          <Table.Row>
                              <Table.HeaderCell>Nome</Table.HeaderCell>
                              <Table.HeaderCell>endereco</Table.HeaderCell>
                              <Table.HeaderCell>Data de fundação</Table.HeaderCell>
                              <Table.HeaderCell>valor de mercado</Table.HeaderCell>
                              <Table.HeaderCell>pagina web</Table.HeaderCell>
                              <Table.HeaderCell>contato do vendedor</Table.HeaderCell>
                              <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                          </Table.Row>
                      </Table.Header>
                 
                      <Table.Body>

                          { lista.map(fornecedor => (

                              <Table.Row key={fornecedor.id}>
                                  <Table.Cell>{fornecedor.nome}</Table.Cell>
                                  <Table.Cell>{fornecedor.endereco}</Table.Cell>
                                  <Table.Cell>{formatarData(fornecedor.datafundacao)}</Table.Cell>
                                  <Table.Cell>{fornecedor.valordemercado}</Table.Cell>
                                  <Table.Cell>{fornecedor.paginaweb}</Table.Cell>
                                  <Table.Cell>{fornecedor.contatovendedor}</Table.Cell>
                                  <Table.Cell textAlign='center'>

                                      <Button
                                          inverted
                                          circular
                                          color='green'
                                          title='Clique aqui para editar os dados deste cliente'
                                          icon>
                                              <Link to="/form-fornecedor" state={{id: fornecedor.id}} style={{color: 'green'}}> <Icon name='edit' /> </Link>

                                      </Button> &nbsp;


                                      <Button
                                               inverted
                                               circular
                                               color='red'
                                               title='Clique aqui para remover este cliente'
                                               icon
                                               onClick={e => confirmaRemover(fornecedor.id)}>
                                              

                                                   <Icon name='trash' />
                                           </Button>

                                       </Table.Cell>
                                   </Table.Row>
                               ))}

                           </Table.Body>
                       </Table>
                   </div>
               </Container>
           </div>
           <Modal
               basic
               onClose={() => setOpenModal(false)}
               onOpen={() => setOpenModal(true)}
               open={openModal}
         >
               <Header icon>
                   <Icon name='trash' />
                   <div style={{marginTop: '5%'}}> Tem certeza que deseja remover esse registro? </div>
               </Header>
               <Modal.Actions>
                   <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
                       <Icon name='remove' /> Não
                   </Button>
                   <Button color='green' inverted onClick={() => remover()}>
                       <Icon name='checkmark' /> Sim
                   </Button>
               </Modal.Actions>
         </Modal>

       </div>
   )
}