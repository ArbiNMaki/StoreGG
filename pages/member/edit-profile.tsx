import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Input from "../../components/atoms/Input";
import Sidebar from "../../components/organisms/Sidebar";
import { JWTPayloadTypes, UserTypes } from "../../services/data-types";
import { updateProfile } from "../../services/member";
import { useRouter } from "next/router";

interface UserStateTypes {
  id: string;
  username: string;
  email: string;
  avatar: any;
}

export default function EditProfile() {
  const [user, setUser] = useState<UserStateTypes>({
    id: '',
    username: '',
    email: '',
    avatar: '',
  });
  const [imagePreview, setImagePreview] = useState('/');
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      const jwtToken = atob(token);
      const payload: JWTPayloadTypes = jwt_decode(jwtToken);
      const userFromPayload: UserTypes = payload.player;
      const IMG = process.env.NEXT_PUBLIC_IMG;
      userFromPayload.avatar = `${IMG}/${userFromPayload.avatar}`;
      setUser(userFromPayload);
    }
  }, []);

  const onSubmit = async () => {
    console.log('data: ', user)
    const data = new FormData()

    data.append('image', user.avatar)
    data.append('username', user.username)
    const response = await updateProfile(data)
    if(response.error) {
      toast.error(response.message, { theme: 'colored' })
      console.log('data: ', response);
    } else {
      console.log('data: ', response);
      Cookies.remove('token');
      router.push('/sign-in');
    }
  }

  return (
    <section className="edit-profile overflow-auto">
      <Sidebar activeMenu="settings" />
      <main className="main-wrapper">
        <div className="ps-lg-0">
          <h2 className="text-4xl fw-bold color-palette-1 mb-30">Settings</h2>
          <div className="bg-card pt-30 ps-30 pe-30 pb-30">
            <form action="">
              <div className="photo d-flex">
                <div className="image-upload">
                  <label htmlFor="avatar">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        width={90}
                        height={90}
                        style={{ borderRadius: "100%" }}
                        alt="upload"
                      />
                    ) : (
                    <img
                      src={user.avatar}
                      width={90}
                      height={90}
                      style={{ borderRadius: "100%" }}
                      alt="upload"
                    />
                    )}
                  </label>
                  <input
                    id="avatar"
                    type="file"
                    name="avatar"
                    accept="image/png, image/jpeg"
                    onChange={(event) => {
                      const img = event.target.files![0];
                      setImagePreview(URL.createObjectURL(img));
                      return setUser({
                        ...user,
                        avatar: img,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="pt-30">
                <Input
                  label="Full Name"
                  value={user.username}
                  onChange={(event) =>
                    setUser({ ...user, username: event.target.value })
                  }
                />
              </div>
              <div className="pt-30">
                <Input label=" Email Address" disabled value={user.email} />
              </div>
              {/* <div className="pt-30">
                <Input label="Phone" />
              </div> */}
              <div className="button-group d-flex flex-column pt-50">
                <button
                  type="button"
                  className="btn btn-save fw-medium text-lg text-white rounded-pill"
                  onClick={onSubmit}
                >
                  Save My Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </section>
  );
}
