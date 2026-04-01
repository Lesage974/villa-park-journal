# 📰 Journal do Villa Park Hotel Recife

Site de jornal diário interno do Villa Park Hotel Recife, hospedado no GitHub Pages.

---

## 🚀 Como publicar no GitHub Pages (passo a passo)

### 1. Criar uma conta GitHub (se ainda não tiver)
1. Acesse [github.com](https://github.com) e clique em **Sign up**
2. Crie uma conta gratuita

### 2. Criar o repositório
1. Clique no botão **+** (canto superior direito) → **New repository**
2. Nome do repositório: `villa-park-journal` (ou qualquer nome)
3. Deixe **Public** selecionado
4. Clique em **Create repository**

### 3. Fazer upload dos ficheiros
1. Na página do repositório, clique em **uploading an existing file**
2. Arraste **todos** os ficheiros e pastas desta pasta para lá:
   - `index.html`
   - `style.css`
   - `news.js`
   - `assets/` (pasta com o logo)
   - `admin/` (pasta com index.html e admin.css)
3. Clique em **Commit changes**

### 4. Ativar o GitHub Pages
1. No repositório, clique em **Settings** (engrenagem)
2. No menu esquerdo, clique em **Pages**
3. Em **Source**, selecione **Deploy from a branch**
4. Em **Branch**, selecione `main` e pasta `/ (root)`
5. Clique em **Save**
6. Aguarde 1-2 minutos

### 5. Acessar o site
O site estará disponível em:
```
https://SEU_USERNAME.github.io/villa-park-journal/
```

---

## 📰 Notícias em tempo real (opcional)

Por padrão o site usa manchetes de exemplo. Para ativar notícias reais:

1. Acesse [gnews.io](https://gnews.io) e crie uma conta gratuita
2. Copie a sua **API Key**
3. Abra o ficheiro `news.js`
4. Substitua `'YOUR_GNEWS_KEY'` pela sua chave real
5. Faça upload novamente do ficheiro `news.js` para o GitHub

---

## 🔐 Acesso Admin

- URL: `https://SEU_USERNAME.github.io/villa-park-journal/admin/`
- Utilizador: `admin`
- Palavra-passe: `admin`

---

## 📁 Estrutura de ficheiros

```
villa-park-journal/
├── index.html          # Página principal (jornal)
├── style.css           # Estilos do jornal
├── news.js             # Carregamento de notícias
├── assets/
│   └── logo.png        # Logo do hotel
├── admin/
│   ├── index.html      # Painel de administração
│   └── admin.css       # Estilos do admin
└── README.md           # Este ficheiro
```

---

## 🛠 Próximas funcionalidades (planeadas)

- [ ] Script de compilação dos relatórios Excel → dados do jornal
- [ ] Integração com API meteorológica em tempo real
- [ ] Secção de relatórios dinâmica (ocupação, receita, F&B)
- [ ] Sistema de autenticação admin mais robusto
