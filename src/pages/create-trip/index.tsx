import { MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2, X, AtSign, Plus, User, Mail } from 'lucide-react'
import { useState, type FormEvent } from 'react'

export function CreateTripPage() {
  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)

  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([
    'HqT7v@example.com',
  ])

  function handleOpenGuestInput() {
    setIsGuestInputOpen(true)
  }

  function handleCloseGuestInput() {
    setIsGuestInputOpen(false)
  }

  function handleOpenModal() {
    setIsModalOpen(true)
  } 

  function handleCloseModal() {
    setIsModalOpen(false)
  }

  function handleRemoveEmailToInvite(email: string) {
    const newEmailsToInvite = emailsToInvite.filter((e: string) => e !== email)

    setEmailsToInvite(newEmailsToInvite)
  }

  function handleAddEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email) {
      return
    }

    if (emailsToInvite.includes(email)) {
      return
    }

    setEmailsToInvite([...emailsToInvite, email])

    event.currentTarget.reset()
  }

  function handleOpenConfirmationModal() {
    setIsConfirmationModalOpen(true)
  }

  function handleCloseConfirmationModal() {
    setIsConfirmationModalOpen(false)
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className='flex flex-col items-center gap-3'>
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>


        <div className='space-y-4'>
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape  gap-3">
            <div className='flex flex-1 items-center gap-2'>
              <MapPin className="size-5 text-zinc-400" />
                <input disabled={isGuestInputOpen} type="text" placeholder="Para onde você vai?" className="bg-transparent text-lg place-holder-zinc-400 outline-none flex-1"/>
            </div>

            <div className='flex items-center gap-2 w-min'>
              <Calendar className="size-5 text-zinc-400" />
              <input disabled={isGuestInputOpen} type="text" placeholder="Quando?" className="bg-transparent text-lg place-holder-zinc-400 w-40 outline-none"/>
            </div>

            <div className='w-px h-6 bg-zinc-800'/>

            {isGuestInputOpen ? (
              <button onClick={handleCloseGuestInput} className='bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700'>
                Alterar local/data
                <Settings2 className='size-5' />
              </button>
            ) : (
              <button onClick={handleOpenGuestInput} className='bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-600'>
                Continuar
                <ArrowRight className='size-5' />
              </button>
            )}
            
          </div>

          {isGuestInputOpen && (
            <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape  gap-3">
              <div className='flex flex-1 items-center gap-2'>
                <button type="button" onClick={handleOpenModal} className="flex items-center gap-2 flex-1 text-left">
                  <UserRoundPlus className="size-5 text-zinc-400" />
                  {emailsToInvite.length > 0 ? (
                    <span>{emailsToInvite.length} pessoa(s) convidada(s)</span>
                  ) : (
                    <span className='text-lg text-zinc-400 flex-1'>Quem estará na viagem?</span>
                  )}
                </button>
              </div>

              <div className='w-px h-6 bg-zinc-800'/>


              <button onClick={handleOpenConfirmationModal} className='bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-600'>
                Confirmar viagem
                <ArrowRight className='size-5' />
              </button>        
            </div>
          )}
        </div>
          
        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda
          com nossos <a href="" className="text-zinc-300 underline">termos de uso</a> e <a href="" className="text-zinc-300 underline">políticas de privacidade</a>.
        </p>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
          <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <h2 className='text-lg font-semibold'>Selecionar convidados</h2>
                <button type='button' onClick={handleCloseModal}>
                  <X className='size-5 text-zinc-400'/>
                </button>
              </div>
            
              <p className='text-sm text-zinc-400'>
                Os convidados irão receber e-mails para confirmar a participação na viagem.
              </p>
            </div>

            <div className='flex flex-wrap gap-2'>
              {emailsToInvite.map((email: string) => {
                return (
                  <div key={email} className='py-1.5 px-2.5 bg-zinc-800 rounded-md flex items-center gap-2'>
                    <span className='text-lg text-zinc-400'>{email}</span>
                    <button type='button' onClick={() => handleRemoveEmailToInvite(email)}>
                      <X className='size-5 text-zinc-400'/>
                    </button>
                  </div>
                )
              })}
            </div>

            <div className='w-full h-px bg-zinc-800'/>

            <form onSubmit={handleAddEmailToInvite} className='p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
              <div className='px-2 flex-1 flex items-center gap-2'>
                <AtSign className='size-5 text-zinc-400' />
                <input type="email" name="email" placeholder="Digite o e-mail do convidado" className="bg-transparent text-lg place-holder-zinc-400 outline-none flex-1"/>
              </div>

              <button type='submit'  className='bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-600'>
                Convidar
                <Plus className='size-5' />
              </button>   
            </form>
          </div>
        </div>
      )}

      {isConfirmationModalOpen && (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
        <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <h2 className='text-lg font-semibold'>Confirmar criação da viagem</h2>
              <button type='button' onClick={handleCloseConfirmationModal}>
                <X className='size-5 text-zinc-400'/>
              </button>
            </div>
          
            <p className='text-sm text-zinc-400'>
              Para concluir a criação da viagem para <span className='font-semibold text-zinc-50'>Florianópolis, Brasil</span> nas datas de <span className='font-semibold text-zinc-50'>16 a 27 de Agosto de 2024</span> preencha seus dados abaixo:
            </p>
          </div>
          
          <form onSubmit={handleAddEmailToInvite} className='space-y-3'>
            <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
              <User className='size-5 text-zinc-400' />
              <input name="name" placeholder="Seu nome completo" className="bg-transparent text-lg place-holder-zinc-400 outline-none flex-1"/>
            </div>

            <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
              <Mail className='size-5 text-zinc-400' />
              <input type="email" name="email" placeholder="Seu e-mail pessoal" className="bg-transparent text-lg place-holder-zinc-400 outline-none flex-1"/>
            </div>

            <button type='submit'  className='bg-lime-300 w-full justify-center text-lime-950 rounded-lg px-5 h-11 font-medium flex items-center gap-2 hover:bg-lime-600'>
              Confirmar criação da viagem
            </button>   
          </form>
        </div>
      </div>
      )}
    </div>
  )
}