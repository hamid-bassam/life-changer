'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from '@nextui-org/react';

import { Trash } from 'lucide-react';
import { useState } from "react";
import { Button } from "../components/ui/button";


export type DeleteProps = {
  id: string,
  deleteAction: (id: string) => Promise<void>,
  message: string,
  title?: string,
};

export const Delete = (props: DeleteProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);
  return (
    <Dialog onOpenChange={setDeleted}>
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
              {props.message}
            </DialogDescription>

            {props.title ? <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Title
                </Label>
                <Input
                  id="name"
                  defaultValue={props.title}
                  className="col-span-3"
                  disabled
                />
              </div>

            </div> : null}
          </>
        ) : <div className='h-full flex flex-col flex-grow items-center justify-center'> <Spinner></Spinner></div>}
        <DialogFooter>

          <Button variant={'destructive'} onClick={async () => {
            setIsDeleting(true);
            await props.deleteAction(props.id);

            setIsDeleting(false);
            setDeleted(true);
          }
          }>Delete</Button>

        </DialogFooter>
      </DialogContent>
    </Dialog>

  );
};