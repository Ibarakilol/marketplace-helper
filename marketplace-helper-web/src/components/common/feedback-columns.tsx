import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import type { IFeedback } from '@/interfaces';

const feedbackColumns: ColumnDef<IFeedback>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        className="grid h-[18px] w-[18px]"
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Выбрать все"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="grid h-[18px] w-[18px]"
        checked={row.getIsSelected()}
        disabled={row.getValue('replyText')}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Выбрать"
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'sku',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          SKU
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'productName',
    header: 'Товар',
  },
  {
    accessorKey: 'productValuation',
    header: 'Оценка товара',
  },
  {
    accessorKey: 'name',
    header: 'Имя',
  },
  {
    accessorKey: 'text',
    header: 'Текст',
  },
  {
    accessorKey: 'replyText',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Ответ
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];

export default feedbackColumns;
