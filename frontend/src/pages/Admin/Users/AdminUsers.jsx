import { useEffect, useState } from "react";

import { getAllUsers } from "../../../services/UserServices";

import "./AdminUsers.css";

export default function AdminUsers() {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadUsers();

    }, []);


    async function loadUsers() {

        try {

            const response = await getAllUsers();

            console.log("Users:", response.data);

            setUsers(response.data);

        } catch (error) {

            console.error(
                "Failed to load users:",
                error
            );

        } finally {

            setLoading(false);

        }

    }


    if (loading) {

        return (
            <div className="admin-page-loading">
                Loading Users...
            </div>
        );

    }


    return (

        <div className="admin-users-page">

            <div className="admin-page-header">

                <div>

                    <span>
                        CUSTOMER MANAGEMENT
                    </span>

                    <h1>
                        Users
                    </h1>

                    <p>
                        Manage all registered ShopKart users.
                    </p>

                </div>


                <div className="user-count">

                    {users.length} Users

                </div>

            </div>


            <div className="users-table-wrapper">

                <table className="users-table">

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Status</th>

                        </tr>

                    </thead>


                    <tbody>

                        {users.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="no-users"
                                >
                                    No users found
                                </td>

                            </tr>

                        ) : (

                            users.map((user) => (

                                <tr key={user.id}>

                                    <td>
                                        #{user.id}
                                    </td>


                                    <td>

                                        <strong>
                                            {user.firstName}{" "}
                                            {user.lastName}
                                        </strong>

                                    </td>


                                    <td>
                                        {user.email}
                                    </td>


                                    <td>
                                        {user.phone}
                                    </td>


                                    <td>

                                        <span
                                            className={
                                                user.role === "ADMIN"
                                                    ? "role-admin"
                                                    : "role-user"
                                            }
                                        >
                                            {user.role}
                                        </span>

                                    </td>


                                    <td>

                                        <span
                                            className={
                                                user.active
                                                    ? "user-active"
                                                    : "user-inactive"
                                            }
                                        >

                                            {user.active
                                                ? "Active"
                                                : "Inactive"}

                                        </span>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}