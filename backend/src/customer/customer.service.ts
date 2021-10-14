import { Injectable, NotFoundException } from '@nestjs/common';
import { createConnection, getConnection, Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomerService {
	constructor(
		@InjectRepository(Customer) 
		private customerRepository: Repository<Customer>) {}

	// fetch all customers
	async getAllCustomer(): Promise<Customer[]> {
		const customers = await this.customerRepository.find();
		return customers;
	}

	// get single customer
	async getCustomer(customerId): Promise<Customer> {
		const customer = await this.customerRepository.findOne(customerId);
		// .createQueryBuilder()
		// .where("id = :id", { id: customerId })
		// .getOne();
		
		if(!customer) {
			throw new NotFoundException(`Customer with ID ${customerId} not found!`)
		}
		return customer;
	}

	// post a single customer
	async addCustomer(createCustomerDto: CreateCustomerDto): Promise<Customer> {
		const newCustomer = await this.customerRepository.createQueryBuilder()
		.insert()
		.into(Customer)
		.values([
			createCustomerDto
		 ])
		.execute();

		return;
	}

	// edit customer details
	async updateCustomer(customerId, createCustomerDto: CreateCustomerDto): Promise<Customer> {
		const updatedCustomer = await this.customerRepository
		.createQueryBuilder()
		.update(Customer)
		.set(createCustomerDto)
		.where("id = :id", {id: customerId})
		.execute();

		return await this.getCustomer(customerId);
	}

	// delete a customer
	async deleteCustomer(customerId): Promise<any> {
		return await this.customerRepository.delete(customerId);
		// .createQueryBuilder()
		// .delete()
		// .from(Customer)
		// .where("id = :id", {id: customerId})
		// .execute();
	}
}
