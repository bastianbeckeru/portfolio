import ClipboardButton from './clipboard-button';
import { Button } from './ui/button';

export default function Footer() {
  const email = 'bastianbeckeru@gmail.com';

  return (
    <footer className='border-t mt-20 pt-10 pb-6 text-sm text-muted-foreground text-center'>
      <div className='flex flex-col items-center gap-2'>
        <p>¿Hablamos?</p>

        <div className='flex items-center gap-2'>
          <a
            href={`mailto:${email}`}
            className='text-sm hover:underline underline-offset-4 transition-colors text-muted-foreground'
          >
            {email}
          </a>
          <ClipboardButton text={email} />
        </div>

        <div className='flex gap-4 mt-2'>
          <a
            href='https://www.instagram.com/bastianbeckeru'
            target='_blank'
            rel='noopener noreferrer'
          >
            Instagram
          </a>
          <a
            href='https://www.linkedin.com/in/bastianbeckeru'
            target='_blank'
            rel='noopener noreferrer'
          >
            LinkedIn
          </a>
          <a
            href='https://github.com/bastianbeckeru'
            target='_blank'
            rel='noopener noreferrer'
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
