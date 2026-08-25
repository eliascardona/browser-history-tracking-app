import { type ReactNode } from 'react';
import { Button } from '../ui/button';

export function TriggerButtonsWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="grid">
      <div className="grid w-3/4 gap-2 justify-self-center">{children}</div>
    </div>
  );
}

export function TriggerButton({
  onClick,
  text,
}: {
  onClick: () => void;
  text: string;
}) {
  return (
    <div className="p-4">
      <Button type="button" variant={'outline'} onClick={onClick}>
        {text}
      </Button>
    </div>
  );
}
