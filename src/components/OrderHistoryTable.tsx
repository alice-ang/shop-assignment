"use client";
import { getOrders } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { HistoryItem } from "./HistoryItem";
import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export const OrderHistoryTable = () => {
  const { data: orders } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  if (!orders) {
    return;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Ordernummer # </TableHead>
          <TableHead>Orderdatum</TableHead>
          <TableHead>E-postadress</TableHead>
          <TableHead>Antal Produkter</TableHead>
          <TableHead className="text-right">Summa</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.data.map((item) => (
          <Collapsible key={item.id} asChild className="w-full">
            <>
              <TableRow>
                <TableCell>{item.id}</TableCell>
                <TableCell>
                  {`${formatDate(item.order_date).year}-${
                    formatDate(item.order_date).month
                  }-${formatDate(item.order_date).day}`}
                </TableCell>
                <TableCell>{item.customer_email}</TableCell>
                <TableCell>{item.items.length}st</TableCell>
                <TableCell className="text-right">
                  {item.order_total} SEK
                </TableCell>
                <TableCell>
                  <CollapsibleTrigger asChild>
                    <Button variant={"secondary"}>Visa</Button>
                  </CollapsibleTrigger>
                </TableCell>
              </TableRow>
              <TableRow>
                <CollapsibleContent asChild className="w-full bg-neutral-100">
                  <TableCell colSpan={6}>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Produkt</TableHead>
                          <TableHead>Pris</TableHead>
                          <TableHead>Antal Produkter</TableHead>
                          <TableHead className="text-right">
                            Total Summa
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {item.items.map((product) => (
                          <HistoryItem orderItem={product} key={product.id} />
                        ))}
                      </TableBody>
                    </Table>
                  </TableCell>
                </CollapsibleContent>
              </TableRow>
            </>
          </Collapsible>
        ))}
      </TableBody>
    </Table>
  );
};
