import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table.tsx";
import { Button } from "./ui/button.tsx";
import { useStore } from "../stores/store.ts";
import { Trash } from "lucide-react";

export function DisplayFundingSources() {
  const { fundingsource, deleteFund } = useStore();

  const handleDelete = (sourcename: string) => {
    deleteFund(sourcename);
  };

  return (
    <div className="ml-4 rounded-md border w-1/2">
      <Table
        className="pb-2"
        containerClassname="h-fit max-h-80 overflow-y-auto relative pt-2"
      >
        <TableCaption>Funding sources.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Name</TableHead>
            <TableHead className="text-right">Max debt</TableHead>
            <TableHead className="text-right">Interest</TableHead>
            <TableHead className="text-right">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-y-auto ">
          {fundingsource.map((source, cnt) => (
            <TableRow key={cnt}>
              <TableCell>{source.name}</TableCell>
              <TableCell className="text-right">{source.maxdebt}</TableCell>
              <TableCell className="text-right">
                {source.interestrate}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDelete(`${source.name}`)}
                >
                  <Trash className="h-4 w-4"></Trash>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
