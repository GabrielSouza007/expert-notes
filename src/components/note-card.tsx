import * as Dialog from '@radix-ui/react-dialog';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { X } from 'lucide-react';

interface NoteCardProps {
  note: {
    id: string
    date: Date
    content: string
  }
  onNoteDeleted: (id: string) => void
}

export function NoteCard({ note, onNoteDeleted }: NoteCardProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className='rounded-md text-left flex flex-col align-top bg-slate-800 p-5 gap-3 outline-none overflow-hidden relative md:hover:ring-2 md:hover:ring-slate-600 lg:hover:ring-2 lg:hover:ring-slate-600 md:focus-visible:ring-2 md:focus-visible:ring-lime-400 lg:focus-visible:ring-2 lg:focus-visible:ring-lime-400'>
        <span className='text-sm font-medium text-slate-300'>
          {formatDistanceToNow(note.date, { locale: enUS, addSuffix: true })}
        </span>
        <p className='text-sm leading-6 text-slate-400'>
          {note.content}
        </p>
        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none' />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='inset-0 fixed bg-black/50' />
        <Dialog.Content className='fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] md:h-[60vh] w-full bg-slate-700 md:rounded-md flex flex-col outline-none'>

          <Dialog.Close className='absolute right-0 top-0 bg-slate-800 md:rounded-md p-1 outline-none text-slate-400 hover:text-slate-100'>
            <X size={20} />
          </Dialog.Close>

          <div className='flex flex-1 flex-col gap-3 p-5'>
            <span className='text-sm font-medium text-slate-300'>
              {formatDistanceToNow(note.date, { locale: enUS, addSuffix: true })}
            </span>

            <p className='text-sm leading-6 text-slate-400'>
              {note.content}
            </p>
          </div>

          <button
            type='button'
            className='w-full bg-slate-800 py-2 text-center text-sm text-slate-300 outline-none font-medium group'
            onClick={() => onNoteDeleted(note.id)}
          >
            Want to <span className='text-red-400 lg:group-hover:underline'>delete this note</span>?
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}