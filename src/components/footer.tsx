import { quotes } from '@/server/local-db';

export default function Footer() {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]!;

  return (
    <footer className='border-t'>
      <div className='max-w-2xl mx-auto px-8 md:px-4 py-2'>
        <p className='font-serif italic text-muted-foreground text-left'>
          "{randomQuote.text}" — {randomQuote.author}
        </p>
      </div>
    </footer>
  );
}
