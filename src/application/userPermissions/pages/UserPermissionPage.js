import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom"
import { useStore } from "../../../stores";
import { useEffect } from "react";
import classes from './UserPermissionPage.module.css';
import Card from "../../../components/layout/Card.js";

const UserPermissionsPage = () => {
    const { userPermissionStore } = useStore();
    let { id } = useParams(); 
    const userId = id;
    useEffect(() => {
        userPermissionStore.getPermissionsAsync();
        userPermissionStore.getUserByIdAsync(userId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Card>
                <div className={classes.control}>User: { userPermissionStore.user ? userPermissionStore.user.firstName + " " + userPermissionStore.user.lastName : "" }</div>
                <ul>
                    {userPermissionStore.permissions.map((permission, index) => 
                        <li key={index}>
                            <div key={index}>
                                <div className={classes.content}>
                                    <div className={classes.control}>
                                        <label>Code</label>
                                        <span>{permission.code}</span>
                                    </div>
                                    <div className={classes.control}>
                                        <label>Description</label>
                                        <span>{permission.description}</span>
                                    </div>
                                    <div className={classes.content}>
                                        <button onClick={() => userPermissionStore.changePermission(permission.id)}>
                                            {userPermissionStore.userPermissionsIds.some(x => x === permission.id) ? 'Remove permission' : 'Add permission'}
                                        </button>
                                    </div>
                                </div>
                            </div> 
                        </li>
                    )}
                    </ul>
            </Card>
            
        </div>
    )
}

export default observer(UserPermissionsPage);