import React from "react";

function tableRow({data, removeItem, updateItem}) {
  return (
    <>
      <tr>
        <td>
          <div className="product">
            <img src={data.img} width="140" height="140" alt="" />
            <div className="info">
              <div className="name">{data.nome}</div>
            </div>
          </div>
        </td>
        <td>R$ {data.preco}</td>
        <td>
          <div className="qty">
            <button onClick={() => updateItem(data, 'decrease')}>
              <i className="bx bx-minus"></i>
            </button>
            <span>{data.quantidade}</span>
            <button onClick={() => updateItem(data, 'increase')}>
              <i className="bx bx-plus"></i>
            </button>
          </div>
        </td>
        <td>R$ {data.preco * data.quantidade}</td>
        <td>
          <button className="remove" onClick= {() => {
            removeItem(data);
          }}>
          <i className="bx bx-x"></i></button>
        </td>
      </tr>
     </>
  );
}


export default tableRow;
