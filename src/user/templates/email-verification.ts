export const emailVerificationTemplate = `
<div style="margin: 0 auto">
    <div>
        <div>Olá <%= name %>,</div>
        <div>
            Seu cadastro foi efetuado com sucesso!<br /><br />
            \${ additionalData }
            <a href="\${ link }" style="background-color: #930000; border-radius: 20px; padding: 10px 20px; text-decoration: none; outline: none; color: white; font-size: 16px; font-weight: 800">
                Clique aqui para ativar sua conta e acessar a plataforma.
            </a><br /><br />
            Ou clique no link a baixo:<br />
            <a href="\${ link }"><%= link %></a>
        </div>
        <div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Ufu_logo.svg/2048px-Ufu_logo.svg.png" alt="logo ufu" style="width: 300px; aspect-ratio: 1306 / 302" />
        </div>
    </div>
</div>`;
