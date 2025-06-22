import React, { FC } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TUserViewProps } from '@/features/admin/users/components/UserView/type';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import { getInitials } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { UserStatus } from '@/constants';
import { useUserView } from '@/features/admin/users/components/UserView/useUserView';
import { format } from 'date-fns';
const UserView: FC<TUserViewProps> = ({ open, onOpenChange, selectedUser }) => {
  const { user, handleActiveUser, profile } = useUserView(selectedUser);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User ID: #{selectedUser?.id}</DialogTitle>
        </DialogHeader>
        {user && (
          <div className="flex flex-col w-full">
            <div className="flex flex-col md:flex-row w-full">
              <div className="w-full">
                <div className="flex items-start gap-2 mb-6">
                  <Avatar className="h-16 w-16 mb-2 ring-1 ring-primary/80 ring-offset-2">
                    {user.avatar ? (
                      <AvatarImage src={user.avatar} alt={user.fullName} />
                    ) : (
                      <AvatarFallback className="bg-gray-300 text-gray-600">
                        {getInitials(user.fullName)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="">
                    <h2 className="text-lg font-medium">{user.fullName}</h2>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <p className="text-sm text-gray-600">{user.phoneNumber}</p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="capitalize text-xs space-x-2">
                      <span
                        className={`px-2 py-1 rounded-full font-medium ${
                          user.role.name === 'ADMIN'
                            ? 'bg-blue-100 text-blue-800'
                            : user.role.name === 'PARTNER'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {user.role.name}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full font-medium ${
                          user.status === 'ACTIVE'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {user.status}
                      </span>
                      <span className="text-gray-600">
                        {format(new Date(user.createdAt || ''), 'dd/MM/yyyy')}
                      </span>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    <p className="text-sm">
                      Gender: <span className="font-normal">{user.gender}</span>
                    </p>
                    <p className="text-sm">
                      Birthday:{' '}
                      <span className="font-normal">
                        {user.birthday
                          ? format(new Date(user.birthday), 'dd/MM/yyyy')
                          : ''}
                      </span>
                    </p>
                    <p className="text-sm">
                      Account Number:{' '}
                      <span className="font-normal">{user.accountNumber}</span>
                    </p>
                    <p className="text-sm">
                      Bank Account:{' '}
                      <span className="font-normal">{user.bankAccount}</span>
                    </p>
                    <p className="text-sm">
                      Bank Name:{' '}
                      <span className="font-normal">{user.bankName}</span>
                    </p>
                    <p className="text-sm">
                      Address:{' '}
                      <span className="font-normal">{user.address}</span>
                    </p>
                  </div>
                  {user.status === UserStatus.ACTIVE ? (
                    <div className="mt-8 mr-2 flex justify-end">
                      <Button
                        variant="destructive"
                        disabled={user.id === profile?.id}
                        onClick={() =>
                          handleActiveUser(UserStatus.INACTIVE, onOpenChange)
                        }
                      >
                        InActive
                      </Button>
                    </div>
                  ) : (
                    <div className="mt-8 mr-2 flex justify-end">
                      <Button
                        variant="default"
                        disabled={user.id === profile?.id}
                        onClick={() =>
                          handleActiveUser(UserStatus.ACTIVE, onOpenChange)
                        }
                      >
                        Active
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserView;
