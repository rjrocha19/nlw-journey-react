import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "./invite-guests-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";
import { InviteGuestsStep } from "./steps/invite-guests-step";
import type { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";

export function CreateTripPage() {
  const navigate = useNavigate();

  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const [destination, setDestination] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >();

  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([
    "HqT7v@example.com",
  ]);

  function handleOpenGuestInput() {
    setIsGuestInputOpen(true);
  }

  function handleCloseGuestInput() {
    setIsGuestInputOpen(false);
  }

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleRemoveEmailToInvite(email: string) {
    const newEmailsToInvite = emailsToInvite.filter((e: string) => e !== email);

    setEmailsToInvite(newEmailsToInvite);
  }

  function handleAddEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();

    if (!email) {
      return;
    }

    if (emailsToInvite.includes(email)) {
      return;
    }

    setEmailsToInvite([...emailsToInvite, email]);

    event.currentTarget.reset();
  }

  function handleOpenConfirmationModal() {
    setIsConfirmationModalOpen(true);
  }

  function handleCloseConfirmationModal() {
    setIsConfirmationModalOpen(false);
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log({
      destination,
      ownerName,
      ownerEmail,
      eventStartAndEndDates,
      emailsToInvite,
    });

    if (!destination) {
      return;
    }

    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
      return;
    } 

    if (emailsToInvite.length === 0) {
      return;
    }

    if (!ownerName || !ownerEmail) {
      return;
    }

    const response = await api.post("/trips", {
      destination,
      starts_at: eventStartAndEndDates?.from,
      ends_at: eventStartAndEndDates?.to,
      emails_to_invite: emailsToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail,
    });

    const { tripId } = response.data

    navigate(`/trips/${tripId}`);
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateStep
            isGuestInputOpen={isGuestInputOpen}
            handleOpenGuestInput={handleOpenGuestInput}
            handleCloseGuestInput={handleCloseGuestInput}
            setDestination={setDestination}
            eventStartAndEndDates={eventStartAndEndDates}
            setEventStartAndEndDates={setEventStartAndEndDates}
          />
          {isGuestInputOpen && (
            <InviteGuestsStep
              handleOpenModal={handleOpenModal}
              handleOpenConfirmationModal={handleOpenConfirmationModal}
              emailsToInvite={emailsToInvite}
            />
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda com
          nossos{" "}
          <a href="" className="text-zinc-300 underline">
            termos de uso
          </a>{" "}
          e{" "}
          <a href="" className="text-zinc-300 underline">
            políticas de privacidade
          </a>
          .
        </p>
      </div>

      {isModalOpen && (
        <InviteGuestsModal
          handleCloseModal={handleCloseModal}
          emailsToInvite={emailsToInvite}
          handleRemoveEmailToInvite={handleRemoveEmailToInvite}
          handleAddEmailToInvite={handleAddEmailToInvite}
        />
      )}

      {isConfirmationModalOpen && (
        <ConfirmTripModal
          createTrip={createTrip}
          handleCloseConfirmationModal={handleCloseConfirmationModal}
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
        />
      )}
    </div>
  );
}
