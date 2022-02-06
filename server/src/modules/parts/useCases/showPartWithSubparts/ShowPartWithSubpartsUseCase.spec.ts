import { FakePartsRepository } from '@modules/parts/repositories/fakes/FakePartsRepository'
import { FakeSubpartsRepository } from '@modules/parts/repositories/fakes/FakeSubpartsRepository'
import { FakeProvidersRepository } from '@modules/providers/repositories/fakes/FakeProvidersRepository'
import { AppError } from '@shared/errors/AppError'

import { ShowPartWithSubpartsUseCase } from './ShowPartWithSubpartsUseCase'

let providersRepository: FakeProvidersRepository
let partsRepository: FakePartsRepository
let subpartsRepository: FakeSubpartsRepository
let showPartWithSubparts: ShowPartWithSubpartsUseCase

describe('ShowPartWithSubparts', () => {
  beforeEach(() => {
    providersRepository = new FakeProvidersRepository()
    partsRepository = new FakePartsRepository()
    subpartsRepository = new FakeSubpartsRepository()

    showPartWithSubparts = new ShowPartWithSubpartsUseCase(
      providersRepository,
      partsRepository,
      subpartsRepository
    )
  })

  it('should be able to list part with its subparts', async () => {
    const provider = await providersRepository.create({
      id: '12345678',
      name: 'Provider Name',
      cnpj: '12345679801234',
      password: 'password',
      segment: 'segment'
    })

    const part = await partsRepository.create({
      code: '123456',
      provider_id: provider.id,
      description: 'Description'
    })

    const subpart = await subpartsRepository.create({
      provider_id: provider.id,
      part_id: part.id,
      name: 'Subpart Name',
      gwi_11a1: 'gwi_11a1.doc',
      fisp_msds: 'fisp_msds.doc',
      rohs_report: 'rohs_report',
      subgroup: 'subgroup'
    })

    const partWithSubparts = await showPartWithSubparts.execute({
      provider_id: provider.id,
      part_id: part.id
    })

    expect(partWithSubparts.id).toBe(part.id)
    expect(partWithSubparts.provider_id).toBe(provider.id)
    expect(partWithSubparts.subparts[0]).toBe(subpart)
  })

  it('should not be able to list part with its subparts if provider non-exists', async () => {
    const part = await partsRepository.create({
      code: '123456',
      provider_id: 'provider_id',
      description: 'Description'
    })

    await subpartsRepository.create({
      provider_id: 'provider_id',
      part_id: part.id,
      name: 'Subpart Name',
      gwi_11a1: 'gwi_11a1.doc',
      fisp_msds: 'fisp_msds.doc',
      rohs_report: 'rohs_report',
      subgroup: 'subgroup'
    })

    await expect(
      showPartWithSubparts.execute({
        provider_id: 'non-existent-provider-id',
        part_id: part.id
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to list part with its subparts if it non-exists', async () => {
    const provider = await providersRepository.create({
      id: '12345678',
      name: 'Provider Name',
      cnpj: '12345679801234',
      password: 'password',
      segment: 'segment'
    })

    await expect(
      showPartWithSubparts.execute({
        provider_id: provider.id,
        part_id: 'non-existent-part-id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
