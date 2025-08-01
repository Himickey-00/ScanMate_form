# ScanMate_form

このリポジトリは `create-next-app` で作成された Next.js 製のフォームプロトタイプです。 ZIP 解凍から動作確認してもらうための手順を以下にまとめています。


## 前提条件（受け取る側）
- **Node.js（LTS 18 以上推奨）** がインストールされていること。インストールされていない場合は公式サイトから LTS 版をダウンロードしてインストールしてください。インストール後、ターミナル（コマンドプロンプト）で下記を実行して確認します：
- 
  ```bash
  node -v
  npm -v
  ```
- （任意）`yarn` や `pnpm` を使う場合はそれぞれインストールしてください。`npm` だけでも動作します。
- [Node.jsダウンロードリンク](https://learn.microsoft.com/ja-jp/windows/dev-environment/javascript/nodejs-on-windows)

## ZIP を使った受け取り手順

1. 送られてきた ZIP ファイルを解凍します。解凍後、`ScanMate_form-1` フォルダが現れます。

2. ターミナル（またはコマンドプロンプト）を開き、解凍したフォルダに移動します：
   ```bash
   cd ScanMate_form-1
   ```

## セットアップと起動

1. 依存関係をインストールします：
   ```bash
   npm install
   ```
   yarn を使う場合は `yarn`、pnpm の場合は `pnpm install`。

2. 開発サーバーを起動します：
   ```bash
   npm run dev
   ```
   （または `yarn dev` / `pnpm dev` / `bun dev`）

3. ブラウザで以下を開きます：
   ```
   http://localhost:3000
   ```
   ターミナルに地味〜な感じでいます。

4. 実際のフォームプロトタイプに触るには、トップページの該当ボタン（例：「デモを申し込む」「次へ」など）をクリックし、以下の流れで操作してください：
   1. 入力画面に必要事項を記入。  
   2. 確認画面で内容を確かめる。  (**完了画面はまだです！！申し込むボタンは押しても特に何も起きません**)


## よくあるトラブルと対処

- `node` コマンドが見つからない / バージョンが表示されない  
  → Node.js がインストールされていないかパスが通っていない可能性があります。インストール後、ターミナルを再起動してください。

- ポート `3000` がすでに使われている  
  → 別のポートで起動します（Mac/Linux）：
  ```bash
  PORT=3001 npm run dev
  ```
  Windows（PowerShell）では：
  ```powershell
  $env:PORT=3001; npm run dev
  ```

- 依存関係のインストールでエラーが出る  
  ```bash
  npm ci
  npm cache clean --force
  ```
  を試してから再度 `npm install`。
