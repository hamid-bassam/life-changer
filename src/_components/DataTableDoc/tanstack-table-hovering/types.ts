import type { OnChangeFn, Row, Updater } from "@tanstack/react-table";

export interface HoveringOptions {
  onRowHoveringChange?: OnChangeFn<RowHoveringState | undefined>;
}

export type RowHoveringState = Record<string, string>;

export interface HoveringTableState {
  rowHovering?: RowHoveringState;
  rowAddInput?: RowHoveringState;

}

export interface HoveringTableAPI<TData> {
  getHoveredRows(): Row<TData>[];
  setHoveredRows(updater: Updater<RowHoveringState | undefined>): void;
  getAddInputRow(): Row<TData> | undefined;
  setAddInputRow(row: Row<TData> | undefined): void;
  resetAddInput(): void;
}

export interface HoveringRowAPI {
  getIsHovered(): boolean;
  toggleHovered(toggle?: boolean): void;
  addInput(type: string): void;
  getShowInput(): string | undefined;
  resetAddInput(): void;

}

