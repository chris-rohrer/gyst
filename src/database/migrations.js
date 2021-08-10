import { schemaMigrations, createTable } from '@nozbe/watermelondb/Schema/migrations'

export default schemaMigrations({
 
  migrations: [
    /*
    {
      // ⚠️ Set this to a number one larger than the current schema version
      toVersion: 2,
      steps: [
        // See "Migrations API" for more details
        createTable({
            name: 'incomes',
            columns: [
              { name: 'title', type: 'string' },
              { name: 'amount', type: 'number'},
              { name: 'currency', type: 'string' },
              { name: 'date', type: 'number' },
            ]
          }),
      ],
    },
  */
 ],

})