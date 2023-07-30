/*
Mostrar "Carrinho vazio" quando pacotes de serviço for = 0 ok
Inserção de novos produtos no carrinho - Não pertence a aplicação ok
Remoção de produtos já inseridos - ok
Alteração de quantidade de cada item - ok
Cálculo do preço total dos itens inseridos - ok
*/

import { useEffect, useState, } from 'react';
import './App.css';
import PageHeader from './PageHeader';
import PageTitle from './PageTitle';
import Produtos from './Produtos';
import Resumo from './Resumo';
import TableRow from './TableRow';
import {api} from './Provider'
import React from "react";
import imagem1 from './img/images1.jpg';
import imagem2 from './img/images2.jpg';
import imagem3 from './img/images3.png';



const produtosObj = [
  {
    nome: "Standard por usuário",
    preco: 74.90,
    quantidade: 1,
    img: imagem1,
    
  },
  {
    nome: "Business por usuário",
    preco: 112.90,
    quantidade: 1,
    img: imagem2
    
  },
  {
    nome: "Premium por usuário",
    preco: 144.90,
    quantidade: 1,
    img: imagem3
    
  },
];


function App() {

  const [cart, setCart] = useState([]);

  //busca a informação na api e preenche com o que ela encontrar
  const fetchData = () => {
    api.get('/cart').then((response) => setCart(response.data));
  }
  useEffect (() => {
    fetchData(); 
  },[] )
  
  //adiciona um item ao carrinho
  const addItem = (item) => {
    api.post('/cart', item).then((response) =>  {
      console.log(response);
      fetchData();
    });
  };

  //remova os itens do carrinho
  const removeItem = (item) => {
      console.log({item});
      api.delete(`/cart/${item._id}/`).then(response =>{
        console.log(response);
        fetchData();
      })      
  };

  const updateItem = (item, action) => {
    console.log({item});
    let novoValor = item.preco;
    
    // Aumenta o valor do produto em uma unidade
    if (action === "increase") {
      novoValor += item.preco
    }
    // Verifica se o valor atual é igual ao valor inicial
    if (action === "decrease") {
      if (novoValor === item.preco) {
        return;
        // Diminui o valor do produto em uma unidade 
      } else {
        novoValor -= item.preco
      }
    }
    const newdata = {...item, preco: novoValor }
    delete newdata._id;
    console.log({newdata});
    api.put(`/cart/${item._id}/`, newdata).then(response =>{
      console.log(response);
      fetchData();
    })
  };


  const total = () => {
    let soma = 0
    for (let item of cart) {
      soma += item.preco * item.quantidade;

    }
    return soma
  };

  const cartTotal = total()

  return (
    <>
    <PageHeader/>
    <main>
      <PageTitle/>
      <div className="content">
        <section>
          <button className='btn1' onClick = {() => addItem(produtosObj[0])} style={{padding:'10px 25px', marginBottom: 20}}>
            Add ao carrinho o serviço Standard
          </button>
          <button className='btn2' onClick = {() => addItem(produtosObj[1])} style={{padding:'10px 25px', marginBottom: 20}}>
            Add ao carrinho o serviço Business
          </button>
          <button className='btn3' onClick = {() => addItem(produtosObj[2])} style={{padding:'10px 25px', marginBottom: 20}}>
            Add ao carrinho o serviço Premium
          </button>
          <table>
              <thead><Produtos/></thead>
            <tbody>
              {cart.map((item) => (
              <TableRow
                key={item._id} 
                data={item} 
                removeItem={removeItem}
                updateItem={updateItem}
                />))}
              {cart.length === 0 && <>Carrinho Vazio</>}
            </tbody>
          </table>
        </section>
        <aside><Resumo total={cartTotal}/></aside>
      </div>
    </main>
    </>
  );

}

export default App;