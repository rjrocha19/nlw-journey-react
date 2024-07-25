import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";

export function ImportantLinks() {
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl text-zinc-50">Links importantes</h2>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="sapace-y-1.5">
            <span className="block font-medium text-zinc-100">
              Reserva do AirBnB
            </span>
            <a
              href="#"
              className="block font-xs text-zinc-400 truncate hover:text-zinc-200"
            >
              https://www.airbnb.com.br/rooms/104700011
            </a>
          </div>
          <Link2 className="text-zinc-400 size-5 shrink-0" />
        </div>
        <div className="flex items-center justify-between">
          <div className="sapace-y-1.5">
            <span className="block font-medium text-zinc-100">
              Regras da casa
            </span>
            <a
              href="#"
              className="block font-xs text-zinc-400 truncate hover:text-zinc-200"
            >
              https://www.notion.com/pages/1047000112354648336?
            </a>
          </div>
          <Link2 className="text-zinc-400 size-5 shrink-0" />
        </div>
      </div>
      <Button variant="secudary" size="full">
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>
    </div>
  );
}
