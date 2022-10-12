import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../../stores";
import { observer } from "mobx-react";
import classes from './UserEditPage.module.css';
import Card from "../../../components/layout/Card.js";
const UserEditPage = () => {
    const { userStore } = useStore();
    let { id } = useParams();
    const isCreate = id === undefined;
    const userId = id;
    useEffect(() => {
        if (isCreate) {
            return;
        }
        userStore.getUserByIdAsync(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Card>
            <div>
                {isCreate ?
                    <>
                        <div className={classes.control}>
                            <label htmlFor='status'>Username</label>
                            <input type='text' required ref={userStore.username} />
                        </div>    
                        <div className={classes.control}>
                            <label htmlFor='status'>Password</label>
                            <input type='text' required ref={userStore.password} />
                        </div>   
                    </>
                    : ""
                }
                <div className={classes.control}>
                    <label htmlFor='firstName'>First Name</label>
                    <input type='text' required ref={userStore.firstName} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='lastName'>Last Name</label>
                    <input type='text' required ref={userStore.lastName} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='email'>Email</label>
                    <input type='email' required ref={userStore.email} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='status'>Status</label>
                    <input type='text' required ref={userStore.status} />
                </div>      
                <div className={classes.actions}>
                    <button onClick={() => userStore.saveUser(userId, isCreate)}>Save</button>
                </div>
            </div>
        </Card>
    )
}

export default observer(UserEditPage);
