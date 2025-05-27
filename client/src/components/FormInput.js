import  React from 'react';
import Button from "@material-ui/core/Button";
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, gray 30%, black 90%)',
        border: 0,
        color: 'white',
        height: 30,
        padding: '0 10px',
        whiteSpace: 'nowrap',
        margin: '15px 0 0 20px',
    },
    label: {
        width: '80%'
    }
});


const TodoCreator = ({ theme, todo, setTodo, clearInput, inputRef, isInputEmpty, preventSubmit }) => {
    const classes = useStyles();

    return (
        <div className="form__input">
            <ThemeProvider theme={theme}>
                <FormControl   className={classes.label}>
                    <TextField
                        id="outlined-basic"
                        label="Ajouter une tache" 
                        value={todo}
                        variant="outlined"
                        onChange={(e) => setTodo(e.target.value)}
                        onFocus={clearInput}
                        ref={inputRef}
                        aria-describedby="component-error-text"
                        onKeyPress={preventSubmit}
                    />

                    { !isInputEmpty ?
                        <></>
                        :
                        <>
                        <FormHelperText id="component-error-text" className="form__error">
                            Erreur: la tâche ne peut pas être vide
                        </FormHelperText>                       
                        </>
                    }
                </FormControl>
                <Button
                    type="submit"
                    className={classes.root}
                    onKeyPress={preventSubmit}
                >
                    Ajouter
                </Button>
            </ThemeProvider>
        </div>
    )

}

export  default TodoCreator;