import { UserOutlined } from "@ant-design/icons";
import { Avatar, Image } from "antd";
import { Copyright } from "~/components/Copyright";
import { LDAPUser } from "~/types";

type ProfileProps = {
  user?: LDAPUser;
};
//drag queen rbxmatm
const Profile = (props: ProfileProps) => {
  const ldap_pic = props.user.sAMAccountName || "";
  return (
    <>
      <Avatar
        src={
          <Image
            src={`https://cinco.linkedin.biz/api/raw/picture/${ldap_pic}`}
            style={{
              width: 32,
            }}
          />
        }
      />
    </>
  );
};

export default Profile;
