import { useEffect, useState } from "react";

import axios, { AxiosError, AxiosResponse } from "axios";
import { User } from "../../../packages/core/src/models";
export enum STATUS {
  ACTIVE = "ACTIVE",
  OFFLINE = "OFFLINE",
}
const Profile = () => {
  axios.defaults.baseURL = "http://localhost:5173";
  const [status, setStatus] = useState<STATUS>(STATUS.OFFLINE);
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    axios
      .get("api/getStatus")
      .then((res: AxiosResponse<{ isActive: STATUS }>) => {
        setStatus(res.data.isActive);
      })
      .catch((err: AxiosError) => {
        console.error({ err });
      });

    axios.get("api/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <div>
      {status === STATUS.ACTIVE ? (
        <div data-testid="user-active">this user is active</div>
      ) : (
        <div data-testid="user-offline">this user is offline</div>
      )}

      <div>
        <h1>Users</h1>
        <ul>
          {users?.map((user) => (
            <li key={user.id}>
              <p>{user.name}</p>
              <p>{user.email}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
