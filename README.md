# Shotoku Zei

pnpm と Turborepo を使ったモノレポプロジェクトです。

## 構成

- `apps/web`: Vite + React + TanStack Router アプリケーション
- `packages/ui`: 共有 UI コンポーネント
- `packages/wasm`: Rust + WebAssembly による所得税計算ライブラリ
- `packages/tsconfig`: 共有 TypeScript 設定

## セットアップ

```bash
# 依存関係のインストール
pnpm install

# 開発サーバーの起動
pnpm dev

# ビルド
pnpm build
```

## スクリプト

- `pnpm dev` - 全てのアプリを開発モードで起動
- `pnpm build` - 全てのアプリをビルド
- `pnpm lint` - 全てのアプリで lint を実行
- `pnpm test` - 全てのアプリでテストを実行
