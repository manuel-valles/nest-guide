import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { UserRepository } from './user.repository';

const mockCredentialsDto = { username: 'UserTest', password: 'TestPassword' }

describe('UserRepository', () => {
    let userRepository

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                UserRepository
            ]
        }).compile()

        userRepository = await module.get<UserRepository>(UserRepository)
    })

    describe('signUp', () => {
        let save
        beforeEach(() => {
            save = jest.fn()
            userRepository.create = jest.fn().mockReturnValue({ save })
        })

        it('successfully signs up the user', () => {
            save.mockResolvedValue(undefined)
            expect(userRepository.signUp(mockCredentialsDto)).resolves.not.toThrow()
        })

        it('throws a conflict exception as username already exists', async () => {
            save.mockRejectedValue({ code: '23505' })
            expect(userRepository.signUp(mockCredentialsDto)).rejects.toThrow(ConflictException)
        })

        it('throws an internal exception', () => {
            save.mockRejectedValue({ code: '12345' })
            expect(userRepository.signUp(mockCredentialsDto)).rejects.toThrow(InternalServerErrorException)
        })
    })
})