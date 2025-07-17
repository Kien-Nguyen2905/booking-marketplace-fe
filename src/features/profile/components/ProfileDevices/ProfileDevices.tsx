import { useGetAllDevicesQuery } from '@/queries/useAuth';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Laptop, ServerOff, SmartphoneIcon, TabletIcon } from 'lucide-react';
import { format } from 'date-fns';
import { GetAllDevicesResType } from '@/models';

const ProfileDevices = () => {
  const { data: devicesData } = useGetAllDevicesQuery();
  const devices = (devicesData?.data?.data || []) as GetAllDevicesResType[];

  return (
    <div className="p-4 lg:p-6 border-0 shadow-none">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Device</TableHead>
            <TableHead>Browser & OS</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {devices.map((device) => (
            <TableRow key={device.id}>
              <TableCell className="flex items-center gap-2">
                {device.deviceType?.toLowerCase() === 'mobile' ? (
                  <SmartphoneIcon className="w-4 h-4" />
                ) : device.deviceType?.toLowerCase() === 'tablet' ? (
                  <TabletIcon className="w-4 h-4" />
                ) : device.deviceType?.toLowerCase() === 'computer' ? (
                  <Laptop className="w-4 h-4" />
                ) : (
                  <ServerOff className="w-4 h-4" />
                )}
                {device.deviceType}
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span>{device.browser}</span>
                  <span className="text-xs text-gray-500">{device.os}</span>
                </div>
              </TableCell>
              <TableCell>
                {device.lastActive &&
                  format(new Date(device.lastActive), 'HH:mm:ss dd/MM/yyyy')}
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  {device.isMe ? (
                    <Badge
                      variant="default"
                      className="w-fit bg-[var(--blue-primary)]"
                    >
                      Current device
                    </Badge>
                  ) : (
                    <Badge
                      variant={device.isActive ? 'secondary' : 'destructive'}
                      className="w-fit"
                    >
                      {device.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProfileDevices;
