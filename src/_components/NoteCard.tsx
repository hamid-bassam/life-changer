"use client";
import { PartialBlock } from '@blocknote/core';
import { useCreateBlockNote } from '@blocknote/react';
import { Note } from '@prisma/client';
import { Edit, Trash } from 'lucide-react';
import Link from 'next/link';
import { Card, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
export type NoteCardProps = {
  note: Note
};

export const NoteCard = async (props: NoteCardProps) => {
  const editor = useCreateBlockNote({
    initialContent: props.note.document as PartialBlock[],
  });
  const html = await editor.blocksToFullHTML(editor.document);
  return (
    <Card
      className="sm:col-span-2 " x-chunk="dashboard-05-chunk-0"
    >
      <CardHeader className='pt-2 pr-2'>
        <div className='flex flex-col gap-4'>
          <div className='flex justify-end gap-2'>

            <Trash className="cursor-pointer text-destructive/80 transition-all hover:scale-125 hover:text-destructive h-4" />

            <Link href={`note/${props.note.id}`} className="group hover:text-primary">
              <Edit className="h-4 transition-all group-hover:scale-125" />
            </Link>
          </div>
          <CardTitle>{props.note.title}</CardTitle>



        </div>

      </CardHeader>
      <CardDescription className='p-4'> <div dangerouslySetInnerHTML={{ __html: html }} /></CardDescription>


    </Card>

  );
};