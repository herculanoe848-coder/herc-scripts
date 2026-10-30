# herc_scripts — versão inicial

Um catálogo responsivo em português para exemplos de scripts **Luau destinados ao Roblox Studio**. Inclui pesquisa, filtro por categoria, cards, modal de código e botão de copiar.

## Abrir localmente

1. Extraia o ZIP.
2. Abra `index.html` no navegador.
3. Para melhor compatibilidade com a área de transferência, execute com um servidor local (por exemplo, a extensão Live Server no VS Code).

## Como adicionar ou editar scripts

Edite `scripts.js`. Cada objeto em `window.HERC_SCRIPTS` tem estes campos:

- `id`: identificador único, sem espaços.
- `title`: nome exibido.
- `category`: categoria do catálogo.
- `game`: experiência/cenário onde o exemplo pode ser usado.
- `description`: resumo.
- `featured`: `true` para aparecer primeiro.
- `code`: código exibido no modal.

Depois de editar, recarregue a página e publique novamente os arquivos.

## Publicação gratuita

### GitHub Pages
1. Crie uma conta em https://github.com/ e um repositório público chamado `herc-scripts`.
2. Envie `index.html`, `styles.css`, `scripts.js` e `app.js` para a raiz do repositório.
3. Em **Settings → Pages**, selecione a branch principal e a pasta `/ (root)`.
4. Salve e aguarde o endereço de publicação aparecer na seção Pages.

Também é possível usar outra hospedagem estática gratuita, como Cloudflare Pages ou Netlify.

## Limitações importantes desta versão

- É um site estático: não existe login administrativo real. O controle de publicação é feito por você editando os arquivos e republicando. Não coloque senhas ou chaves secretas em arquivos do site.
- Não há banco de dados, envio de scripts por visitantes ou painel de administração.
- O catálogo inicial contém exemplos demonstrativos para experiências próprias no Roblox Studio; não é um catálogo completo de todos os jogos.
- Links e downloads de ferramentas de terceiros não foram incluídos. Use fontes oficiais e revise os arquivos antes de distribuí-los.
- Este projeto é independente e não é afiliado à Roblox Corporation.

## Segurança e uso responsável

Use scripts apenas em experiências que você controla ou tem autorização para desenvolver. Revise e teste os códigos no Roblox Studio antes de publicar.
