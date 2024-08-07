import React from 'react';
import prisma from '../lib/prisma';


export type EditorLogicProps = {
  children?: React.ReactNode;
  id: string;
};

export const EditorLogic = async (props: EditorLogicProps) => {
  const note = await prisma.note.findUnique({ where: { id: props.id } });

  return (
    <>
      {props.children}
    </>




  )
};