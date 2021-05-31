import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@material-ui/core";
import { Add, AddCircleOutlineOutlined, Delete, SubjectOutlined, Update } from "@material-ui/icons";
import { Fragment, useLayoutEffect, useState } from "react";


const TableDisplay = ({data, onDelete, onUpdate})=>{

    const handleDelete=(id)=>{
        onDelete(id);
    }

    const handleUpdate = (dt)=>{
        onUpdate(dt);
    }

    return (
        <div>
            <Paper>
            <Table>
                <TableHead color="primary">
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Options</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(dt=>(
                        <TableRow key={dt.id}>
                            <TableCell>{dt.id}</TableCell>
                            <TableCell>{dt.title}</TableCell>
                            <TableCell>{dt.desc}</TableCell>
                            <TableCell>
                                <span onClick={()=>handleUpdate(dt)}><Update style={{color:"green", marginRight:"25px"}} /></span>
                                <span onClick={()=>handleDelete(dt.id)}><Delete color="secondary"/></span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </Paper>
        </div>
    )
}

const AddTodo = ({onTodoAdd,dialog,t="", d=""})=>{
    const [dialogOpen, setDialogOpen] = useState(dialog);
    const [title, setTitle] = useState(t)
    const [desc, setDesc] = useState(d)

    const onDialogOpen = ()=>setDialogOpen(true)

    const onDialogClosed = ()=>setDialogOpen(false)

    const onCreate = ()=>{
        onTodoAdd({title: title, desc: desc})
        onDialogClosed()
    }
    
    return (
        <Fragment>
            <Button 
            onClick={onDialogOpen}
            variant="contained" 
            style={{float:"right"}}
            color="primary" 
            endIcon={<Add/>}>
                Add Todo
            </Button>
            
            <Dialog open={dialogOpen} onClose={onDialogClosed}>
                <DialogTitle>
                    New Todo 
                </DialogTitle>
                <DialogContent>
                    <TextField value={title} onChange={e=>setTitle(e.target.value)} fullWidth margin="normal" label="Title"/>
                    <TextField value={desc} onChange={e=>setDesc(e.target.value)} fullWidth margin="normal" label="description"/>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={onDialogClosed}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={onCreate}>Create</Button>
                </DialogActions>
            </Dialog>

        </Fragment>
    )
}

const useStyle = makeStyles((theme)=>({
    drawer: {
        width: 240,
        marginLeft: 20,
    },
    paper:{
        width: 240
    },
    root:{
        display: "flex"
    },
    page:{
        width: "100%",
        padding: theme.spacing(4)
    },
    active: {
        backgroundColor:"#eff"
    },
    title:{
        padding: theme.spacing(3),
        backgroundColor:"#000",
        color: "#fff"
    }
}))

const TestTodo = ()=>{


    const [todos, setTodos] = useState([
        {id: 1, title: "my first todo", desc: "Some first description of "},
        {id: 2, title: "my second todo", desc: "Some second description of "},
        {id: 3, title: "my third todo", desc: "Some third description of "}
    ]);
    const [open, setOpen] = useState(false)

    const handleAdd = (todo)=>{
        setTodos([...todos, {id:todos.length>0 ? todos[todos.length-1].id + 1: 1, title: todo.title, desc:todo.desc}])
    }

    const deleteTodo = (id)=>{
      const myTodos = [...todos];
      const index = myTodos.findIndex(td=>td.id === id)
      myTodos.splice(index,1)
      setTodos(myTodos)
    }
    const updateTodo = d=>{
        setOpen(true)
    }

    useLayoutEffect(()=>{
    },[open]);

    const items = [
        {
            text: "My Todos",
            icon: <SubjectOutlined color="secondary"/>
        },
        {
            text: "Create Todo",
            icon: <AddCircleOutlineOutlined color="secondary"/>
        }
    ]
    
    const classes = useStyle()
    return (
        <div className={classes.root}>
            <Drawer
                className= {classes.drawer}
                variant="permanent"
                anchor = "left"
                classes={{paper: classes.paper}}
                >
                <div>
                    <Typography className={classes.title}>My Todo App</Typography>

                    <List>
                        {items.map((it)=>(
                            <ListItem key={it.text} button className={classes.active}>
                                <ListItemIcon>{it.icon}</ListItemIcon>
                                <ListItemText primary={it.text }/>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>

            <div className={classes.page}>
                <AddTodo t="sdfdsfdfs" dialog={open} d = "ffdsfsdfsdfdf" onTodoAdd={handleAdd} onUpdateTodo={updateTodo} />
                <TableDisplay data={todos} onDelete={deleteTodo} onUpdate={updateTodo} />
            </div>
        </div>
    )
}

export default TestTodo;