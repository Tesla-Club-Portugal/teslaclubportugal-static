# Tesla Club Portugal — o site

Este é o código do [teslaclubportugal.com](https://teslaclubportugal.com). Está tudo aqui à vista, na expectativa de que qualquer pessoa do clube possa mexer, sugerir mudanças, ou simplesmente perceber como funciona.

Não é preciso saber programar. A maior parte das coisas do dia a dia (adicionar um parceiro, arranjar um erro no texto, actualizar uma foto) faz-se pelo GitHub sem instalar nada.

## Quero contribuir. Por onde começo?

Depende do que queres fazer.

**Vi um erro ou tenho uma ideia** — abre uma [issue](https://github.com/Tesla-Club-Portugal/teslaclubportugal-static/issues/new). Escreve em português normal, sem formalidades. Alguém pega no assunto.

**Quero mesmo mudar uma coisa** — segue para as instruções mais abaixo. Cada mudança passa por Pull Request, com preview automático para veres como fica antes de entrar no site.

**Não tenho tempo para PR, mas isto está mal** — abre a issue à mesma. Alguém trata.

## Como fazer uma mudança

### Método rápido: editar directamente no GitHub

Serve para trocar um texto, adicionar um parceiro, corrigir uma data. Cinco minutos.

1. Encontra o ficheiro que queres mexer (a [tabela em baixo](#onde-est%C3%A1-cada-coisa) diz onde é cada coisa)
2. Abre-o no GitHub e clica no ícone do lápis (canto superior direito)
3. Faz as alterações
4. Desce até ao fundo, escreve uma linha a dizer o que mudaste, escolhe **Propose changes**
5. Isto cria uma branch nova e abre um Pull Request
6. O GitHub Action corre por trás, faz um preview do site com as tuas mudanças, e cola o link no PR
7. O Manuel ou o João recebem notificação, revêem, dão o ok, e fazem merge
8. Um minuto depois está no site oficial

Se te enganares, não faz mal. Alguém revê antes de entrar.

### Método completo: instalar localmente

Se queres ver o site a correr na tua máquina antes de propor uma mudança, ou fazer alterações maiores que envolvem várias páginas.

Precisas de:

- **Node.js 22** ou mais recente (recomendo instalar via [nvm](https://github.com/nvm-sh/nvm))
- **Git**

```sh
git clone https://github.com/Tesla-Club-Portugal/teslaclubportugal-static.git
cd teslaclubportugal-static

# se usas nvm, faz `nvm use 22` antes desta linha
npm install

npm run dev
# abre http://localhost:4321
```

O `npm run dev` fica a correr. Cada vez que gravas um ficheiro, o browser actualiza sozinho.

Quando estiveres pronto para propor:

```sh
git checkout -b nome-da-tua-branch
git add .
git commit -m "descreve o que mudaste"
git push -u origin nome-da-tua-branch
```

Depois abre o PR na página do repo. O resto é igual ao método rápido.

Comandos úteis:

- `npm run dev` — servidor local com auto-reload
- `npm run build` — gera a versão final em `dist/` (útil para confirmar que não há erros antes do PR)
- `npm run preview` — serve a build para veres a versão final antes de empurrar

## Onde está cada coisa

| Quero mexer em | Vai a |
|---|---|
| Texto e layout da homepage | `src/pages/index.astro` |
| Sobre nós | `src/pages/sobre-nos/index.astro` |
| A equipa (fotos e nomes) | `src/pages/sobre-nos/a-equipa.astro` |
| Como ajudar | `src/pages/sobre-nos/como-posso-ajudar.astro` |
| Guias em geral | `src/pages/guias/index.astro` |
| Guia do carregamento | `src/pages/guias/carregamento.astro` |
| Superchargers | `src/pages/superchargers.astro` |
| Parcerias e descontos | `src/pages/parcerias.astro` (edita o array `partners`) |
| Oficinas | `src/pages/oficinas-e-reparacoes.astro` |
| FAQ | `src/pages/faq.astro` (edita o array `faqs`) |
| Blog (lista) | `src/pages/my-blog/index.astro` |
| Um post do blog | `src/pages/YYYY/MM/DD/slug.astro` |
| Páginas em inglês | `src/pages/english/...` |
| Página 404 | `src/pages/404.astro` |
| Menu do topo | `src/components/Nav.astro` (edita o array `links`) |
| Rodapé | `src/components/Footer.astro` (edita o array `cols`) |
| Meta tags globais, OG, favicon | `src/components/SEO.astro` |
| Cores, tipos de letra, tamanhos | `src/styles/global.css` (bloco `@theme`) |
| Fotos de membros da equipa | `public/images/team/` |
| Fotos do site em geral | `public/images/` |
| Imagens migradas do site antigo | `public/media/YYYY/MM/` |
| Redirects (URLs antigas) | `public/_redirects` |
| Headers HTTP (cache, segurança) | `public/_headers` |
| robots.txt, favicons | `public/` |

## Tarefas comuns, passo a passo

### Adicionar um parceiro à página de Parcerias

Abre `src/pages/parcerias.astro`. Em cima está um array `partners`. Copia uma linha existente e adapta:

```ts
{ name: 'Nome da Empresa',
  url:  'https://link-para-o-site.com',
  logo: '/media/2026/09/logo-empresa.png',
  perk: 'Descrição do desconto para membros do clube.' },
```

Se a empresa não tem logo, tira o campo `logo:` e fica um placeholder cinzento com o símbolo do clube. Se tem logo, mete o ficheiro em `public/media/2026/09/logo-empresa.png` (ou o ano/mês que fizer sentido).

### Adicionar ou tirar um membro da equipa

Abre `src/pages/sobre-nos/a-equipa.astro`. Em cima está o array `team`. Cada membro é:

```ts
{ name: 'Nome Apelido', photo: '/images/team/nome-apelido.jpg' },
```

A foto vai para `public/images/team/`, com o mesmo nome. Se ainda não tens foto, tira o `photo:` e aparece as iniciais em cinza. Ex-membros vão para a secção `Anteriormente` no mesmo ficheiro.

### Adicionar uma pergunta à FAQ

Em `src/pages/faq.astro`, array `faqs`. Podes usar HTML na resposta (para negritos, listas, links). O bloco de dados estruturados no fundo regenera-se sozinho.

### Escrever um post no blog

Copia o ficheiro `src/pages/2018/04/06/bem-vindos-ao-tesla-club-portugal.astro` para o teu `YYYY/MM/DD/slug.astro`. Preenche o topo (título, descrição, data). Adiciona o post ao array `posts` em `src/pages/my-blog/index.astro`. Se quiseres navegação prev/next entre posts, actualiza o `<nav>` no fim dos posts adjacentes.

### Corrigir um typo

Encontra o ficheiro, clica no lápis, corrige, cria PR. Cinco minutos.

## Regras de escrita

Coisas que evitamos por escolha:

- **Em-dashes** (—). Preferimos vírgulas, pontos, ou dois-pontos. Soa mais natural em português.
- **Tom corporativo**. Escreve como falas com alguém do grupo. Frases curtas.
- **Segunda pessoa formal** ("o utilizador", "vós"). Preferimos `tu` directo.
- **Texto pensado para SEO**. Escrevemos para pessoas. A estrutura semântica trata do resto.

Português de Portugal. A secção `/english/` é a excepção, escrita em EN-GB para visitantes estrangeiros.

## Como funciona o deploy

Cada push em `main` dispara um GitHub Action que faz build do site e envia para o Cloudflare Pages. O site actualiza em 1-2 minutos. Custa 0€ (Cloudflare Pages tier gratuito, sem limite de bandwidth).

Cada PR ganha um preview URL próprio (`<nome-da-branch>.teslaclubportugal-static-v2.pages.dev`) para veres a mudança antes de mergeares. O bot cola o link no PR.

Se algo correr mal e o site ficar partido, dá para reverter em 1 clique no dashboard do Cloudflare (todos os deploys anteriores ficam guardados).

## Regras do repositório

- `main` está protegida. Não podes fazer push directo (excepto Manuel e João, e mesmo esses tentamos passar por PR quando dá).
- Toda a mudança passa por Pull Request.
- Cada PR precisa de 1 aprovação para poder ser merged.
- O Manuel (@manuelrocha88) e o João (@jonasman) são automaticamente pedidos como reviewers.
- Depois do merge, a branch da feature apaga-se sozinha.
- Force push e delete de main estão bloqueados.

## Stack técnica (para quem quer saber)

- **[Astro](https://astro.build)** 7 — gera o site em HTML estático
- **[Tailwind CSS](https://tailwindcss.com)** 4 — estilos
- **[MDX](https://mdxjs.com)** — permite Markdown com componentes
- **Node.js** ≥ 22
- **[Cloudflare Pages](https://pages.cloudflare.com)** — hosting
- **GitHub Actions** — CI e deploy

Se usas agentes de IA (Claude Code, Cursor, Codex, Aider) para fazer alterações, o [AGENTS.md](AGENTS.md) tem as instruções técnicas que eles precisam de ler no arranque.

## Quem está por trás

Ver [teslaclubportugal.com/sobre-nos/a-equipa/](https://teslaclubportugal.com/sobre-nos/a-equipa/). São cinco pessoas voluntárias, todas donas de Teslas. Ninguém recebe compensação, o clube não tem publicidade nem afiliações comerciais.

Para conversa geral, [grupo do Facebook](https://www.facebook.com/groups/teslaclubportugal). Para assuntos do site, [issues aqui no GitHub](https://github.com/Tesla-Club-Portugal/teslaclubportugal-static/issues).

## Aviso

Este site não é oficial nem afiliado à Tesla, Inc. É um site de fãs, feito por membros do Tesla Club Portugal.
