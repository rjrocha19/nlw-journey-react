import { CircleDashed, CircleCheck, UserCog } from "lucide-react";

export function Guests() {
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl text-zinc-50">Convidados</h2>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="sapace-y-1.5">
            <span className="block font-medium text-zinc-100">
              Jessica White
            </span>
            <span className="block font-xs text-zinc-400 truncate">
              jessica.white44@yahoo.com
            </span>
          </div>
          <CircleDashed className="text-zinc-400 size-5 shrink-0" />
        </div>
        <div className="flex items-center justify-between">
          <div className="sapace-y-1.5">
            <span className="block font-medium text-zinc-100">
              Dr. Rita Pacocha
            </span>
            <span className="block font-xs text-zinc-400 truncate">
              lacy.stiedemann@gmail.com
            </span>
          </div>
          <CircleCheck className="text-lime-400 size-5 shrink-0" />
        </div>
      </div>
      <button className="bg-zinc-800 text-zinc-200 rounded-lg w-full px-5 py-2 h-11 font-medium flex items-center justify-center gap-2 hover:bg-zinc-700">
        <UserCog className="size-5" />
        Gerenciar convidados
      </button>
    </div>
  );
}
