# Lua Diesel

Site institucional da **Lua Diesel Comércio de Peças para Veículos LTDA**, distribuidora de peças para bombas injetoras e bicos injetores diesel em Ribeirão Preto – SP.

**Site no ar:** https://azamba.github.io/luadiesel/ (GitHub Pages, publicado a partir da branch `main`).

Página única em HTML, CSS e JavaScript puros, sem build nem dependências.

## Seções

- **Início:** título e a plaqueta da empresa
- **A empresa:** história e dados da empresa
- **Produtos:** bicos injetores, bombas injetoras e common rail
- **Marcas:** as marcas com que a empresa trabalha
- **Para a bancada:** cubas ultrassônicas, ferramentas e kits de reparo
- **Atuação:** para quem a empresa trabalha
- **Fale conosco:** botão do WhatsApp com pedido de orçamento já escrito, Instagram e horário

## Estrutura

```
index.html   conteúdo da página
styles.css   estilos, layout responsivo e animações
main.js      menu e animações ao rolar
sitemap.xml  mapa do site para o Google Search Console
assets/      logotipos, ícones e imagem de compartilhamento
```

Os dados da empresa para o Google (horário, WhatsApp, Instagram) ficam no bloco `application/ld+json` do `<head>` do `index.html`. Ao mudar essas informações na página, atualize também esse bloco.

## Rodar localmente

```bash
python3 -m http.server 8080
```

Abra http://localhost:8080.

### Compartilhar com ngrok

Com o servidor local rodando:

```bash
ngrok http 8080
```

O ngrok mostra um endereço público temporário. Ele deixa de funcionar quando o ngrok é encerrado.
O `python3 -m http.server` serve a pasta inteira, inclusive `.git/`. Para expor só o site, sirva uma pasta que contenha apenas `index.html`, `main.js`, `styles.css`, `sitemap.xml` e `assets/`.

## Marcas

A lista fica em `<ul class="brand-grid">` no `index.html` e mostra o nome de cada marca. Para usar o logo, salve o arquivo em `assets/marcas/` (de preferência SVG ou PNG com fundo transparente) e troque o nome pela imagem:

```html
<li><img src="assets/marcas/bosch.svg" alt="Bosch" loading="lazy"></li>
```

Ao incluir ou tirar uma marca, atualize também a lista `brand` do bloco `application/ld+json`.

## WhatsApp

O número usado nos links é `5516997056977`, definido nos links `wa.me` do `index.html`.

## Animações

Quem ativa a opção de reduzir movimento no sistema vê a página pronta, sem animações.
