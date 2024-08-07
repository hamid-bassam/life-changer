import { Note } from '@prisma/client';
import { Edit } from 'lucide-react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle } from "../components/ui/card";
export type NoteCardProps = {
  note: Note
};

export const NoteCard = (props: NoteCardProps) => {
  return (
    <Card
      className="sm:col-span-2" x-chunk="dashboard-05-chunk-0"
    >
      <CardHeader>
        <div className='flex'>

          <CardTitle>{props.note.title}</CardTitle>
          <Link href={`note/${props.note.id}`} className="ml-auto">
            <Edit className="ml-auto" />
          </Link>
        </div>

      </CardHeader>

    </Card>

  );
};