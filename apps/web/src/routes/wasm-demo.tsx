import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

type WasmModule = typeof import('@shotoku-zei/wasm');

function WasmDemo() {
  const [loaded, setLoaded] = useState(false);
  const [income, setIncome] = useState('5000000');
  const [result, setResult] = useState<number | null>(null);
  const [wasm, setWasm] = useState<WasmModule | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadWasm() {
      try {
        const wasmModule = await import('@shotoku-zei/wasm');
        // bundlerターゲットの場合、initまたはdefaultで初期化
        if (wasmModule.default && typeof wasmModule.default === 'function') {
          await wasmModule.default();
        }
        setWasm(wasmModule);
        setLoaded(true);
      } catch (err) {
        console.error('Failed to load WASM:', err);
        setError('WebAssemblyモジュールの読み込みに失敗しました。ページを再読み込みしてください。');
      }
    }
    loadWasm();
  }, []);

  useEffect(() => {
    if (!wasm || !income) return;

    const incomeValue = parseFloat(income);
    if (Number.isNaN(incomeValue)) {
      setResult(null);
      return;
    }

    const calculator = new wasm.TaxCalculator(0.1);
    const tax = calculator.calculate_progressive(incomeValue);
    setResult(tax);
  }, [income, wasm]);

  if (error) {
    return (
      <div style={{ padding: '2rem', color: '#d32f2f' }}>
        <h2>エラー</h2>
        <p>{error}</p>
        <Link to="/" style={{ color: '#0070f3', textDecoration: 'none' }}>
          ← ホームに戻る
        </Link>
      </div>
    );
  }

  if (!loaded) {
    return <div style={{ padding: '2rem' }}>Loading WebAssembly...</div>;
  }

  return (
    <main style={{ padding: '2rem' }}>
      <Link to="/" style={{ color: '#0070f3', textDecoration: 'none' }}>
        ← 戻る
      </Link>

      <h1 style={{ marginTop: '1rem' }}>所得税計算デモ (Rust + WebAssembly)</h1>

      <div style={{ marginTop: '2rem' }}>
        <label>
          年収（円）:
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            style={{
              marginLeft: '1rem',
              padding: '0.5rem',
              fontSize: '1rem',
              width: '200px',
            }}
          />
        </label>
      </div>

      {result !== null && (
        <div style={{ marginTop: '2rem', fontSize: '1.2rem' }}>
          <strong>所得税額:</strong> ¥{result.toLocaleString('ja-JP')}
        </div>
      )}

      <div style={{ marginTop: '2rem', color: '#666' }}>
        <p>※ これは累進課税の簡易計算例です</p>
      </div>
    </main>
  );
}

export const Route = createFileRoute('/wasm-demo')({
  component: WasmDemo,
});
