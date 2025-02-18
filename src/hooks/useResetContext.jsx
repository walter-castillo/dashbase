import { useAuth } from "../providers/AuthProvider";
import { useUser } from "../providers/UserProvider";
import { useRole } from "../providers/RoleProvider";

export const useResetContext = () => {
  const { resetUserContext } = useUser();
  const { resetAuthContext } = useAuth();
  const { resetRoleContext } = useRole();

  const resetAllContexts = () => {
    console.log("Reseteando contexto...");
    resetAuthContext();
    resetRoleContext();
    resetUserContext();
    console.log("Contexto reseteado");
  };

  return {resetAllContexts};
};
 