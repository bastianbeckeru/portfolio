'use client';

import { Input } from '@/components/ui/input';
import { useState, useMemo, useCallback } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import { Label } from './ui/label';

// Tipos actualizados para reflejar ambas estructuras
// --------------------------------------------------

type StringListItem = {
  href?: string; // Opcional en el nuevo following.json
  value?: string; // Opcional en el nuevo following.json, pero crucial para followers
  timestamp: number;
};

// Nueva estructura para elementos en la lista de followers (ahora es un array)
type FollowerItem = {
  title: string;
  media_list_data: any[]; // Mantener como any[] o definir si es necesario
  string_list_data: StringListItem[];
};

// La estructura de 'following' no cambia mayormente en la raíz
type FollowingData = {
  relationships_following: {
    title: string;
    string_list_data: StringListItem[];
  }[];
};

type InstagramData = FollowingData | FollowerItem[];

type FileType = 'followers' | 'following';

function extractHandles(data: InstagramData, fileType: FileType): string[] {
  if (fileType === 'followers' && Array.isArray(data)) {
    return data.flatMap(
      (item) =>
        item.string_list_data
          .map((sl_item) => sl_item.value) // El handle está en 'value'
          .filter((value): value is string => !!value) // Filtrar valores nulos o indefinidos
    );
  } else if (
    fileType === 'following' &&
    !Array.isArray(data) &&
    'relationships_following' in data
  ) {
    return data.relationships_following.map((profile) => profile.title); // El handle está en 'title'
  }
  console.error(
    'Estructura de datos inesperada para el tipo de archivo:',
    fileType,
    data
  );
  return [];
}

export default function InstagramTool() {
  const [followers, setFollowers] = useState<string[]>([]);
  const [following, setFollowing] = useState<string[]>([]);

  // Memoized calculations
  const analytics = useMemo(() => {
    if (!followers.length || !following.length) {
      return null;
    }

    const followersSet = new Set(followers);
    const followingSet = new Set(following);

    return {
      mutual: followers.filter((handle) => followingSet.has(handle)),
      notFollowingBack: following.filter((handle) => !followersSet.has(handle)),
      notFollowedBack: followers.filter((handle) => !followingSet.has(handle)),
    };
  }, [followers, following]);

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files) return;

      const newFollowers: string[] = [...followers];
      const newFollowing: string[] = [...following];
      const followerFiles: File[] = [];

      Array.from(files).forEach((file) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          try {
            const result = e.target?.result as string;
            const jsonData = JSON.parse(result);

            if (
              file.name.startsWith('followers_') &&
              file.name.endsWith('.json')
            ) {
              // Manejo para followers_1.json, followers_2.json, etc.
              const handles = extractHandles(
                jsonData as FollowerItem[],
                'followers'
              );

              setFollowers((prev) => {
                const combinedHandles = Array.from(
                  new Set([...prev, ...handles])
                );
                return combinedHandles;
              });
            } else if (file.name === 'following.json') {
              const handles = extractHandles(
                jsonData as FollowingData,
                'following'
              );
              setFollowing(handles); // Reemplazamos el estado de 'following'
            }
          } catch (error) {
            console.error(`Error al parsear ${file.name}:`, error);
            alert(
              `Error al procesar el archivo ${file.name}. Asegúrate de que es un JSON de Instagram válido.`
            );
          }
        };

        reader.readAsText(file);
      });
    },
    [followers] // Dependencia de 'followers' para el merge de múltiples archivos de seguidores.
  );

  return (
    <div className='flex flex-col items-center gap-4 py-8 px-2'>
      <section className='py-6 gap-2 w-full max-w-md flex flex-col justify-center items-center border rounded-lg'>
        <FileInput
          id='followers'
          label='Seguidores'
          filename='Permite followers_1.json, followers_2.json, etc.'
          onChange={handleFileUpload}
          multiple // Permite seleccionar múltiples archivos de seguidores
        />
        <FileInput
          id='following'
          label='Seguidos'
          filename='following.json'
          onChange={handleFileUpload}
        />
      </section>

      {analytics ? (
        <section className='p-2 flex items-center flex-col gap-6 w-full max-w-4xl'>
          <Stats
            followersCount={followers.length}
            followingCount={following.length}
          />
          <Legend />
          <ResultsList analytics={analytics} />
        </section>
      ) : (
        <p className='text-muted-foreground'>
          Para comenzar, adjunta los archivos necesarios.
        </p>
      )}
    </div>
  );
}

