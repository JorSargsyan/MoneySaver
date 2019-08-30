const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const auth = require("../../middleware/auth")
const Category = require("../../models/Category");
const TransactionType = require("../../models/TransactionType");
const Transaction = require("../../models/Transaction");
const router = express.Router();


//@route        POST api/transactions
//@desc         add a new transaction
//@access       private

router.post("/", [
    auth,
    [check("amount", "Please enter valid amount").isNumeric().not().isEmpty(),
    check("category", "Please enter valid category").isString().not().isEmpty(),
    check("type", "Please enter valid type").isString().not().isEmpty()
    ]
], (async (req, res) => {
    const errors = validationResult(req);
    let { amount, note, category, type } = req.body;
    if (!errors.isEmpty()) {
        return res.status(500).json({ errors: errors.array() });
    }
    try {
        let selectedcategory = await Category.findOne({ "name": category });
        let transactionType = await TransactionType.findOne({ "name": type });
       

        const newTransaction = new Transaction({
            user: req.user.id,
            amount,
            note,
            category: selectedcategory.id,
            transactionType: transactionType.id
        })


        await newTransaction.save();
        let transactions = await Transaction.find({user : req.user.id});

        res.json(transactions);


    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server error");
    }
}))



//@route        POST api/transactions/getAllTransactions
//@desc         GET ALL TRANSACTIONS
//@access       private

router.get("/getAllTransactions", auth, async (req, res) => {
    try {

        let user = await User.findById(req.user.id);
        let TransactionList = await Transaction.find({ user: user._id }).populate("category", ['name']).populate("transactionType", ['name']);

        res.json(TransactionList);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server error");
    }
})


//@route        POST api/transactions/getAllTransactionsByDate
//@desc         get all transactions by date
//@access       private

router.post("/getAllTransactionsByDate", auth, async (req, res) => {
    try {
        let { from, to } = req.body;

        fromDate = new Date(from).toISOString();
        toDate = new Date(to).toISOString();
        let user = await User.findById(req.user.id);
        let TransactionList = await Transaction.find(
            {
                "user": user._id, "date":
                { $gte: fromDate, $lte: toDate }
            }).populate("category", ['name']).populate("transactionType", ['name']);

        res.json(TransactionList);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server error");
    }
})


//@route    GET api/getChartInfoByDate
//@Desc     get all calculations by date to view in the chart.
//@access   private

router.post("/getChartInfoByDate", auth, async (req, res) => {
    try {
        let { from, to } = req.body;

        fromDate = new Date(from).toISOString();
        toDate = new Date(to).toISOString();
        let user = await User.findById(req.user.id);
        let TransactionList = await Transaction.find( {
            "user": user._id, "date":
            { $gte: fromDate, $lte: toDate }
        }).populate("category", ['name']).populate("transactionType", ['name']);

        //Calculate the balance
        let TotalBalance = 0;
        let ExpenseAmount = 0;
        let IncomeAmount = 0;
        let expenses = [];
        let incomes = [];

        TransactionList.map((item) => {
            if (item.transactionType.name === "Expense") {
                TotalBalance -= item.amount;
                ExpenseAmount += item.amount;
                let existingCategoryIndex = expenses.findIndex(i => i.category === item.category.name);
                if (existingCategoryIndex > -1) {
                    expenses = [...expenses, {
                        "amount": expenses[existingCategoryIndex].amount + item.amount,
                        "category": expenses[existingCategoryIndex].category
                    }]
                    expenses.splice(existingCategoryIndex, 1);
                }
                else {
                    expenses.push({ "amount": item.amount, "category": item.category.name });
                }

            }
            else {
                TotalBalance += item.amount;
                IncomeAmount += item.amount;

                let existingCategoryIndex = incomes.findIndex(i => i.category === item.category.name);
                if (existingCategoryIndex > -1) {
                    incomes = [...incomes, {
                        "amount": incomes[existingCategoryIndex].amount + item.amount,
                        "category": incomes[existingCategoryIndex].category
                    }]
                    incomes.splice(existingCategoryIndex, 1);
                }
                else {
                    incomes.push({ "amount": item.amount, "category": item.category.name })
                }


            }
        })

        expenses.map((i) => {
            i.percent = Math.round((100 * i.amount) / ExpenseAmount);
        })

        incomes.map((i) => {
            i.percent = Math.round((100 * i.amount) / IncomeAmount);
        })

        const resData = {
            TotalBalance,
            ExpenseAmount,
            IncomeAmount,
            expenses,
            incomes
        }


        res.json(resData);



    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server error");
    }
})


module.exports = router;