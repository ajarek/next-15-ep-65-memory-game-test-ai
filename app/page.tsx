import MemoryGame from '@/components/MemoryGame';


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24 max-sm:px-4 py-4 bg-slate-600">
      
      <MemoryGame />
    </main>
  );
}