// Subcomponentes
// ------------------

// El componente FileInput se actualiza para permitir la carga de múltiples archivos si es necesario
type FileInputProps = {
  id: string;
  label: string;
  filename: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  multiple?: boolean; // Nuevo prop para permitir múltiples archivos
};

function FileInput({
  id,
  label,
  filename,
  onChange,
  multiple = false,
}: FileInputProps) {
  return (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      <div className='flex flex-row gap-2 justify-between'>
        <Label htmlFor={id} className='font-bold'>
          {label}
        </Label>
        <span className='text-muted-foreground text-xs italic'>{filename}</span>
      </div>
      <Input
        id={id}
        type='file'
        accept='.json'
        onChange={onChange}
        multiple={multiple} // Aplicar el prop 'multiple' aquí
      />
    </div>
  );
}

type StatsProps = {
  followersCount: number;
  followingCount: number;
};

function Stats({ followersCount, followingCount }: StatsProps) {
  return (
    <div className='flex flex-row gap-4'>
      <StatCard value={followersCount} label='Seguidores' />
      <StatCard value={followingCount} label='Seguidos' />
    </div>
  );
}

function StatCard({ value, label }: { value: number; label: string }) {
  return (
    <div className='flex justify-center items-center flex-col text-xl font-bold'>
      <span>{value}</span>
      <p>{label}</p>
    </div>
  );
}

function Legend() {
  return (
    <div className='flex-col flex gap-2 text-sm'>
      <p>
        <span className='font-bold'>A:</span> Seguidores
      </p>
      <p>
        <span className='font-bold'>B:</span> Seguidos
      </p>
      <p>
        <span className='font-bold'>A ∩ B:</span> Personas que tú sigues y te
        siguen **(Mutuos)**
      </p>
      <p>
        <span className='font-bold'>B - A:</span> Seguidos que no te siguen
        **(Tú sigues, ellos NO)**
      </p>
      <p>
        <span className='font-bold'>A - B:</span> Seguidores que tú no sigues
        **(Ellos te siguen, tú NO)**
      </p>
    </div>
  );
}

type AnalyticsData = {
  mutual: string[];
  notFollowingBack: string[];
  notFollowedBack: string[];
};

function ResultsList({ analytics }: { analytics: AnalyticsData }) {
  return (
    <div className='flex flex-row gap-4 flex-wrap justify-center'>
      <ResultCard
        title='B - A: Seguidos que no te siguen'
        handles={analytics.notFollowingBack}
      />
      <ResultCard title='A ∩ B: Mutuos' handles={analytics.mutual} />
      <ResultCard
        title='A - B: Seguidores que no sigues'
        handles={analytics.notFollowedBack}
      />
    </div>
  );
}

type ResultCardProps = {
  title: string;
  handles: string[];
  hidden?: boolean;
};

function ResultCard({ title, handles, hidden = false }: ResultCardProps) {
  if (hidden) return null;

  return (
    <div className='flex flex-col gap-2'>
      <h2 className='font-semibold'>
        {title}: {handles.length}
      </h2>
      {
        <Command className='h-72 w-64'>
          <CommandInput placeholder='Buscar...' />
          <CommandList>
            <CommandEmpty>No se encontraron resultados.</CommandEmpty>
            <CommandGroup>
              {handles.map((handle, index) => (
                <CommandItem key={`${handle}-${index}`}>{handle}</CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      }
    </div>
  );
}
