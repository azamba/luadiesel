# Lua Diesel

Site institucional da **Lua Diesel Comércio de Peças para Veículos LTDA**, distribuidora de peças para bombas injetoras e bicos injetores diesel em Ribeirão Preto – SP.

Página única em HTML, CSS e JavaScript puros, sem build nem dependências.

## Seções

- **Início:** título e a plaqueta da empresa
- **A empresa:** história e dados da empresa
- **Produtos:** bicos injetores, bombas injetoras e common rail
- **Para a bancada:** cubas ultrassônicas, ferramentas e kits de reparo
- **Atuação:** para quem a empresa trabalha
- **WhatsApp:** formulário que abre a conversa com a mensagem já escrita
- **Contato:** telefone, WhatsApp, Instagram, endereço, horário e mapa

## Estrutura

```
index.html   conteúdo da página
styles.css   estilos, layout responsivo e animações
main.js      menu, animações ao rolar e formulário do WhatsApp
assets/      logotipos
```

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
O `python3 -m http.server` serve a pasta inteira, inclusive `.git/`. Para expor só o site, sirva uma pasta que contenha apenas `index.html`, `main.js`, `styles.css` e `assets/`.

## WhatsApp

O número usado no formulário e nos links é `5516992318202`, definido em `main.js` e nos links `wa.me` do `index.html`.

## Animações

Quem ativa a opção de reduzir movimento no sistema vê a página pronta, sem animações.
