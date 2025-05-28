'use client';

import { useState } from 'react';
import { Check, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { UserType } from '@/types/UserType';
import { useRouter } from 'next/navigation';
import linkTo from '@/utils/linkTo';

function SearchUserClient({ userList }: { userList: UserType[] }) {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const router = useRouter();

  const handleSelectUser = (user: UserType) => {
    setSelectedUser(user);
    setOpen(false);
    router.push(`${linkTo.profile}/${user.id}`);
  };

  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button aria-expanded={open} className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Search className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full max-w-md p-0" align="end">
          <Command>
            <CommandInput placeholder="Tìm kiếm theo tên hoặc email..." />
            <CommandList>
              <CommandEmpty>
                <div className="text-center text-red-600 p-2">Không tìm thấy người dùng nào.</div>
              </CommandEmpty>
              <CommandGroup>
                {userList.map(user => (
                  <CommandItem
                    key={user.id}
                    value={`${user.fullName} ${user.email} ${user.username}`}
                    onSelect={() => handleSelectUser(user)}
                    className="flex items-center gap-3 p-3 cursor-pointer"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || '/placeholder.svg'} alt={user.fullName} />
                      <AvatarFallback className="text-sm">{getInitials(user.fullName)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                      <div className="font-medium truncate">{user.fullName}</div>
                      <div className="text-sm text-muted-foreground truncate">{user.email}</div>
                    </div>
                    <Check
                      className={cn('ml-auto h-4 w-4', selectedUser?.id === user.id ? 'opacity-100' : 'opacity-0')}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default SearchUserClient;
