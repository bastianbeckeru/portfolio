'use client';

import { Input } from '@/components/ui/input';
import { useState } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import { Label } from './ui/label';

type JSONData = Record<string, any>;

export default function InstagramTool() {
  const [followers, setFollowers] = useState<JSONData | null>(null);
  const [following, setFollowing] = useState<JSONData | null>(null);

  const innerJoin = followers?.filter((handle: string) =>
    following?.includes(handle)
  );
  // Left Join excluding Inner Join
  const leftJoin = followers?.filter(
    (handle: string) => !following?.includes(handle)
  );
  // Right Join excluding Inner Join
  const rightJoin = following?.filter(
    (handle: string) => !followers?.includes(handle)
  );

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          try {
            const result = e.target?.result as string;
            const jsonData = JSON.parse(result);

            // Distinguir entre followers y following por nombre de archivo
            if (file.name === 'followers_1.json') {
              setFollowers(getHandleList(jsonData));
            } else if (file.name === 'following.json') {
              setFollowing(getHandleList(jsonData));
            }
          } catch (error) {
            console.error(`Error parsing ${file.name}:`, error);
          }
        };

        reader.readAsText(file);
      });
    }
  };

  /*   const clearFiles = () => {
    setFollowersFile(null);
    setFollowingFile(null);
  };
 */

  return (
    <div className='flex flex-col items-center gap-4 py-8 px-2'>
      <section className='py-6 gap-2 w-2/4 flex flex-col justify-center items-center border rounded-lg'>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <div className='flex flex-row gap-2 justify-between'>
            <Label htmlFor='followers' className='text-white font-bold'>
              Seguidores
            </Label>
            <span className='text-muted-foreground text-xs italic'>
              followers_1.json
            </span>
          </div>
          <Input
            id='followers'
            type='file'
            accept='.json'
            onChange={handleFileUpload}
          />
        </div>

        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <div className='flex flex-row gap-2 justify-between'>
            <Label htmlFor='following' className='text-white font-bold'>
              Seguidos
            </Label>
            <span className='text-muted-foreground text-xs italic'>
              following.json
            </span>
          </div>
          <Input
            id='following'
            type='file'
            accept='.json'
            onChange={handleFileUpload}
          />
        </div>
      </section>

      {followers?.length && following?.length ? (
        <section className='p-2 flex items-center flex-col gap-2'>
          <div className='text-white flex items-center flex-col gap-2'>
            <div className='flex flex-row gap-4'>
              <div className='flex justify-center items-center flex-col text-xl font-bold'>
                <span>{followers?.length}</span>
                <p>Seguidores</p>
              </div>
              <div className='flex justify-center items-center flex-col text-xl font-bold'>
                <span>{following?.length}</span>
                <p>Seguidos</p>
              </div>
            </div>
          </div>

          <div className='flex flex-row gap-2'>
            <div>
              <h2 className='text-white'>Left: {leftJoin?.length}</h2>
              <Command className='h-72'>
                <CommandInput placeholder='Search follower...' />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {leftJoin?.map((handle: string, index: number) => (
                      <CommandItem key={handle + index}>{handle}</CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
            <div>
              <h2 className='text-white'>Mid: {innerJoin?.length}</h2>
              <Command className='h-72'>
                <CommandInput placeholder='Search follower...' />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {innerJoin?.map((handle: string, index: number) => (
                      <CommandItem key={handle + index}>{handle}</CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
            <div>
              <h2 className='text-white'>Right: {rightJoin?.length}</h2>
              <Command className='h-72'>
                <CommandInput placeholder='Search follower...' />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {rightJoin?.map((handle: string, index: number) => (
                      <CommandItem key={handle + index}>{handle}</CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          </div>
        </section>
      ) : (
        <p className='text-muted-foreground'>
          Para comenzar, adjunta los archivos necesarios.
        </p>
      )}
    </div>
  );
}

type DataProps = {
  relationships_following: ProfileProps[];
};

type ProfileProps = {
  string_list_data: {
    value: string;
  }[];
};

function getHandleList(data: DataProps | ProfileProps[]): string[] {
  // Normalize the input to always be ProfileProps[]
  const profiles = Array.isArray(data) ? data : data.relationships_following;

  // Extract handles
  const handles = profiles.flatMap((profile) =>
    profile.string_list_data.map((item) => item.value)
  );

  return handles;
}
