'use client';
import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';
import { TPeopleSelectorProps } from '@/components/PeopleSelector/type';
import { cn } from '@/lib/utils';
import { usePeopleSelector } from '@/components/PeopleSelector/usePeopleSelector';

const PeopleSelector: FC<TPeopleSelectorProps> = ({
  options: initialOptions,
  onChange,
  onDone,
  className = '',
}) => {
  const { handleIncrement, handleDecrement, handleDone } = usePeopleSelector(
    initialOptions,
    onChange,
    onDone,
  );
  return (
    <div className={cn('grid gap-2', className)}>
      <div className="w-full bg-white rounded-md shadow-lg border">
        <div className="p-4 space-y-4">
          {initialOptions.map((option) => (
            <div key={option.id} className="flex items-center justify-between">
              <div>
                <div className="font-medium">{option.label}</div>
                {option.description && (
                  <div className="text-xs text-gray-500">
                    {option.description}
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleDecrement(option.id)}
                  disabled={option.count <= option.min}
                >
                  <Minus size={16} />
                </Button>
                <span className="w-6 text-center">{option.count}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleIncrement(option.id)}
                  disabled={option.count >= option.max}
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>
          ))}
          <Button className="w-full mt-4" onClick={handleDone}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PeopleSelector;
