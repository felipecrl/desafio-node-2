import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactiontDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const listIncome = this.transactions.filter(
      transaction => transaction.type === 'income',
    );

    const sumIncome = listIncome.reduce((sum, transaction) => {
      return sum + transaction.value;
    }, 0);

    const listOutcome = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    const sumOutcome = listOutcome.reduce((sum, transaction) => {
      return sum + transaction.value;
    }, 0);

    const balance = {
      income: sumIncome,
      outcome: sumOutcome,
      total: sumIncome - sumOutcome,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactiontDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
