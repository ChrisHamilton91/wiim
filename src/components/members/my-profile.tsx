import Button from "antd/lib/button";
import Card from "antd/lib/card/Card";
import Title from "antd/lib/typography/Title";
import { FC, useContext, useState } from "react";
import { AccountCtx } from "../../services/context/account-ctx";
import CardSkeleton from "../loading/card-skeleton";
import PublicMemberDescription from "./public-member-description";
import MemberFormPublic from "./member-form-public";
import MyProfileRegister from "./my-profile-register";
import { LanguageCtx } from "../../services/context/language-ctx";

const MyProfile: FC = () => {
  const { en } = useContext(LanguageCtx);
  const { localAccount, setLocalAccount, loading } = useContext(AccountCtx);
  const [editMode, setEditMode] = useState(false);

  if (loading) return <CardSkeleton />;
  if (!localAccount) return null; // Auth guard should prevent this
  if (!localAccount.member) return <MyProfileRegister />;
  const member = localAccount.member;

  const editButton = (
    <Button
      size="large"
      type="primary"
      style={{ flexGrow: 1, maxWidth: "10rem" }}
      onClick={() => setEditMode(true)}
    >
      {en ? "Edit" : "Éditer"}
    </Button>
  );

  const cancelButton = (
    <Button
      size="large"
      danger
      style={{ flexGrow: 1, maxWidth: "10rem" }}
      onClick={() => {
        if (
          confirm(
            en
              ? "Are you sure? All unsaved changes will be lost."
              : "Êtes-vous sûr ? Toutes les modifications non enregistrées seront perdues."
          )
        )
          setEditMode(false);
      }}
    >
      {en ? "Cancel" : "Annuler"}
    </Button>
  );

  const header = (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <Title
        level={2}
        style={{
          margin: 0,
          minWidth: 0,
          marginRight: "auto",
          paddingRight: 16,
          whiteSpace: "break-spaces",
        }}
      >
        {member.account.first_name + " " + member.account.last_name}
      </Title>
      {editMode ? cancelButton : editButton}
    </div>
  );

  if (editMode)
    return (
      <Card title={header}>
        <MemberFormPublic
          member={member}
          onSuccess={(member) => {
            setEditMode(false);
            setLocalAccount((prev) => {
              if (prev) return { ...prev, member };
              return prev;
            });
          }}
        />
      </Card>
    );

  return (
    <Card title={header} bodyStyle={{ padding: 0 }}>
      <PublicMemberDescription member={member} />
    </Card>
  );
};

export default MyProfile;
