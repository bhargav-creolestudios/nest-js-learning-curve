import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, Res, Put, Delete, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customer')
export class CustomerController {
	constructor(private customerService: CustomerService) {}

	// add a customer
	@Post('/create')
	@UsePipes(ValidationPipe)
	async addCustomer(@Res() res, @Body() createCustomerDto: CreateCustomerDto) {
		const customer = await this.customerService.addCustomer(createCustomerDto);

		return res.status(HttpStatus.OK).json({
			message: "Customer has been created successfully",
			customer
		})
	}

	// Retrieve customers list
	@Get('/customers')
	async getAllCustomer(@Res() res) {
		const customers = await this.customerService.getAllCustomer();

		return res.status(HttpStatus.OK).json(customers);
	}

	// Fetch a particular customer with Id
	@Get('customer/:customerId')
	async getCustomer(@Res() res, @Param('customerId') customerId) {
		const customer = await this.customerService.getCustomer(customerId);

		if(!customer) {
			throw new NotFoundException('Customer does not exist!');
		}

		return res.status(HttpStatus.OK).json(customer);
	}

	@Put('/update')
    async updateCustomer(@Res() res, @Query('customerID') customerID, @Body() CreateCustomerDto: CreateCustomerDto) {
        const customer = await this.customerService.updateCustomer(customerID, CreateCustomerDto);
        if (!customer) throw new NotFoundException('Customer does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Customer has been successfully updated',
            customer
        });
    }

    // Delete a customer
    @Delete('/delete')
    async deleteCustomer(@Res() res, @Query('customerID') customerID) {
        const customer = await this.customerService.deleteCustomer(customerID);
        if (!customer) throw new NotFoundException('Customer does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Customer has been deleted',
            customer
        })
    }
}
