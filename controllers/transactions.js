const Transaction = require('../models/Transaction')
// @desc Get All Transactions
// @route GET /api/v1/transactions
// @access public
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find()

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}

// @desc Add A transaction
// @route POST /api/v1/transactions
// @access public
exports.addTransactions = async (req, res, next) => {
  try {
    const { text, amount }  = req.body
  
    const transaction = await Transaction.create({text: text, amount: amount})
  
    return res.status(201).json({
      success: true,
      data: transaction
    })
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(err => err.message)

      return res.status(400).json({
        success: false,
        error: messages
      })
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server error'
      })
    }
  }
}

// @desc Delete a Transactions
// @route DELETE /api/v1/transactions/:id
// @access public
exports.deleteTransactions = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id)

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'Transaction not found'
      })
    }

    await transaction.deleteOne()

    return res.status(200).json({
      success: true,
      data: {}
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}