import styles from './styles.module.scss';
import logoImg from '../../assets/logo.svg';
import { api } from '../../services/api';
import { useEffect, useState } from 'react';


export function MessageList() {

    type Message = {
        id: string;
        text: string;
        user: {
            name: string;
            avatar_url: string;
        }
    }

    //estado = forma de conseguir armazenar informações dentro do componente
    //const messages = useState([]); //como é uma lista de mensagem, o valor inicial foi uma lista vazia, se fosse um texto, seria '' em vez de []

    const [messages, setMessages] = useState<Message[]>([]) /*o useState aqui não me retorna apenas uma variavel messages, me retorna uma variavel messages e uma função setMessages para atualizar a variavel*/

    //useEffect(() => {}, []) vai ser passado um array como parametro, onde nele pode conter 0, 1 ou n variaveis, e caso uma delas sofra alterção,
    //ele executa a função que está como primeiro parametro. caso eu deixe o array vazio, ele executa a função apenas uma vez
    useEffect(() => {
        //chamada para api
        api.get<Message[]>('messages/last3').then(response => { //api.get na rota "messages/last3" e then (quando) eu tiver uma resposta, eu vou dar um console.log em response.data, para ver oq tá vindo
            setMessages(response.data);
        })
    }, [])


    return (
        <div className={styles.messageListWrapper}>
            <img src={logoImg} alt="DoWhile 2021" />



            <ul className={styles.messageList}>
                {
                    messages.map(message => {
                        return (
                            <li key={message.id} className={styles.message}>
                                <p className={styles.messageContent}>{message.text}</p>
                                <div className={styles.messageUser}>
                                    <div className={styles.userImage}>
                                        <img src={message.user.avatar_url} alt={message.user.name} />
                                    </div>
                                    <span>{message.user.name}</span>
                                </div>
                            </li>
                        );
                    })
                }


            </ul>

        </div>
    )
}