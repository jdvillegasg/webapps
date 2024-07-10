import { useAppDispatch } from "../hooks/store";
import {
  deleteUserById,
  UserId,
  addNewUser,
  type User,
} from "../store/users/slice";
export const useUserActions = () => {
  const dispatch = useAppDispatch();

  const removeUser = (id: UserId) => {
    dispatch(deleteUserById(id));
  };

  const addUser = ({ name, email, github }: User) => {
    dispatch(addNewUser({ name, email, github }));
  };

  return { removeUser, addUser };
};
