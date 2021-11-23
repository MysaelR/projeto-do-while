import { useEffect } from 'react';
import {VscGithubInverted} from 'react-icons/vsc'
import styles from './styles.module.scss';
import {api} from '../../services/api';

type AuthResponse = {
    token: string;
    user: {
        id: string;
        avatar_url: string;
        name: string;
        login: string;
    }
}

export function LoginBox(){

    const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=426efd63ecb09f542194`;


    async function signIn(githubCode: string){
        const response = await api.post<AuthResponse>('authenticate', {
            code: githubCode,
        })

        const {token,user} = response.data;

        localStorage.setItem('@dowhile:token', token);

        console.log(response.data)
    }

    useEffect(()=> {
        const url = window.location.href;
        const hasGithubCode = url.includes("?code=");

        if(hasGithubCode){
            const [urlWithoutCode, githubCode] = url.split('?code=');
            window.history.pushState({}, '', urlWithoutCode); //limpa o codigo de acesso da URL da página

            signIn(githubCode);
        }
    }, [])

    return(
        <div className={styles.loginBoxWrapper}>
            <strong>Entre e compartilhe sua mensagem</strong>
            <a href={signInUrl} className={styles.signInWithGithub}>
                <VscGithubInverted size="24"/>
                Entrar com Github
            </a>
        </div>
    )
}