import React from 'react'
import '../resources/analytics.css'
import { Progress } from 'antd'

const Analytics = ({transactions}) => {
  const totalTransactions = transactions.length
  const totalIncomeTransaction = transactions.filter(transaction => transaction.type === 'income')
  const totalExpenseTransaction = transactions.filter(transaction => transaction.type === 'expense')
  const totalIncomeTransactionsPercentage = (totalIncomeTransaction.length / totalTransactions) * 100;
  const totalExpenseTransactionsPercentage = (totalExpenseTransaction.length / totalTransactions) * 100;

  const totalTurnOver = transactions.reduce((acc, transaction) => acc + transaction.amount, 0)
  const totalIncomeTurnOver = transactions.filter(transaction => transaction.type==='income').reduce((acc, transaction) => transaction.type === 'income' && acc + transaction.amount, 0)
  const totalExpenseTurnOver = transactions.filter((transaction) => transaction.type === "expense").reduce(
    (acc, transaction) =>
      transaction.type === "expense" && acc + transaction.amount,
    0
  );
  const totatIncomeTurnOverPercentage = (totalIncomeTurnOver / totalTurnOver) * 100;
  const totalExpenseTurnOverPercentage = (totalExpenseTurnOver / totalTurnOver) * 100;

  const categories = ['salary', 'rent', 'food', 'transportation', 'entertainment', 'medical', 'investment', 'other']

  return (
    <div className="analytics">
      <div className="row">
        <div className="col-md-4 mt-3">
          <div className="transaction-count">
            <h4>Total Transactions : {totalTransactions}</h4>
            <hr />
            <h5>Income : {totalIncomeTransaction.length}</h5>
            <h5>Expense : {totalExpenseTransaction.length}</h5>

            <div className="progress-bars">
              <Progress
                type="circle"
                percent={
                  totalIncomeTransactionsPercentage &&
                  totalIncomeTransactionsPercentage.toFixed(1)
                }
                width={100}
                strokeColor="#5DD64F"
              />
              <Progress
                className="mx-5"
                type="circle"
                percent={
                  totalExpenseTransactionsPercentage &&
                  totalExpenseTransactionsPercentage.toFixed(1)
                }
                width={100}
                strokeColor="#E5572F"
              />
            </div>
          </div>
        </div>

        <div className="col-md-4 mt-3">
          <div className="transaction-count">
            <h4>Total TurnOver : {totalTurnOver}</h4>
            <hr />
            <h5>Income : {totalIncomeTurnOver}</h5>
            <h5>Expense : {totalExpenseTurnOver}</h5>

            <div className="progress-bars">
              <Progress
                type="circle"
                percent={
                  totatIncomeTurnOverPercentage &&
                  totatIncomeTurnOverPercentage.toFixed(1)
                }
                width={100}
                strokeColor="#5DD64F"
              />
              <Progress
                className="mx-5"
                type="circle"
                percent={totatIncomeTurnOverPercentage && totalExpenseTurnOverPercentage.toFixed(
                  1
                )}
                width={100}
                strokeColor="#E5572F"
              />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-6">
          <div className="category-analysis">
            <h4>Income - Category Wise </h4>
            {categories.map((category) => {
              const amount = transactions
                .filter((t) => t.type === "income" && t.category === category)
                .reduce((acc, t) => acc + t.amount, 0);
              return (
                amount > 0 && (
                  <div className="category-card">
                    <h5>{category}</h5>
                    <Progress
                      percent={((amount / totalIncomeTurnOver) * 100).toFixed(
                        1
                      )}
                      strokeColor="#0B5AD9"
                      width={100}
                    />
                  </div>
                )
              );
            })}
          </div>
        </div>

        <div className="col-md-6">
          <div className="category-analysis">
            <h4>Expense - Category Wise </h4>
            {categories.map((category) => {
              const amount = transactions
                .filter((t) => t.type === "expense" && t.category === category)
                .reduce((acc, t) => acc + t.amount, 0);
              return (
                amount > 0 && (
                  <div className="category-card">
                    <h5>{category}</h5>
                    <Progress
                      percent={((amount / totalExpenseTurnOver) * 100).toFixed(
                        1
                      )}
                      strokeColor="#9e1029"
                      width={100}
                    />
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics
