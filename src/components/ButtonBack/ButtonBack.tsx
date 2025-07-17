import { Button } from '../ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const ButtonBack = ({ link = '#' }: { link: string }) => {
  return (
    <Link href={link}>
      <Button type="button" variant="outline" className="min-w-[60px] h-9">
        <ArrowLeft className="mr-1" />
        Back
      </Button>
    </Link>
  );
};

export default ButtonBack;
