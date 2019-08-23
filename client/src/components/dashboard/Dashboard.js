import React from 'react'
import Header from "./Header"
import TransactionList from "../transactions/TransactionsList"


export default function Dashboard() {
    return (
        <div>
            <Header />
            <TransactionList />
        </div>
    )
}
