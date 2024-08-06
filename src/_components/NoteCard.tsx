import { Note } from '@prisma/client';
import { Button } from "../components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
export type NoteCardProps = {
  note: Note
};

export const NoteCard = (props: NoteCardProps) => {
  return (
    <Card
      className="sm:col-span-2" x-chunk="dashboard-05-chunk-0"
    >
      <CardHeader className="pb-3">
        <CardTitle>{props.note.title}</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          {props.note.content}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button>Update</Button>
      </CardFooter>
    </Card>

  );
};