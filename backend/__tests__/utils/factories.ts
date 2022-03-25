import faker from '@faker-js/faker'
import factory from 'factory-girl'

import Level from 'App/Models/Level'
import Developer from 'App/Models/Developer'

factory.define('Level', Level, {
  level_name: 'Nível 1',
})

factory.define('Developer', Developer, (buildOptions) => {
  return {
    level_id: buildOptions.level_id,
    developer_name: faker.name.findName(),
    gender: Math.ceil(Math.random() * 2) === 1 ? 'f' : 'm',
    birthday: faker.date.past(),
    hobby: faker.word.verb(),
  }
})

export { factory, faker }
