import  { IsNotEmpty } from 'class-validator';

export class CreateCustomerDto {
	@IsNotEmpty()
	readonly first_name: string;
	
	@IsNotEmpty()
	readonly last_name: string;
	
	@IsNotEmpty()
	readonly email: string;
	
	@IsNotEmpty()
	readonly phone: string;

	@IsNotEmpty()
	readonly address: string;

	readonly description: string;

	readonly created_at: string;
}