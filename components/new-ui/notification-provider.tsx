'use client';

import * as React from 'react';
import {
  RiAlertFill,
  RiCheckboxCircleFill,
  RiCloseLine,
  RiErrorWarningFill,
  RiInformationFill,
  RiMagicFill,
} from '@remixicon/react';

import { useNotification } from '@/hooks/use-notification';
import * as Modal from '@/components/new-ui/modal';
import { cn } from '@/utils/cn';

const iconByStatus = {
  success: RiCheckboxCircleFill,
  warning: RiAlertFill,
  error: RiErrorWarningFill,
  information: RiInformationFill,
  feature: RiMagicFill,
} as const;

const panelToneByStatus = {
  success: 'border-success-light bg-success-lighter/60',
  warning: 'border-warning-light bg-warning-lighter/60',
  error: 'border-error-light bg-error-lighter/60',
  information: 'border-information-light bg-information-lighter/60',
  feature: 'border-faded-light bg-faded-lighter/60',
} as const;

const NotificationProvider = () => {
  const { notifications, dismiss } = useNotification();
  const activeNotification = notifications[0];

  if (!activeNotification) return null;

  const {
    id,
    status = 'information',
    title,
    description,
    action,
    disableDismiss = false,
    open = true,
    onOpenChange,
  } = activeNotification;

  const Icon = iconByStatus[status] ?? RiInformationFill;

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange?.(nextOpen);
    if (!nextOpen) dismiss(id);
  };

  return (
    <Modal.Root open={open} onOpenChange={handleOpenChange} modal={false}>
      <Modal.Content
        showClose={false}
        className='w-full max-w-[560px] rounded-2xl bg-bg-white-0 p-0'
        overlayClassName='fixed inset-0 z-[130] bg-black/55 p-4 backdrop-blur-sm'
      >
        <div className='relative p-6'>
          {!disableDismiss && (
            <button
              type='button'
              aria-label='Close notification'
              onClick={() => handleOpenChange(false)}
              className='absolute right-4 top-4 inline-flex size-8 items-center justify-center rounded-md text-text-soft-400 transition duration-200 ease-out hover:bg-bg-weak-50 hover:text-text-sub-600'
            >
              <RiCloseLine className='size-5' />
            </button>
          )}

          <div
            className={cn(
              'rounded-xl border px-4 py-4',
              panelToneByStatus[status] ?? panelToneByStatus.information,
            )}
          >
            <div className='flex items-start gap-3'>
              <Icon className='mt-0.5 size-5 shrink-0 text-text-strong-950' />
              <div className='min-w-0 flex-1'>
                {title && (
                  <div className='text-label-md text-text-strong-950'>
                    {title}
                  </div>
                )}
                {description && (
                  <div className='mt-1 text-paragraph-sm text-text-sub-600'>
                    {description}
                  </div>
                )}
                {action && <div className='mt-3 flex items-center gap-2'>{action}</div>}
              </div>
            </div>
          </div>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};

export { NotificationProvider };
