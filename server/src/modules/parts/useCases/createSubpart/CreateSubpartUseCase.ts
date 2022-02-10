import { inject, injectable } from 'tsyringe'

import { ICreateSubpartDTO } from '@modules/parts/dtos/SubpartsDTO'
import { IPartsRepository } from '@modules/parts/repositories/interfaces/IPartsRepository'
import { ISubpartsRepository } from '@modules/parts/repositories/interfaces/ISubpartsRepository'
import { IProvidersRepository } from '@modules/providers/repositories/interfaces/IProvidersRepository'
import { IStorageProvider } from '@shared/containers/providers/StorageProvider/interfaces/IStorageProvider'
import { AppError } from '@shared/errors/AppError'

@injectable()
export class CreateSubpartUseCase {
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

  async execute({
    provider_id,
    part_id,
    name,
    gwi_11a1,
    fisp_msds,
    rohs_report,
    subgroup
  }: ICreateSubpartDTO) {
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
      throw new AppError(
        'You cannot create a subpart to this part because its status is not `not_sent` or `disapproved`'
      )
    }

    const gwi_11a1_filename = await this.storageProvider.saveFile(
      gwi_11a1,
      'subpart'
    )
    const fisp_msds_filename = await this.storageProvider.saveFile(
      fisp_msds,
      'subpart'
    )
    const rohs_report_filename = await this.storageProvider.saveFile(
      rohs_report,
      'subpart'
    )

    const subpart = await this.subpartsRepository.create({
      part_id,
      name,
      gwi_11a1: gwi_11a1_filename,
      fisp_msds: fisp_msds_filename,
      rohs_report: rohs_report_filename,
      subgroup
    })

    return subpart
  }
}
