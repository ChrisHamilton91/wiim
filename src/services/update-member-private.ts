import type { UpdateMemberPrivateParams } from "../pages/api/update-member/[id]/private";
import ApiRoutes from "../routing/api-routes";
import { en } from "./context/language-ctx";
import authHeader from "./headers/auth-header";
import { contentTypeJsonHeader } from "./headers/content-type-headers";
import Notification from "./notifications/notification";
import type { MemberPrivateInfo } from "./_types";

/** Attempts to update a member, will throw an error if status code is not 200 */
export default async function updateMemberPrivate(
  id: number,
  params: UpdateMemberPrivateParams
): Promise<MemberPrivateInfo | null> {
  const notification = new Notification();
  try {
    notification.loading(
      en ? "Updating Member Info..." : "Mise à jour des informations sur les membres..."
    );
    const res = await fetch(ApiRoutes.updateMemberPrivate(id), {
      method: "PATCH",
      headers: { ...(await authHeader()), ...contentTypeJsonHeader },
      body: JSON.stringify(params),
    });
    if (!res.ok) {
      notification.error(await res.text());
      return null;
    }
    notification.success();
    return await res.json();
  } catch (e: any) {
    notification.error(e);
    return null;
  }
}