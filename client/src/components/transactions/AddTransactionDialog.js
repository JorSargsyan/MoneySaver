import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { addTransaction } from "../../actions/index"
import { connect } from 'react-redux';
import { getAllCategories } from "../../actions/index"

const useStyles = makeStyles(theme => ({
    select: {
        margin: theme.spacing(3, 0)
    }
}));


function FormDialog({ addTransaction, getAllCategories, categories, loading }) {

    useEffect(() => {
        getAllCategories();
    }, [])

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }


    const [values, setValues] = React.useState({
        category: "",
        note: "",
        amount: 0,
        type: ""
    });


    const handleChange = (event) => {
        event.persist();
        setValues(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }));
    }


    const handleSubmit = (event) => {
        event.preventDefault();

        let formData = {
            category: values.category,
            note: values.note,
            amount: values.amount,
            type: values.type
        }

        addTransaction(formData);

        setOpen(false);
    }

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Add transaction
            </Button>
            <Dialog fullWidth={true} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Transaction</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="note"
                        label="Any Notes"
                        type="text"
                        fullWidth
                        onChange={handleChange}
                        value={values.note}
                    />
                    <TextField
                        margin="dense"
                        name="amount"
                        label="Amount"
                        type="number"
                        fullWidth
                        value={values.amount}
                        onChange={handleChange}
                    />
                    <div className={classes.select}>
                        <InputLabel htmlFor="category">Type</InputLabel>
                        <Select
                            fullWidth
                            value={values.type}
                            onChange={handleChange}
                            inputProps={{
                                name: 'type',
                                id: 'type',
                            }}
                        >

                            <MenuItem value="Income">Income</MenuItem>
                            <MenuItem value="Expense">Expense</MenuItem>
                        </Select>
                    </div>
                    {
                        values.type &&
                        <div className={classes.select}>
                            <InputLabel htmlFor="category">Category</InputLabel>
                            <Select
                                fullWidth

                                value={values.category}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'category',
                                    id: 'category',
                                }}
                            >
                                {
                                    categories && categories.map(item => {
                                        if (item.transactionType.name === values.type) {
                                            return <MenuItem key={item._id} value={item.name}>{item.name}</MenuItem>
                                        }

                                    })
                                }

                            </Select>
                        </div>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Execute
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapStateToProps = (state) => ({
    categories: state.categories.categories,
    loading: state.categories.loading
})

export default connect(mapStateToProps, { addTransaction, getAllCategories })(FormDialog)