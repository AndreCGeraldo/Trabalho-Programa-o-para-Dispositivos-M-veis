import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import SideBanco from './SideBanco';
import LineDetail from './LineDetail';
import "./table.css";
import DivMessageErrors from './DivMessageErrors';
import NotificationsAlert from './NotificationsAlert';
import { NotificationContainer } from 'react-notifications';

const AppBody = () => {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const [lista, setLista] = useState([]);
    const [alterar, setAlterar] = useState(false);
    const [data_id, setData_id] = useState(0);
    const [atendimento, setAtendimento] = useState("");
    // const [nome, setNome] = useState("");

    const onSubmit = (data, e) => {

        // acrescenta um novo atributo aos dados enviados a partir do formulário
        data.id = new Date().getTime();
        console.log(data);

        // se houver dados salvos em localStorage, obtém esses dados (senão, vazio)
        const bancos = localStorage.getItem("bancos")
            ? JSON.parse(localStorage.getItem("bancos"))
            : "";

        // salva em localstorage os dados existentes, acrescentando o preenchido no form                    
        localStorage.setItem("bancos", JSON.stringify([...bancos, data]));
        console.log('1');
        // atualiza a lista
        setLista([...lista, data]);

        // pode-se limpar cada campo
        setValue("nome", "");
        setValue("tipo", "");
        setValue("idade", "");

        // ou, então, limpar todo o form
        // contudo, esse reset() não limpa o conteúdo das variáveis (ou seja, se o usuário
        // clicar 2x sobre o adicionar, irá duplicar o registro)
        //    e.target.reset();
        NotificationsAlert("success", "Atenção!", "Cliente cadastrado com Sucesso");
    }

    // "efeito colateral", ocorre quando a página é carregada
    useEffect(() => {
        setLista(localStorage.getItem("bancos")
            ? JSON.parse(localStorage.getItem("bancos"))
            : []);
    }, []);

    const handleClick = e => {
        // obtém a linha da tabela sobre a qual o usuário clicou, ou seja, qual elemento tr foi clicado
        const tr = e.target.closest("tr");

        // console.log(e.target);
        // console.log(tr);
        // console.log(tr.getAttribute("data-id"));  

        const id = Number(tr.getAttribute("data-id"));

        if (e.target.classList.contains("fa-pencil-alt")) {
            // console.log("Alterar");

            // atribui a cada variável do form, o conteúdo da linha clicada
            setValue("nome", tr.cells[0].innerText);
            setValue("tipo", tr.cells[1].innerText);
            setValue("idade", tr.cells[2].innerText);

            setAlterar(true);
            setData_id(id);

        } else if (e.target.classList.contains("fa-trash-alt")) {
            // console.log("Excluir");
            NotificationsAlert("error", "Atenção!", "Cliente excluído com Sucesso");
            // obtém o nome da linha sobre a qual o usuário clicou
            const nome = tr.cells[0].innerText;

            if (window.confirm(`Confirma a exclusão do Cliente "${nome}"?`)) {
                // aplica um filtro para recuperar todas as linhas, exceto aquela que será excluída
                const novaLista = lista.filter((banco) => { return banco.id !== id });

                // atualiza o localStorage
                localStorage.setItem("bancos", JSON.stringify(novaLista));

                // atualiza a tabela (refresh)
                setLista(novaLista);
            }
        }
    }

    const onUpdate = data => {
        // inicialmente, recupera os dados salvos em localStorage
        const bancos = JSON.parse(localStorage.getItem("bancos"));
        // cria um novo array vazio
        const bancos2 = [];

        for (const banco of bancos) {
            if (banco.id === data_id) {
                data.id = data_id;
                bancos2.push(data);   // os dados do form (alterados) + data.id
            } else {
                bancos2.push(banco);
            }
        }

        // atualiza os dados em localStorage (com os dados de bancos2)
        localStorage.setItem("bancos", JSON.stringify(bancos2));

        // atualiza a lista (para fazer um refresh na página)
        setLista(bancos2);

        setValue("nome", "");
        setValue("tipo", "");
        setValue("idade", "");

        setAlterar(false);

        NotificationsAlert("warning", "Atenção!", "Alteração efetuada com Sucesso");
    }


    const atender = data => {
        data.preventDefault();
        const bancos = JSON.parse(localStorage.getItem("bancos"));
        let paciente, flag = true;
        for (let i = 0; i < bancos.length; i++) {
            if (bancos[i].tipo === "Atendimento Normal" && flag) {
                paciente = bancos[i];
                flag = false;
            }
        }

        if (!flag) {
            const novaLista = lista.filter((bancos) => { return bancos.id !== paciente.id });

            // atualiza o localStorage
            localStorage.setItem("bancos", JSON.stringify(novaLista));

            // atualiza a tabela (refresh)
            setLista(novaLista);
            setAtendimento(paciente.nome);
        } else {
            alert("Não há clientes na lista de espera do Tipo 'Atendimento Normal'");
        }
    }


    const atenderPreferencial = data => {
        data.preventDefault();
        const bancos = JSON.parse(localStorage.getItem("bancos"));
        let paciente, flag = true;
        for (let i = 0; i < bancos.length; i++) {
            if (bancos[i].tipo === "Atendimento Preferencial" && flag) {
                paciente = bancos[i];
                flag = false;
            }
        }
        if (!flag) {
            const novaLista = lista.filter((bancos) => { return bancos.id !== paciente.id });

            // atualiza o localStorage
            localStorage.setItem("bancos", JSON.stringify(novaLista));

            // atualiza a tabela (refresh)
            setLista(novaLista);
            setAtendimento(paciente.nome);
        } else {
            alert("Não há clientes na lista de espera do Tipo 'Atendimento Preferencial'");
        }

    }


    return (
        <div className="row">
            <SideBanco />

            <div className="col-sm-9 mt-2">
                <form onSubmit={alterar ? handleSubmit(onUpdate) : handleSubmit(onSubmit)}>
                    <div className="input-group mb-2 input-group-lg">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Tipo de Atendimento:</span>
                        </div>
                        <select
                            className="form-control text-center"
                            {...register("tipo", {
                                required: true
                            })}
                        >
                            <option value="">-- Selecione o Atendimento --</option>
                            <option value="Atendimento Normal">Atendimento Normal</option>
                            <option value="Atendimento Preferencial">Atendimento Preferencial</option>
                        </select>
                        <div className="input-group-prepend ml-2">
                            <span className="input-group-text">Idade:</span>
                        </div>
                        <input
                            type="number"
                            className="form-control"
                            {...register("idade", {
                                required: true,
                                min: 16,
                                max: 100
                            })}
                        />
                    </div>
                    <div className="input-group mb-5 input-group-lg">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Nome Completo:</span>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            {...register("nome", {
                                required: true,
                                minLength: 2,
                                maxLength: 30
                            })}
                            autoFocus
                        />
                        <div className="input-group-append">
                            <input
                                type="submit"
                                className={alterar ? "d-none" : "btn btn-outline-success"}
                                value="Adicionar"
                            />
                            <input
                                type="submit"
                                className={alterar ? "btn btn-outline-warning" : "d-none"}
                                value="Alterar"
                            />
                        </div>
                    </div>
                    <NotificationContainer />
                    <DivMessageErrors errors={errors} />
                </form>




                <form onSubmit={handleSubmit(atender)}>
                    <div>
                        <h4 className="mt-3 text-success">Cliente em Atendimento: {atendimento}</h4>
                        <input
                            type="submit"
                            className="btn btn-primary mb-5"
                            onClick={atender}
                            value="Atender"
                        />
                        <input
                            type="submit"
                            className="btn btn-danger mb-5 ml-2"
                            onClick={atenderPreferencial}
                            value="Atender Preferencial"
                        />
                    </div>
                </form>



                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Tipo Atend.</th>
                            <th>Idade</th>
                            <th>Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.map((banco) => {
                            banco.handleClick = handleClick;
                            return (LineDetail(banco));
                        })}
                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default AppBody;