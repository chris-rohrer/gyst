import { Model } from '@nozbe/watermelondb'
import { field, date } from '@nozbe/watermelondb/decorators'

export default class Birthday extends Model {
  static table = 'birthdays'

  @field('firstName') firstName
  @field('lastName') lastName
  @date('date') date

  getTransaction() {
    return {
      firstName: this.title,
      lastName: this.amount,
      date: this.date
    };
  }

  updateTransaction = async updatedBirthday => {
    await this.update(birthday => {
      birthday.firstName = updatedTransaction.title;
      birthday.lastName = updatedTransaction.amount;
      birthday.date = updatedTransaction.date;
    });
  };

  async deleteBirthday() {
    await this.markAsDeleted(); // syncable
    await this.destroyPermanently(); // permanent
  }
}