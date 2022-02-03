import { FakeManagersRepository } from '@modules/managers/repositories/fakes/FakeManagersRepository'
import { FakePartsRepository } from '@modules/parts/repositories/fakes/FakePartsRepository'
import { FakeSubpartsRepository } from '@modules/parts/repositories/fakes/FakeSubpartsRepository'
import { AppError } from '@shared/errors/AppError'

import { ApprovePartUseCase } from './ApprovePartUseCase'

let managersRepository: FakeManagersRepository
let partsRepository: FakePartsRepository
let subpartsRepository: FakeSubpartsRepository
let approvePart: ApprovePartUseCase

describe('ApprovePart', () => {
  beforeEach(() => {
    managersRepository = new FakeManagersRepository()
    partsRepository = new FakePartsRepository()
    subpartsRepository = new FakeSubpartsRepository()

    approvePart = new ApprovePartUseCase(
      managersRepository,
      partsRepository,
      subpartsRepository
    )
  })

  it('should be able to approve a part', async () => {
    const manager = await managersRepository.create({
      email: 'manager@email.com',
      password: 'password'
    })

    const part = await partsRepository.create({
      provider_id: 'provider_id',
      code: '123456',
      description: 'Description'
    })

    await subpartsRepository.create({
      provider_id: 'provider_id',
      name: 'Subpart',
      part_id: part.id,
      gwi_11a1: 'gwi.doc',
      fisp_msds: 'fisp.doc',
      rohs_report: 'rohs.doc',
      subgroup: 'subgroup'
    })

    part.status = 'UNDER_ANALYSIS'

    const approvedPart = await approvePart.execute({
      manager_id: manager.id,
      part_id: part.id
    })

    expect(approvedPart.status).toBe('APPROVED')
  })

  it('should not be able to approve if manager non-exists', async () => {
    const part = await partsRepository.create({
      provider_id: 'provider_id',
      code: '123456',
      description: 'Description'
    })

    await subpartsRepository.create({
      provider_id: 'provider_id',
      name: 'Subpart',
      part_id: part.id,
      gwi_11a1: 'gwi.doc',
      fisp_msds: 'fisp.doc',
      rohs_report: 'rohs.doc',
      subgroup: 'subgroup'
    })

    part.status = 'UNDER_ANALYSIS'

    await expect(
      approvePart.execute({
        manager_id: 'non-existent-manager-id',
        part_id: part.id
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to approve a non-existent part', async () => {
    const manager = await managersRepository.create({
      email: 'manager@email.com',
      password: 'password'
    })

    await expect(
      approvePart.execute({
        manager_id: manager.id,
        part_id: 'non-existent-part-id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to approve a part thats isn`t under analysis', async () => {
    const manager = await managersRepository.create({
      email: 'manager@email.com',
      password: 'password'
    })

    const part = await partsRepository.create({
      provider_id: 'provider_id',
      code: '123456',
      description: 'Description'
    })

    await subpartsRepository.create({
      provider_id: 'provider_id',
      name: 'Subpart',
      part_id: part.id,
      gwi_11a1: 'gwi.doc',
      fisp_msds: 'fisp.doc',
      rohs_report: 'rohs.doc',
      subgroup: 'subgroup'
    })

    await expect(
      approvePart.execute({
        manager_id: manager.id,
        part_id: part.id
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should noot be able to approve a part without subparts', async () => {
    const manager = await managersRepository.create({
      email: 'manager@email.com',
      password: 'password'
    })

    const part = await partsRepository.create({
      provider_id: 'provider_id',
      code: '123456',
      description: 'Description'
    })

    part.status = 'UNDER_ANALYSIS'

    await expect(
      approvePart.execute({
        manager_id: manager.id,
        part_id: part.id
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
