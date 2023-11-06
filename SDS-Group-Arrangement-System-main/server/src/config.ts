import Joi from 'joi'
import fs from 'fs'
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const configSchema = Joi.object({
  PORT: Joi.number().required().default(40001),
  URI: Joi.string().uri().required(),
})
const CONFIG_DIR: string = process.env.CONFIG_DIR || '/app/var/secrets';

const fileName = 'server';

const filePath = path.join(CONFIG_DIR, `${fileName}.json`)

const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'))

const { error, value } = configSchema.validate(jsonData)

if (error) {
    throw new Error(`Configuration for ${name} did not conform to schema:${JSON.stringify(error, null, 2)}`);
}

console.log(filePath, JSON.stringify(value));

export default value;


