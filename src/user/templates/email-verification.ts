export const emailVerificationTemplate = `
<div style="margin: 0 auto">
    <div>
        <div>Olá <%= name %>,</div>
        <div>
            Seu cadastro foi efetuado com sucesso!<br />
            <a href="\${ link }">
                Clique aqui para ativar sua conta e acessar a plataforma.
            </a>
        </div>
    </div>
</div>`;
