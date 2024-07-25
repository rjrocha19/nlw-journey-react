import { useState } from "react";
import { CreateActiveModal } from "./create-active-modal";
import { ImportantLinks } from "./important-links";
import { Guests } from "./guests";
import { Actives } from "./actives";
import { DestinationAndDateHeader } from "./destination-and-date-header";
import { Plus } from "lucide-react";

export function TripDetailsPage() {
  const [isCreateActionModalOpen, setIsCreateActionModalOpen] = useState(false);

  function handleOpenCreateActionModal() {
    setIsCreateActionModalOpen(true);
  }

  function handleCloseCreateActionModal() {
    setIsCreateActionModalOpen(false);
  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader />
      <main className="flex gap-16 px-6">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>
            <button
              onClick={handleOpenCreateActionModal}
              className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
            >
              <Plus className="size-5" />
              Cadastrar ativiadade
            </button>
          </div>

          <Actives />
        </div>

        <div className="w-80 space-y-6">
          <ImportantLinks />
          <div className="w-full h-px bg-zinc-800" />
          <Guests />
        </div>
      </main>

      {isCreateActionModalOpen && (
        <CreateActiveModal
          handleCloseCreateActionModal={handleCloseCreateActionModal}
        />
      )}
    </div>
  );
}
