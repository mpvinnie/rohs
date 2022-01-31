import { FakePartsRepository } from '@modules/parts/repositories/fakes/FakePartsRepository'
import { FakeSubpartsRepository } from '@modules/parts/repositories/fakes/FakeSubpartsRepository'
import { FakeProvidersRepository } from '@modules/providers/repositories/fakes/FakeProvidersRepository'
import { FakeStorageProvider } from '@shared/containers/providers/StorageProvider/fakes/FakeStorageProvider'
import { AppError } from '@shared/errors/AppError'

import { CreateSubpartUseCase } from './CreateSubpartUseCase'

let providersRepository: FakeProvidersRepository
let partsRepository: FakePartsRepository
let subpartsRepository: FakeSubpartsRepository
let storageProvider: FakeStorageProvider
let createSubpart: CreateSubpartUseCase

describe('CreateSubpart', () => {
  beforeEach(() => {
    providersRepository = new FakeProvidersRepository()
    partsRepository = new FakePartsRepository()
    subpartsRepository = new FakeSubpartsRepository()
    storageProvider = new FakeStorageProvider()

    createSubpart = new CreateSubpartUseCase(
      providersRepository,
      partsRepository,
      subpartsRepository,
      storageProvider
    )
  })

  it('should be able create a subpart', async () => {
    const provider = await providersRepository.create({
      id: '12345678',
      name: 'Provider Name',
      cnpj: '12345679801234',
      password: 'password',
      segment: 'Segment'
    })

    const part = await partsRepository.create({
      code: '123456',
      provider_id: provider.id,
      description: 'Description'
    })

    const subpart = await createSubpart.execute({
      provider_id: provider.id,
      part_id: part.id,
      name: 'Part Name',
      gwi_11a1: 'gwi_11a1.doc',
      fisp_msds: 'fisp_msds.doc',
      rohs_report: 'rosh_report.doc',
      subgroup: 'subgroup'
    })

    expect(subpart).toHaveProperty('id')
    expect(subpart.part_id).toBe(part.id)
  })

  it('should not be able create a subpart to a non-existent provider', async () => {
    const part = await partsRepository.create({
      code: '123456',
      provider_id: 'provider_id',
      description: 'Description'
    })

    await expect(
      createSubpart.execute({
        provider_id: 'non-existent-provider-id',
        part_id: part.id,
        name: 'Part Name',
        gwi_11a1: 'gwi_11a1.doc',
        fisp_msds: 'fisp_msds.doc',
        rohs_report: 'rosh_report.doc',
        subgroup: 'subgroup'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able create a subpart to a non-existent part', async () => {
    const provider = await providersRepository.create({
      id: '12345678',
      name: 'Provider Name',
      cnpj: '12345679801234',
      password: 'password',
      segment: 'Segment'
    })

    await expect(
      createSubpart.execute({
        provider_id: provider.id,
        part_id: 'non-existent-part-id',
        name: 'Part Name',
        gwi_11a1: 'gwi_11a1.doc',
        fisp_msds: 'fisp_msds.doc',
        rohs_report: 'rosh_report.doc',
        subgroup: 'subgroup'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
