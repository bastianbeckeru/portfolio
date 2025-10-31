'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';

type DownloadButtonProps = {
  media: {
    name: string;
    url: string;
  };
};

export default function DownloadButton({ media }: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const blobRef = useRef<Blob | null>(null);
  const { name, url } = media;

  async function handleDownload() {
    setIsDownloading(true);

    try {
      // Usar blob cacheado si existe
      let blob = blobRef.current;

      if (!blob) {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to fetch file: ${response.status}`);
        }

        blob = await response.blob();
        blobRef.current = blob;
      }

      const blobUrl = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Cleanup después de un delay para asegurar que la descarga inicie
      setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
    } catch (error) {
      console.error('Failed to download file:', error);
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <Button
      aria-label={`Descargar ${name}`}
      className='[&_svg]:size-4 bg-rose-500'
      disabled={isDownloading}
      onClick={handleDownload}
    >
      {name}{' '}
      {isDownloading ? <Loader2 className='animate-spin' /> : <Download />}
    </Button>
  );
}
