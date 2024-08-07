import { ColumnDef } from "@tanstack/react-table";
import { type Food } from "../sharedTypes";
import { Button } from "./ui/button";

export const columns: ColumnDef<Food>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-right">ID</div>,
    cell: ({ row }) => {
      return <div className="text-right">{row.getValue("id")}</div>;
    },
  },
  {
    accessorKey: "title",
    header: () => <div className="text-right">Title</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right px-0 mx-0">{row.getValue("title")}</div>
      );
    },
  },
  {
    accessorKey: "maxquantity",
    header: () => <div className="text-right">Max quantity</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right px-0 mx-0">
          {row.getValue("maxquantity")}
        </div>
      );
    },
  },
  {
    accessorKey: "carbs",
    header: () => <div className="text-right">Carbs</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right px-0 mx-0">{row.getValue("carbs")}</div>
      );
    },
  },
  {
    accessorKey: "protein",
    header: () => <div className="text-right">Protein</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right px-0 mx-0">{row.getValue("protein")}</div>
      );
    },
  },
  {
    accessorKey: "fat",
    header: () => <div className="text-right">Fat</div>,
    cell: ({ row }) => {
      return <div className="text-right px-0 mx-0">{row.getValue("fat")}</div>;
    },
  },
  {
    accessorKey: "calories",
    header: () => <div className="text-right">Calories</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right px-0 mx-0">{row.getValue("calories")}</div>
      );
    },
  },
  {
    accessorKey: "vitaa",
    header: () => <div className="text-right">Vitamin A</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right px-0 mx-0">{row.getValue("vitaa")}</div>
      );
    },
  },
  {
    accessorKey: "vitac",
    header: () => <div className="text-right">Vitamin C</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right px-0 mx-0">{row.getValue("vitac")}</div>
      );
    },
  },
  {
    accessorKey: "vitab12",
    header: () => <div className="text-right">Vitamin B12</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right px-0 mx-0">{row.getValue("vitab12")}</div>
      );
    },
  },
  {
    accessorKey: "calcium",
    header: () => <div className="text-right">Calcium </div>,
    cell: ({ row }) => {
      return (
        <div className="text-right px-0 mx-0">{row.getValue("calcium")}</div>
      );
    },
  },
  {
    accessorKey: "potasium",
    header: () => <div className="text-right">Potasium</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right px-0 mx-0">{row.getValue("potasium")}</div>
      );
    },
  },
  {
    accessorKey: "magnesium",
    header: () => <div className="text-right">Magnesium</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right px-0 mx-0">{row.getValue("magnesium")}</div>
      );
    },
  },
  {
    accessorKey: "iron",
    header: () => <div className="text-right">Iron</div>,
    cell: ({ row }) => {
      return <div className="text-right px-0 mx-0">{row.getValue("iron")}</div>;
    },
  },
  {
    accessorKey: "folic",
    header: () => <div className="text-right">Folates</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right px-0 mx-0">{row.getValue("folic")}</div>
      );
    },
  },
];
