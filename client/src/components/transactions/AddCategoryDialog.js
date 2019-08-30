import React, { Fragment } from 'react';
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
import { connect } from 'react-redux';
import { addCategoryPrivate ,addCategoryPublic} from "../../actions/index"

const useStyles = makeStyles(theme => ({
    select: {
        margin: theme.spacing(3, 0)
    },
    btn:{
        marginRight:15
    }
}));


function FormDialog({ addCategoryPrivate ,addCategoryPublic,userRole}) {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }


    const [values, setValues] = React.useState({
        name: "",
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
            name: values.name,
            type: values.type
        }
        if(userRole == "superAdmin"){
            addCategoryPublic(formData);
        }
        else{
            addCategoryPrivate(formData);
        }
        
        setValues(() => ({
            name: "",
            type: ""
        }));
        setOpen(false);
    }

    return (
        <Fragment>
            <Button variant="outlined" color="primary" className={classes.btn} onClick={handleClickOpen}>
                Add Category
            </Button>
            <Dialog fullWidth={true} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Category</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Category Name"
                        type="text"
                        fullWidth
                        onChange={handleChange}
                        value={values.name}
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
        </Fragment>
    );
}

const mapStateToProps = (state)=>({
    userRole : state.auth.userData.data.role
})

export default connect(mapStateToProps, {addCategoryPrivate,addCategoryPublic })(FormDialog)