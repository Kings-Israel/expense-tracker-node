import React, {useContext} from 'react'
import { GlobalContext } from '../context/GlobalState'
import { numberWithCommas } from '../utils/format'

export const Balance = () => {
  const { transactions } = useContext(GlobalContext)

  const amounts = transactions.map(transaction => transaction.amount)
  const total = amounts.reduce((total, amount) => (total += amount), 0).toFixed(2)
  return (
    <>
      <h4>Your Balance</h4>
      <h1 id='balamce'>Ksh.{numberWithCommas(total)}</h1>
    </>
  )
}
