# @shotoku-zei/wasm

Rust で書かれた WebAssembly パッケージです。

## ビルド

```bash
# wasm-pack のインストール（初回のみ）
cargo install wasm-pack

# ビルド
pnpm build
```

## 使い方

```typescript
import init, { greet, TaxCalculator } from '@shotoku-zei/wasm';

// 初期化
await init();

// 関数の使用
const message = greet('世界');
console.log(message); // "Hello, 世界!"

// クラスの使用
const calculator = new TaxCalculator(0.1);
const tax = calculator.calculate_progressive(5000000);
console.log(tax);
```
