

import { Note } from '@prisma/client';
import { Edit } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

import { deleteNote } from '../actions/actions';
import { Delete } from './Delete';
export type NoteCardProps = {
  note: Note
};

export const NoteCard = (props: NoteCardProps) => {

  return (
    <Card
      className="sm:col-span-2  max-h-64 overflow-y-auto" x-chunk="dashboard-05-chunk-0"
    >
      <CardHeader className='pt-2 pr-2'>
        <div className='flex flex-col gap-4'>
          <div className='flex justify-end gap-2'>
            <Delete id={props.note.id} deleteAction={deleteNote} message='Are you sure you want to delete this note?' title={props.note.title} />

            <Link href={`notes/${props.note.id}`} className="group hover:text-primary">
              <Edit className="h-4 transition-all group-hover:scale-125" />
            </Link>
          </div>
          <CardTitle>{props.note.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className='p-4'> <div dangerouslySetInnerHTML={{ __html: props.note.htmlContent || '' }} /></CardContent>
    </Card>

  );
};