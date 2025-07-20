'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from './ui/button';

export default function ClipboardButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      onClick={handleCopy}
      size='icon'
      variant='ghost'
      className='text-muted-foreground hover:text-white'
    >
      {copied ? <Check className='size-4' /> : <Copy className='size-4' />}
    </Button>
  );
}
