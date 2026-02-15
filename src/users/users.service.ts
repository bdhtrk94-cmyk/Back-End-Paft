import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email } });
    }

    async findById(id: number): Promise<User | null> {
        return this.userRepository.findOne({ where: { id } });
    }

    async findOne(id: number): Promise<User | null> {
        return this.userRepository.findOne({ where: { id } });
    }

    async create(userData: Partial<User>): Promise<User> {
        // Hash password if provided
        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, 10);
        }
        
        const user = this.userRepository.create(userData);
        return this.userRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async count(): Promise<number> {
        return this.userRepository.count();
    }

    async update(id: number, userData: Partial<User>): Promise<User | null> {
        await this.userRepository.update(id, userData);
        return this.findById(id);
    }

    async remove(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }

    async updateRole(id: number, role: UserRole): Promise<User | null> {
        await this.userRepository.update(id, { role });
        return this.findById(id);
    }

    async countByRole(role: UserRole): Promise<number> {
        return this.userRepository.count({ where: { role } });
    }
}
