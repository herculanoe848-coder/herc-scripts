# herc_scripts

Site estático de exemplos educativos de Luau para Roblox Studio. Inclui tema escuro, pesquisa, filtros por categoria, ordenação e botões para copiar código.

## Arquivos

- `index.html` — estrutura da página.
- `styles.css` — visual responsivo.
- `scripts.js` — dados e exemplos de código do catálogo.
- `app.js` — pesquisa, filtros, ordenação e cópia.
- `README.md` — estas instruções.

## Como testar localmente

1. Baixe e extraia o ZIP.
2. Abra `index.html` no navegador.
3. Pesquise por termos como `moedas`, `interface`, `obby` ou `porta`.
4. Use os filtros para ver categorias diferentes.
5. Clique em **Copiar código** para copiar um exemplo.

A fonte do Google Fonts é opcional; se estiver offline, o site usa fontes alternativas. A cópia usa a Clipboard API quando disponível e tenta um método alternativo em contextos locais.

## Publicar no GitHub Pages

1. Abra seu repositório GitHub.
2. Envie os cinco arquivos para a raiz do repositório, substituindo os antigos.
3. Faça commit das alterações.
4. Em **Settings → Pages**, confirme que o Pages está publicado a partir da branch/pasta correta.
5. Aguarde a atualização e recarregue o site. Pode ser necessário limpar o cache do navegador.

## Adicionar um exemplo

Abra `scripts.js` e adicione um objeto ao array `window.HERC_SCRIPTS`. Exemplo:

```js
{
  id: "meu-exemplo",
  title: "Meu exemplo",
  category: "Utilitários",
  icon: "EX",
  level: "Iniciante",
  place: "ServerScriptService",
  featured: false,
  description: "Explique o que o exemplo faz.",
  tags: ["exemplo", "teste"],
  code: `print("Olá, Roblox!")`
}
```

Use um `id` único. Categorias disponíveis nos filtros: `Jogadores`, `Interface`, `Mecânicas`, `Mundo` e `Utilitários`. Para criar uma nova categoria, adicione também um botão com `data-filter` correspondente no `index.html`.

## Importante

Os códigos são exemplos didáticos e podem precisar de ajustes conforme a estrutura do seu jogo. Confira o local indicado no card, teste em uma experiência própria e revise permissões e validação no servidor antes de publicar. Exemplos que usam `LocalScript` devem ficar em um local compatível com execução no cliente.

Este projeto não fornece exploits, cheats, bypasses ou scripts para interferir em experiências de terceiros.

Documentação oficial: https://create.roblox.com/docs
