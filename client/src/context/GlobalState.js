import React, { createContext, useReducer } from "react";
import AppReducer from './AppReducer'
import axios from 'axios'

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'http://194.163.129.200/expense-tracker-api'

// Initial state
const initialState = {
  transactions: [],
  error: null,
  loading: true,
}

// Create context
export const GlobalContext = createContext(initialState)

// Provider Component
export const GlobalProvider = ({children}) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)

  // actions
  async function getTransactions() {
    try {
      const response = await axios.get('/api/v1/transactions')
      console.log(response.data.data)
      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: response.data.data
      })
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      })
    }
  }
  async function deleteTransaction(id) {
    try {
      await axios.delete(`/api/v1/transactions/${id}`)

      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id
      })
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      })
    }
  }
  async function addTransaction(transaction) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    
    try {
      const response = await axios.post('/api/v1/transactions', transaction, config)
      dispatch({
        type: 'ADD_TRANSACTION',
        payload: response.data.data
      })
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      })
    }
  }
  
  return (<GlobalContext.Provider value={{
    transactions: state.transactions,
    error: state.error,
    loading: state.loading,
    deleteTransaction,
    addTransaction,
    getTransactions,
  }}>
    {children}
  </GlobalContext.Provider>)
}
