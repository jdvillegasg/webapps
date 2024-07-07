import { ScrollArea } from "../components/ui/scroll-area";
import { Separator } from "../components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import { useStore } from "../stores/store.ts";
import { Trash } from "lucide-react";

export function DisplaySources() {
  const { fundingsource } = useStore();
  return (
    <div className="ml-6 w-80 px-3">
      <ScrollArea className="h-72 rounded-md border">
        <div className="p-4">
          <h1 className="mb-4 text-lg font-semibold">Funding sources</h1>
          {fundingsource.map((source, cnt) => (
            <>
              <div
                key={cnt}
                className="text-sm flex flex-row justify-between gap-x-2 px-3"
              >
                <span className="text-left text-base">{source.name}</span>
                <span className="text-right text-base">{source.maxdebt}</span>
                <span className="text-right text-base">
                  {source.interestrate}
                </span>
              </div>
              <Separator className="my-2" />
            </>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export function DisplayFundingSources() {
  const { fundingsource, deleteFund } = useStore();

  const handleDelete = (sourcename: string) => {
    deleteFund(sourcename);
  };

  return (
    <div className="ml-4 rounded-md border mx-auto">
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
