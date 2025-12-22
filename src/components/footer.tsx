const phrases = [
  'Simplicity is the ultimate sophistication',
  'Stay hungry. Stay foolish.',
];

export default function Footer() {
  return (
    <footer className='border-t'>
      <div className='max-w-2xl mx-auto px-8 md:px-4 py-2'>
        <p className='font-serif italic text-muted-foreground text-left'>
          {phrases[Math.floor(Math.random() * phrases.length)]}
        </p>
      </div>
    </footer>
  );
}
