import {test} from "@playwright/test";
import {faker} from "@faker-js/faker";


test.describe('descrive', () => {
    const lead = faker.random.words(10)
    test('test', async ({})=> {
        console.log(lead)
    })
})
