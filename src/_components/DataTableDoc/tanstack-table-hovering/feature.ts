
import { functionalUpdate, makeStateUpdater, Row, RowData, Table, TableFeature, TableOptionsResolved, TableState, Updater } from "@tanstack/react-table";
import type {
  HoveringOptions,
  HoveringRowAPI,
  HoveringTableAPI,
  HoveringTableState,
  RowHoveringState,
} from "./types.js";

/**
 * The Hovering feature definition.
 *
 * Example:
 *
 * ```tsx
 * import { useReactTable } from "@tanstack/react-table";
 * import { HoveringFeature } from "tanstack-table-hovering";
 *
 * const columnHelper = createColumnHelper<Data>();
 *
 * const columns = [
 *   columnHelper.accesor('name', {
 *     header: 'Name',
 *   }),
 *   columnHelper.display({
 *     id: 'actions',
 *     cell: ({ row }) => {
 *       if (!row.getIsHovered()) {
 *         return null;
 *       }
 *
 *       return <button onClick={() => alert('Clicked!')}>Click me</button>;
 *     },
 *     header: 'Actions',
 *   }),
 * ];
 *
 * const table = useReactTable({
 *   ...
 *   columns,
 *   _features: [HoveringFeature],
 *   ...
 * });
 *
 * return (
 *  <table>
 *    <tbody>
 *      {table.rows.map(row => (
 *        <tr
 *          key={row.id}
 *          onMouseEnter={() => row.toggleHovered()}
 *          onMouseLeave={() => row.toggleHovered()}
 *        >
 *          {row.cells.map(cell => (
 *            <td key={cell.id}>
 *              {flexRender(cell.column.columnDef.cell, cell.getContext())}
 *            </td>
 *          ))}
 *        </tr>
 *      ))}
 *    </tbody>
 *  </table>
 * )
 * ```
 */
export const HoveringFeature = {
  createRow<TData extends RowData>(row: Row<TData>, table: Table<TData>): void {
    type RowWithHover = Row<TData> & HoveringRowAPI;

    (row as RowWithHover).getIsHovered = () =>
      Boolean((table.getState() as HoveringTableState).rowHovering?.[row.id]);

    (row as RowWithHover).toggleHovered = (toggle?: boolean) =>
      // mettre a jour le state de la table pour hover le row et enlever tous les autres

      table.setState((old: TableState & HoveringTableState) => ({
        ...old,
        rowHovering: {
          [row.id]: toggle ?? !old.rowHovering?.[row.id],
        },
        // rowAddInput: {
        //   // if a row is selected, we don't want to show the input

        //   [row.id]: old.rowHovering?.[row.id] === false ? false : old.rowAddInput?.[row.id],
        // },
      }));


    (row as RowWithHover).addInput = () => {
      console.log('addInput function called');
      return table.setState((old: TableState & HoveringTableState) => ({
        ...old,
        rowAddInput: {
          [row.id]: true,
        },
      }));

    }






    (row as RowWithHover).getShowInput = () =>
      Boolean((table.getState() as HoveringTableState).rowAddInput?.[row.id]);

    // table.setState((old: TableState & HoveringTableState) => ({
    //   ...old,
    //   rowHovering: {
    //     ...old.rowHovering,
    //     [row.id]: !old.rowHovering?.[row.id],
    //   },
    // }));
  },


  createTable<TData extends RowData>(table: Table<TData>): void {
    type TableWithHover = Table<TData> & HoveringTableAPI<TData>;
    (table as TableWithHover).getHoveredRows = () =>
      Object.entries((table.getState() as HoveringTableState).rowHovering || {})
        .filter(([, isHovered]) => isHovered)
        .map(([id]) => table.getRow(id));

    (table as TableWithHover).setHoveredRows = (updater) => {
      const safeUpdater: Updater<RowHoveringState | undefined> = (old) =>
        functionalUpdate(updater, old);

      return (table.options as HoveringOptions).onRowHoveringChange?.(
        safeUpdater
      );
    };

    (table as TableWithHover).resetAddInput = () => {
      console.log('resetAddInput function called');
      return table.setState((old: TableState & HoveringTableState) => ({
        ...old,
        rowAddInput: {
        },
      }))
    };
  },

  getDefaultOptions<TData extends RowData>(
    table: Table<TData>
  ): Partial<TableOptionsResolved<TData>> & HoveringOptions {
    return {
      onRowHoveringChange: makeStateUpdater("hovering" as any, table),
    };
  },

  getInitialState(state): Partial<TableState> & HoveringTableState {
    return {
      rowHovering: {},
      ...(state as Partial<TableState>),
    };
  },



} satisfies TableFeature;