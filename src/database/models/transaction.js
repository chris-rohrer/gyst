import { Model } from '@nozbe/watermelondb'
import { field, date } from '@nozbe/watermelondb/decorators'

export default class Transaction extends Model {
  static table = 'transactions'

  @field('title') title
  @field('amount') amount
  @field('currency') currency
  @date('date') date

  getTransaction() {
    return {
      title: this.title,
      amount: this.amount,
      currency: this.currency,
      date: this.date
    };
  }

  updateTransaction = async updatedTransaction => {
    await this.update(transaction => {
      transaction.title = updatedTransaction.title;
      trancsaction.amount = updatedTransaction.amount;
      transaction.currency = updatedTransaction.currency;
      transaction.date = updatedTransaction.date;
    });
  };

  async deleteTransaction() {
    await this.markAsDeleted(); // syncable
    await this.destroyPermanently(); // permanent
  }
}