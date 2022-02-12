import { FakePartsRepository } from '@modules/parts/repositories/fakes/FakePartsRepository'
import { FakeSubpartsRepository } from '@modules/parts/repositories/fakes/FakeSubpartsRepository'
import { FakeProvidersRepository } from '@modules/providers/repositories/fakes/FakeProvidersRepository'
import { FakeStorageProvider } from '@shared/containers/providers/StorageProvider/fakes/FakeStorageProvider'
import { AppError } from '@shared/errors/AppError'

import { DeletePartUseCase } from './DeletePartUseCase'

let providersRepository: FakeProvidersRepository
let partsRepository: FakePartsRepository
let subpartsRepository: FakeSubpartsRepository
let storageProvider: FakeStorageProvider
let deletePart: DeletePartUseCase

describe('DeletePart', () => {
  beforeEach(() => {
    providersRepository = new FakeProvidersRepository()
    partsRepository = new FakePartsRepository()
    subpartsRepository = new FakeSubpartsRepository()
    storageProvider = new FakeStorageProvider()

    deletePart = new DeletePartUseCase(
      providersRepository,
      partsRepository,
      subpartsRepository,
      storageProvider
    )
  })

  it('should be able to delete a part', async () => {
    const provider = await providersRepository.create({
      id: '12345678',
      name: 'Provider Name',
      cnpj: '12345679801234',
      password: 'password',
      segment: 'Segment'
    })

    const part = await partsRepository.create({
      provider_id: provider.id,
      code: '123456',
      description: 'Part Description',
      comment: 'Comment'
    })

    await subpartsRepository.create({
      provider_id: provider.id,
      part_id: part.id,
      name: 'Subpart Name',
      gwi4_11a1: 'gwi_11a1.doc',
      fispq_msds: 'fisp.doc',
      rohs_report: 'rohs.doc',
      rohs_report_date: new Date(),
      rohs_report_expiration_date: new Date(),
      material_type: 'METAL'
    })

    const deleteFromStorage = jest.spyOn(storageProvider, 'deleteFile')

    await deletePart.execute({
      provider_id: provider.id,
      part_id: part.id
    })

    const deletedPart = await partsRepository.findById(part.id)

    expect(deletedPart).toBeUndefined()
    expect(deleteFromStorage).toHaveBeenCalledTimes(3)
  })

  it('should not be able to delete a non-existent provider`s part', async () => {
    const part = await partsRepository.create({
      provider_id: 'provider-id',
      code: '123456',
      description: 'Part Description',
      comment: 'Comment'
    })

    await expect(
      deletePart.execute({
        provider_id: 'non-existent-provider-id',
        part_id: part.id
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to delete a non-existent part', async () => {
    const provider = await providersRepository.create({
      id: '12345678',
      name: 'Provider Name',
      cnpj: '12345679801234',
      password: 'password',
      segment: 'Segment'
    })

    await expect(
      deletePart.execute({
        provider_id: provider.id,
        part_id: 'non-existent-part-id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to delete a part if its status is currently not `not_set` and `disapproved`', async () => {
    const provider = await providersRepository.create({
      id: '12345678',
      name: 'Provider Name',
      cnpj: '12345679801234',
      password: 'password',
      segment: 'Segment'
    })

    const part = await partsRepository.create({
      provider_id: provider.id,
      code: '123456',
      description: 'Part Description',
      comment: 'Comment'
    })

    part.status = 'APPROVED'

    await partsRepository.update(part)

    await expect(
      deletePart.execute({
        provider_id: provider.id,
        part_id: part.id
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
