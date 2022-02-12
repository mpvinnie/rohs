import { inject, injectable } from 'tsyringe'

import { IDeletePartDTO } from '@modules/parts/dtos/PartsDTO'
import { IPartsRepository } from '@modules/parts/repositories/interfaces/IPartsRepository'
import { ISubpartsRepository } from '@modules/parts/repositories/interfaces/ISubpartsRepository'
import { IProvidersRepository } from '@modules/providers/repositories/interfaces/IProvidersRepository'
import { IStorageProvider } from '@shared/containers/providers/StorageProvider/interfaces/IStorageProvider'
import { AppError } from '@shared/errors/AppError'

@injectable()
export class DeletePartUseCase {
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

  async execute({ provider_id, part_id }: IDeletePartDTO) {
    const provider = await this.providersRepository.findById(provider_id)

    if (!provider) {
      throw new AppError('No provider found for this id', 404)
    }

    const part = await this.partsRepository.findByProviderId(
      provider_id,
      part_id
    )

    if (!part) {
      throw new AppError('You cannot delete a non-existent part', 404)
    }

    if (part.status !== 'NOT_SENT' && part.status !== 'DISAPPROVED') {
      throw new AppError('You cannot delete this part')
    }

    const subparts = await this.subpartsRepository.findAllByPartId(part_id)

    subparts.map(async subpart => {
      await this.storageProvider.deleteFile(subpart.gwi4_11a1, 'subpart')
      await this.storageProvider.deleteFile(subpart.fispq_msds, 'subpart')
      await this.storageProvider.deleteFile(subpart.rohs_report, 'subpart')
    })

    await this.partsRepository.delete(part)
  }
}
