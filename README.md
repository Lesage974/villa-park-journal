# 📰 Jornal do Villa Park Hotel Recife

Site de jornal diário interno do Villa Park Hotel Recife, hospedado no GitHub Pages.

---

## 🚀 Como publicar no GitHub Pages (passo a passo)

### 1. Criar uma conta GitHub (se ainda não tiver)
1. Acesse [github.com](https://github.com) e clique em **Sign up**
2. Crie uma conta gratuita

### 2. Criar o repositório
1. Clique em **+** → **New repository**
2. Nome: `villa-park-journal` (ou outro à sua escolha)
3. Deixe **Public** selecionado
4. Clique em **Create repository**

### 3. Fazer upload dos ficheiros
1. Na página do repositório, clique em **uploading an existing file**
2. Arraste **toda a estrutura de pastas** para lá (ver estrutura abaixo)
3. Clique em **Commit changes**

### 4. Ativar o GitHub Pages
1. Clique em **Settings** → **Pages**
2. Em **Source**: `Deploy from a branch`
3. Em **Branch**: `main` / `/ (root)`
4. Clique em **Save** — aguarde 1-2 minutos

### 5. Acessar o site
```
https://SEU_USERNAME.github.io/villa-park-journal/
```

---

## 🔐 Acessos

| Painel | URL | Utilizador | Palavra-passe |
|--------|-----|-----------|---------------|
| Admin  | `/admin/`  | admin  | admin  |
| Sergio | `/sergio/` | SERGIO | SERGIO |

---

## 📁 Estrutura de Ficheiros

```
villa-park-journal/
│
├── index.html                  # Página principal (jornal público)
├── style.css                   # Estilos do jornal
├── darkmode.js                 # ★ Modo escuro — partilhado por todas as páginas
├── news.js                     # Carregamento de notícias (lê data/news.json)
├── README.md                   # Esta documentação
│
├── assets/
│   └── logo.png                # Logo do hotel
│
├── data/
│   └── news.json               # Notícias geradas pelo script Python
│
├── scripts/
│   └── fetch_news.py           # Script Python que chama a GNews API
│
├── admin/
│   ├── index.html              # Painel Admin (login: admin / admin)
│   └── admin.css               # Estilos do painel admin
│
├── sergio/
│   ├── index.html              # Painel Sergio (login: SERGIO / SERGIO)
│   └── sergio.css              # Estilos do painel Sergio
│
└── .github/
    └── workflows/
        └── news.yml            # Automatização diária das notícias
```

---

## 🌙 Modo Escuro

Todas as páginas do site têm um botão de alternância de tema fixo no **canto inferior esquerdo** do ecrã.

- **Ícone sol ☀** (aparece em cima do botão) → modo escuro **ativo** — clique para desativar
- **Ícone lua 🌙** → modo claro **ativo** — clique para ativar o modo escuro
- A preferência é guardada automaticamente no browser (`localStorage`) e é mantida ao navegar entre páginas e ao fechar/reabrir o site
- As cores usadas são as mesmas cores da marca do hotel, reorganizadas para conforto visual nocturno

---

## 📊 Painel Sergio — Como usar

O painel de Sergio é a ferramenta de gestão de preços e ocupação do hotel.

### Importar ficheiro
1. Acesse `/sergio/` e faça login com `SERGIO` / `SERGIO`
2. Clique no quadrado de importação e selecione o ficheiro `.xls` / `.xlsx` exportado pelo software do hotel (Desbravador)
3. O sistema detecta automaticamente as colunas **Data**, **RN** e **%** de ocupação
4. As linhas `Data atual (Caixa)`, `Previsão` e tudo a partir de `Total` são ignoradas automaticamente

### Preencher preços
- Na coluna **Villa**: escreva o preço do quarto Villa Park para cada data
- Na coluna **Cortesia**: escreva o preço do concorrente para a mesma data
- Se não houver valor disponível (ocupação 100%), deixe em branco → aparece como `--`

### Calcular descontos
- A coluna **Desconto** calcula automaticamente ao digitar
- Mostra o múltiplo de 5% mínimo para que o preço Villa fique abaixo do concorrente
- Cada linha é colorida conforme o nível de desconto necessário

### Colunas -1 (histórico)
- **Villa -1** e **Cortesia -1** mostram os valores da sessão anterior para a mesma data
- Estes valores são guardados localmente no browser após clicar em **Compilar**

### Bloco da direita (separado pelo divisor visual)
- **Desconto Aplicado**: chip colorido por nível de desconto (um por linha, sorted crescente)
- **Datas**: datas no formato `dd/mm-dd/mm-...` que têm esse nível de desconto
- **Booking / Decolar / Expedia / Omnibees**: checkboxes aparecem apenas nas linhas com desconto ativo; no PDF marcado → "OK", desmarcado → vazio

### Compilar
- Guarda os valores actuais de Villa e Cortesia para a **próxima** importação
- Não altera o que está visível no ecrã actual

### Imprimir
- Gera PDF A4 paisagem (uma página)
- Checkboxes marcados aparecem como "OK" no PDF

---

## 📰 Notícias em tempo real

Por padrão o site usa o ficheiro `data/news.json`. Para ativar atualização automática:

1. Crie conta gratuita em [gnews.io](https://gnews.io) e obtenha uma API Key
2. No GitHub: **Settings → Secrets → Actions → New repository secret**
   - Nome: `GNEWS_API_KEY`
   - Valor: a sua chave
3. O workflow `.github/workflows/news.yml` atualiza as notícias todos os dias às 9h

---

## 🛠 Próximas funcionalidades (planeadas)

- [ ] Script de compilação dos relatórios Excel → dados do jornal (painel Admin)
- [ ] Integração com API meteorológica em tempo real
- [ ] Secção de relatórios dinâmica (ocupação, receita, F&B) na página principal
- [ ] Sistema de autenticação admin mais robusto
- [ ] Exportação dos dados Sergio para o jornal principal
