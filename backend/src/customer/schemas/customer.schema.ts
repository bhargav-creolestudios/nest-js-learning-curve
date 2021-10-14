import { EntitySchema } from 'typeorm';
import { Customer } from '../entities/customer.entity';

export const CustomerSchema = new EntitySchema<Customer>({
	name: 'customer',
	columns: {
		first_name: {type: String, length: 100},
		last_name: {type: String ,length: 100},
		email: {type: String, length: 50},
		phone: {type: String, length: 10},
		address: {type: String, length: 200},
		description: {type: String, length: 200},
		created_at: {
			type: String
		}	
	}	
})