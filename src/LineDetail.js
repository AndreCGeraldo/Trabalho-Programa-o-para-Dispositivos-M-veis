import React from 'react'

const LineDetail = (props) => {
    return (
        <tr key={props.id} data-id={props.id} onClick={props.handleClick}>
            <td>{props.nome}</td>
            <td>{props.tipo}</td>
            <td>{props.idade}</td>
            <td>
                <i className="fas fa-pencil-alt text-primary mr-2" title="Alterar"></i>
                <i className="fas fa-trash-alt text-danger" title="Excluir"></i>
            </td>
        </tr>
    )
}

export default LineDetail;