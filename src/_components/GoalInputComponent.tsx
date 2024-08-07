import { Goal } from "@prisma/client";

export type GoalInputComponentProps = {
  goal?: Goal | null;
};

export const GoalInputComponent = (props: GoalInputComponentProps) => {
  return (
    <div>
      <h1>{props.goal?.title ?? "gello"}</h1>
      <p>{props.goal?.description ?? 'whassap'}</p>
    </div>
  )
};