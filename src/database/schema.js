import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default mySchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'transactions',
      columns: [
        { name: 'title', type: 'string' },
        { name: 'amount', type: 'number'},
        { name: 'currency', type: 'string' },
        { name: 'date', type: 'number' },
      ]
    }),
    tableSchema({
      name: 'birthdays',
      columns: [
        { name: 'firstName', type: 'string' },
        { name: 'lastName', type: 'string'},
        { name: 'date', type: 'number' },
      ]
    }),
  ]
})