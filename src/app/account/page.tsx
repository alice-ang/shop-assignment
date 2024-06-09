import { Constraints, OrderHistoryTable } from "@/components";

export default function AccountPage() {
  return (
    <Constraints>
      <main className="min-h-screen grid grid-cols-12 gap-4 ">
        <div className="col-span-12  border-2 border-black space-y-4">
          <div className="flex flex-row justify-between items-end p-4">
            <h4 className="font-bold ">Orderhistorik</h4>
          </div>
          <OrderHistoryTable />
        </div>
      </main>
    </Constraints>
  );
}
