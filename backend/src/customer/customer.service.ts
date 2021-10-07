import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './interfaces/customer.interface';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
	constructor(@InjectModel('Customer') private customerModel: Model<Customer>) {}

	// fetch all customers
	async getAllCustomer(): Promise<Customer[]> {
		const customers = await this.customerModel.find().exec();
		return customers;
	}

	// get single customer
	async getCustomer(customerId): Promise<Customer> {
		const customer = await this.customerModel.findById(customerId).exec();

		if(!customer) {
			throw new NotFoundException(`Customer with ID ${customerId} not found!`)
		}
		return customer;
	}

	// post a single customer
	async addCustomer(createCustomerDto: CreateCustomerDto): Promise<Customer> {
		const newCustomer = await this.customerModel.create(createCustomerDto);
		return newCustomer.save();
	}

	// edit customer details
	async updateCustomer(customerId, createCustomerDto: CreateCustomerDto): Promise<Customer> {
		const updatedCustomer = await this.customerModel.findByIdAndUpdate(customerId, createCustomerDto, {
			new: true
		});
		return updatedCustomer;
	}

	// delete a customer
	async deleteCustomer(customerId): Promise<any> {
		const deletedCustomer = await this.customerModel.findByIdAndRemove(customerId);

		return deletedCustomer;
	}
}
