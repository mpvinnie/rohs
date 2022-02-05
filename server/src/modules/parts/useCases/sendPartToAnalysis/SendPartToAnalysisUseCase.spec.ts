import { FakePartsRepository } from '@modules/parts/repositories/fakes/FakePartsRepository'
import { FakeSubpartsRepository } from '@modules/parts/repositories/fakes/FakeSubpartsRepository'
import { FakeProvidersRepository } from '@modules/providers/repositories/fakes/FakeProvidersRepository'
import { AppError } from '@shared/errors/AppError'

import { SendPartToAnalysisUseCase } from './SendPartToAnalysisUseCase'

let providersRepository: FakeProvidersRepository
let partsRepository: FakePartsRepository
let subpartsRepository: FakeSubpartsRepository
let sendPartToAnalysis: SendPartToAnalysisUseCase

describe('SendPartToAnalysis', () => {
  beforeEach(() => {
    providersRepository = new FakeProvidersRepository()
    partsRepository = new FakePartsRepository()
    subpartsRepository = new FakeSubpartsRepository()

    sendPartToAnalysis = new SendPartToAnalysisUseCase(
      providersRepository,
      partsRepository,
      subpartsRepository
    )
  })

  it('should be able to send part to analysis', async () => {
    const provider = await providersRepository.create({
      id: '12345678',
      name: 'Provider Name',
      cnpj: '12345679801234',
      password: 'password',
      segment: 'Segment'
    })

    const part = await partsRepository.create({
      code: '123456',
      description: 'Description',
      provider_id: provider.id,
      comment: 'Comment'
    })

    await subpartsRepository.create({
      provider_id: provider.id,
      name: 'Subpart',
      gwi_11a1: 'gwi_11a1.doc',
      fisp_msds: 'fisp.pdf',
      rohs_report: 'rohs.docx',
      part_id: part.id,
      subgroup: 'subgroup'
    })

    expect(part.status).toBe('NOT_SENT')

    const partSentToAnalysis = await sendPartToAnalysis.exucute({
      provider_id: provider.id,
      part_id: part.id
    })

    expect(part.id).toBe(partSentToAnalysis.id)
    expect(partSentToAnalysis.status).toBe('UNDER_ANALYSIS')
  })

  it('should not be able to send part to analysis if provider non-exists', async () => {
    const part = await partsRepository.create({
      code: '123456',
      description: 'Description',
      provider_id: 'provider_id',
      comment: 'Comment'
    })

    await subpartsRepository.create({
      provider_id: 'provider_id',
      name: 'Subpart',
      gwi_11a1: 'gwi_11a1.doc',
      fisp_msds: 'fisp.pdf',
      rohs_report: 'rohs.docx',
      part_id: part.id,
      subgroup: 'subgroup'
    })

    await expect(
      sendPartToAnalysis.exucute({
        provider_id: 'non-existent-provider-id',
        part_id: part.id
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to send part to analysis if it non-exists', async () => {
    const provider = await providersRepository.create({
      id: '12345678',
      name: 'Provider Name',
      cnpj: '12345679801234',
      password: 'password',
      segment: 'Segment'
    })

    await expect(
      sendPartToAnalysis.exucute({
        provider_id: provider.id,
        part_id: 'non-existent-part-id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to send to analysis a part if its status is not `NOT_SENT`', async () => {
    const provider = await providersRepository.create({
      id: '12345678',
      name: 'Provider Name',
      cnpj: '12345679801234',
      password: 'password',
      segment: 'Segment'
    })

    const part = await partsRepository.create({
      code: '123456',
      description: 'Description',
      provider_id: provider.id,
      comment: 'Comment'
    })

    await subpartsRepository.create({
      provider_id: provider.id,
      name: 'Subpart',
      gwi_11a1: 'gwi_11a1.doc',
      fisp_msds: 'fisp.pdf',
      rohs_report: 'rohs.docx',
      part_id: part.id,
      subgroup: 'subgroup'
    })

    expect(part.status).toBe('NOT_SENT')

    await sendPartToAnalysis.exucute({
      provider_id: provider.id,
      part_id: part.id
    })

    await expect(
      sendPartToAnalysis.exucute({
        provider_id: provider.id,
        part_id: part.id
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to send part to analysis if it has no subparts', async () => {
    const provider = await providersRepository.create({
      id: '12345678',
      name: 'Provider Name',
      cnpj: '12345679801234',
      password: 'password',
      segment: 'Segment'
    })

    const part = await partsRepository.create({
      code: '123456',
      description: 'Description',
      provider_id: provider.id,
      comment: 'Comment'
    })

    await expect(
      sendPartToAnalysis.exucute({
        provider_id: provider.id,
        part_id: part.id
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
