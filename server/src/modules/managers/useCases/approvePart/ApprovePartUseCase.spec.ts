import { FakeManagersRepository } from '@modules/managers/repositories/fakes/FakeManagersRepository'
import { FakePartsRepository } from '@modules/parts/repositories/fakes/FakePartsRepository'
import { FakeReviewsRepository } from '@modules/parts/repositories/fakes/FakeReviewsRepository'
import { AppError } from '@shared/errors/AppError'

import { ApprovePartUseCase } from './ApprovePartUseCase'

let managersRepository: FakeManagersRepository
let partsRepository: FakePartsRepository
let reviewsRepository: FakeReviewsRepository
let approvePart: ApprovePartUseCase

describe('ApprovePart', () => {
  beforeEach(() => {
    managersRepository = new FakeManagersRepository()
    partsRepository = new FakePartsRepository()
    reviewsRepository = new FakeReviewsRepository()

    approvePart = new ApprovePartUseCase(
      managersRepository,
      partsRepository,
      reviewsRepository
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

    await reviewsRepository.create({
      manager_id: manager.id,
      part_id: part.id
    })

    const approvedPart = await approvePart.execute({
      manager_id: manager.id,
      part_id: part.id
    })

    expect(approvedPart.id).toBe(part.id)
    expect(approvedPart.status).toBe('APPROVED')
    expect(approvedPart.approval_date).not.toBeFalsy()
  })

  it('should not be able to approve a part if manager non exists', async () => {
    const part = await partsRepository.create({
      provider_id: 'provider_id',
      code: '123456',
      description: 'Description'
    })

    await reviewsRepository.create({
      manager_id: 'manager_id',
      part_id: part.id
    })

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

  it('should not be able to approve a part that is not under review', async () => {
    const manager = await managersRepository.create({
      email: 'manager@email.com',
      password: 'password'
    })

    const part = await partsRepository.create({
      provider_id: 'provider_id',
      code: '123456',
      description: 'Description'
    })

    await expect(
      approvePart.execute({
        manager_id: manager.id,
        part_id: part.id
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to approve a resolved part', async () => {
    const manager = await managersRepository.create({
      email: 'manager@email.com',
      password: 'password'
    })

    const part = await partsRepository.create({
      provider_id: 'provider_id',
      code: '123456',
      description: 'Description'
    })

    await reviewsRepository.create({
      manager_id: manager.id,
      part_id: part.id
    })

    await approvePart.execute({
      manager_id: manager.id,
      part_id: part.id
    })

    await expect(
      approvePart.execute({
        manager_id: manager.id,
        part_id: part.id
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
