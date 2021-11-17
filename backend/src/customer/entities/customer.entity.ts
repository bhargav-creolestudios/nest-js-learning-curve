import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    first_name: string;

	@Column({length: 100})
	last_name: string;

	@Column({length: 50})
	email: string;

	@Column({ length: 10})
	phone: string;

	@Column({length: 200})
	address: string;

	@Column({length: 100})
	description: string;

	@Column()
	files: string;

	@Column({ default: new Date().toLocaleDateString(undefined, {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	})})
	created_at: String;
}