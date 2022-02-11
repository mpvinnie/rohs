import { FakePartsRepository } from '@modules/parts/repositories/fakes/FakePartsRepository'
import { FakeSubpartsRepository } from '@modules/parts/repositories/fakes/FakeSubpartsRepository'
import { FakeProvidersRepository } from '@modules/providers/repositories/fakes/FakeProvidersRepository'
import { FakeStorageProvider } from '@shared/containers/providers/StorageProvider/fakes/FakeStorageProvider'
import { AppError } from '@shared/errors/AppError'

import { DeleteSubpartUseCase } from './DeleteSubpartUseCase'

let providersRepository: FakeProvidersRepository
let partsRepository: FakePartsRepository
let subpartsRepository: FakeSubpartsRepository
let storageProvider: FakeStorageProvider
let deleteSubpart: DeleteSubpartUseCase

describe('DeleteSubpart', () => {
  beforeEach(() => {
    providersRepository = new FakeProvidersRepository()
    partsRepository = new FakePartsRepository()
    subpartsRepository = new FakeSubpartsRepository()
    storageProvider = new FakeStorageProvider()

    deleteSubpart = new DeleteSubpartUseCase(
      providersRepository,
      partsRepository,
      subpartsRepository,
      storageProvider
    )
  })

  it('should be able to delete a subpart', async () => {
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

    const subpart = await subpartsRepository.create({
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

    await deleteSubpart.execute({
      provider_id: provider.id,
      part_id: part.id,
      subpart_id: subpart.id
    })

    const deletedSubpart = await subpartsRepository.findByPartId(
      part.id,
      subpart.id
    )

    expect(deletedSubpart).toBeUndefined()
  })

  it('should not be able to delete a non-existent provider`s subpart', async () => {
    const part = await partsRepository.create({
      provider_id: 'provider-id',
      code: '123456',
      description: 'Part Description',
      comment: 'Comment'
    })

    const subpart = await subpartsRepository.create({
      provider_id: 'provider-id',
      part_id: part.id,
      name: 'Subpart Name',
      gwi4_11a1: 'gwi_11a1.doc',
      fispq_msds: 'fisp.doc',
      rohs_report: 'rohs.doc',
      rohs_report_date: new Date(),
      rohs_report_expiration_date: new Date(),
      material_type: 'METAL'
    })

    await expect(
      deleteSubpart.execute({
        provider_id: 'non-existent-provider-id',
        part_id: part.id,
        subpart_id: subpart.id
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to delete a non-existent part`s subpart', async () => {
    const provider = await providersRepository.create({
      id: '12345678',
      name: 'Provider Name',
      cnpj: '12345679801234',
      password: 'password',
      segment: 'Segment'
    })

    const subpart = await subpartsRepository.create({
      provider_id: provider.id,
      part_id: 'part_id',
      name: 'Subpart Name',
      gwi4_11a1: 'gwi_11a1.doc',
      fispq_msds: 'fisp.doc',
      rohs_report: 'rohs.doc',
      rohs_report_date: new Date(),
      rohs_report_expiration_date: new Date(),
      material_type: 'METAL'
    })

    await expect(
      deleteSubpart.execute({
        provider_id: provider.id,
        part_id: 'non-existent-part-id',
        subpart_id: subpart.id
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to delete a subpart if part is currently not `not_set` and `disapproved`', async () => {
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

    const subpart = await subpartsRepository.create({
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

    part.status = 'APPROVED'

    await expect(
      deleteSubpart.execute({
        provider_id: provider.id,
        part_id: part.id,
        subpart_id: subpart.id
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to delete a non-existent subpart', async () => {
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

    await expect(
      deleteSubpart.execute({
        provider_id: provider.id,
        part_id: part.id,
        subpart_id: 'non-existent-subpart'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
