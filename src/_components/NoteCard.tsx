"use client";
// import { PartialBlock } from '@blocknote/core';
// import { useCreateBlockNote } from '@blocknote/react';
import { Note } from '@prisma/client';
import { Edit, Trash } from 'lucide-react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle } from "../components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from '@nextui-org/react';
import { useState } from 'react';
import { deleteNote } from '../actions/actions';
import { Button } from '../components/ui/button';
export type NoteCardProps = {
  note: Note
};

export const NoteCard = async (props: NoteCardProps) => {
  // const editor = useCreateBlockNote({
  //   initialContent: props.note.document as PartialBlock[],
  // });
  const [isDeleting, setIsDeleting] = useState(false);
  // const html = await editor.blocksToFullHTML(editor.document);

  return (
    <Card
      className="sm:col-span-2 " x-chunk="dashboard-05-chunk-0"
    >
      <CardHeader className='pt-2 pr-2'>
        <div className='flex flex-col gap-4'>
          <div className='flex justify-end gap-2'>
            <Dialog>
              <DialogTrigger asChild>
                <Trash className="cursor-pointer text-destructive/80 transition-all hover:scale-125 hover:text-destructive h-4" />

              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className='flex flex-col gap-4'>
                  <DialogTitle><div className='flex w-full items-center justify-center'><Trash className='h-10 w-10 rounded-full border border-destructive p-2 text-destructive' /></div></DialogTitle>
                </DialogHeader>
                {!isDeleting ? (
                  <>
                    <DialogDescription>
                      Are you sure you want to delete this note?
                    </DialogDescription>

                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Title
                        </Label>
                        <Input
                          id="name"
                          defaultValue={props.note.title}
                          className="col-span-3"
                          disabled
                        />
                      </div>

                    </div>
                  </>
                ) : <div className='h-full flex flex-col flex-grow items-center justify-center'> <Spinner></Spinner></div>}
                <DialogFooter>
                  <Button variant={'destructive'} onClick={async () => {
                    setIsDeleting(true);
                    await deleteNote(props.note.id);
                    setIsDeleting(false);
                  }
                  }>Delete</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Link href={`note/${props.note.id}`} className="group hover:text-primary">
              <Edit className="h-4 transition-all group-hover:scale-125" />
            </Link>
          </div>
          <CardTitle>{props.note.title}</CardTitle>



        </div>

      </CardHeader>
      {/* <CardDescription className='p-4'> <div dangerouslySetInnerHTML={{ __html: html }} /></CardDescription> */}


    </Card>

  );
};