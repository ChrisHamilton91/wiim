import type { AccountRes } from "../pages/api/account/[id]";
import type { UpdateAccountEmailParams } from "../pages/api/update-account/[id]/email";
import ApiRoutes from "../routing/api-routes";
import { en } from "./context/language-ctx";
import authHeader from "./headers/auth-header";
import { contentTypeJsonHeader } from "./headers/content-type-headers";
import Notification from "./notifications/notification";

export default async function updateAccountEmail(
  id: number,
  params: UpdateAccountEmailParams
): Promise<AccountRes | null> {
  const notification = new Notification();
  try {
    notification.loading(en ? "Updating account email..." : "Mise à jour de l'e-mail du compte...");
    const res = await fetch(ApiRoutes.updateAccountEmail(id), {
      headers: { ...(await authHeader()), ...contentTypeJsonHeader },
      method: "PATCH",
      body: JSON.stringify(params),
    });
    if (!res.ok) throw await res.text();
    notification.success();
    return await res.json();
  } catch (e: any) {
    notification.error(e);
    return null;
  }
}
