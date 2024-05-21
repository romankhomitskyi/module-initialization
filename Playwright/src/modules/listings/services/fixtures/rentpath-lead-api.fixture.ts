import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';

export class RentpathLeadApiFixture {
	public name: string;
	public phone: string;
	public email: string;
	public message: string;
	public moveInTimeframe: string;
	constructor({
		name = 'name',
		phone = '380912862379',
		email = 'll@gmail.com',
		message = faker.random.words(10), //faker.word.words(10)
		moveInTimeframe = DateTime.now().toFormat('dd/MM/yyyy'),
	}: Partial<RentpathLeadApiFixture> = {}) {
		this.name = name;
		this.phone = phone;
		this.email = email;
		this.message = message;
		this.moveInTimeframe = moveInTimeframe;
	}
}

