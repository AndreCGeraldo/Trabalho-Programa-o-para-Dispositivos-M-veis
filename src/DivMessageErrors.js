import React from 'react'

const DivMessageErrors = ({ errors }) => {
    return (
        <div
            className={
                (errors.nome || errors.tipo || errors.idade) &&
                "alert alert-danger"
            }
        >
            {errors.nome && (
                <span>nome deve ser preenchido (até 30 caracteres); </span>
            )}
            {errors.tipo && <span>tipo deve ser selecionada; </span>}
            {errors.idade && (
                <span>
                    idade deve ser preenchido (entre {16} e {100});
                </span>
            )}
        </div>
    )
}

export default DivMessageErrors;