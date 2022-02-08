import { inject, injectable } from 'tsyringe'

import { IDeleteSubpartDTO } from '@modules/parts/dtos/SubpartsDTO'
import { IPartsRepository } from '@modules/parts/repositories/interfaces/IPartsRepository'
import { ISubpartsRepository } from '@modules/parts/repositories/interfaces/ISubpartsRepository'
import { IProvidersRepository } from '@modules/providers/repositories/interfaces/IProvidersRepository'
import { IStorageProvider } from '@shared/containers/providers/StorageProvider/interfaces/IStorageProvider'
import { AppError } from '@shared/errors/AppError'

@injectable()
export class DeleteSubpartUseCase {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
    @inject('PartsRepository')
    private partsRepository: IPartsRepository,
    @inject('SubpartsRepository')
    private subpartsRepository: ISubpartsRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute({ provider_id, part_id, subpart_id }: IDeleteSubpartDTO) {
    const provider = await this.providersRepository.findById(provider_id)

    if (!provider) {
      throw new AppError('No provider found for this id', 404)
    }

    const part = await this.partsRepository.findByProviderId(
      provider_id,
      part_id
    )

    if (!part) {
      throw new AppError('No part found for this id', 404)
    }

    if (part.status !== 'NOT_SENT' && part.status !== 'DISAPPROVED') {
      throw new AppError('This part cannot be deleted')
    }

    const subpart = await this.subpartsRepository.findByPartId(
      part_id,
      subpart_id
    )

    if (!subpart) {
      throw new AppError(
        'No subpart found for this part_id and subpart_id',
        404
      )
    }

    await this.storageProvider.deleteFile(subpart.gwi_11a1, 'subpart')
    await this.storageProvider.deleteFile(subpart.fisp_msds, 'subpart')
    await this.storageProvider.deleteFile(subpart.rohs_report, 'subpart')

    await this.subpartsRepository.delete(subpart)
  }
}
