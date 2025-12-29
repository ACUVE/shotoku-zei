import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@shotoku-zei/ui';
import { Link } from '@tanstack/react-router';

function Home() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Shotoku Zei</h1>
      <p>pnpm + Turborepo モノレポプロジェクト</p>
      <div style={{ marginTop: '1rem' }}>
        <Button>クリックしてね！</Button>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <Link to="/wasm-demo">
          <Button>WebAssembly デモを見る →</Button>
        </Link>
      </div>
    </main>
  );
}

export const Route = createFileRoute('/')({
  component: Home,
});
