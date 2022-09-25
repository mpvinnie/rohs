import * as Dialog from '@radix-ui/react-dialog'

import { Input } from '../../Input'
import { Content, Overlay } from './styles'

export function NewPartModal(): JSX.Element {
  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Criar nova parte</Dialog.Title>
        <form>
          <Input name="part_code" placeholder="Insira o código da part" />
        </form>
      </Content>
    </Dialog.Portal>
  )
}
